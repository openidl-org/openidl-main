.PHONY: build_upload docker_save_upload docker_load_upload

#Image namespace
NAMESPACE ?= openidl
# image name
NAME ?= openidl-k8s
#image default tag
IMAGE_TAG ?= latest
#minikube ip
ifeq ($(UNAME), Darwin)
	MINIKUBE_HOST_IP=$(shell minikube ssh "route -n | grep ^0.0.0.0 | awk '{ print \$$2 }'")
else
	MINIKUBE_HOST_IP=$(shell minikube ssh "cat /etc/hosts | grep host.minikube.internal | awk '{ print \$$1 }'")
endif

UNAME := $(shell uname)
ifeq ($(UNAME), Darwin)
	DRIVER=hyperkit
else
	DRIVER=docker
endif

delete_minikube:
	minikube delete

stop_minikube:
	minikube stop

start_minikube:
	minikube config set cpus 4
	minikube config set memory 8192
	minikube start --driver=$(DRIVER)

enable_ingress:
	minikube addons enable ingress

check_minikube_ip:
	minikube ip

update_hosts:
	(cd /etc && sudo nano hosts)

use_minikube_as_registry:
	echo This does not work for some reason, do it manually! Use only 1 dollar sign
	eval $$(minikube -p minikube docker-env)

refresh_upload: | build_upload docker_save_upload docker_load_upload

install_in_k8s:
	kubectl create namespace openidl-aais-apps
	kubectl create namespace openidl-analytics-apps
	kubectl create namespace openidl-carrier-apps
	helm upgrade --install local-aais ./openidl-k8s -f ./openidl-k8s/global-values-dev-aais.yaml -n openidl-aais-apps --set global.minikubehostip=$(MINIKUBE_HOST_IP)
	helm upgrade --install local-analytics ./openidl-k8s -f ./openidl-k8s/global-values-dev-analytics.yaml -n openidl-analytics-apps --set global.minikubehostip=$(MINIKUBE_HOST_IP)
	helm upgrade --install local-carrier ./openidl-k8s -f ./openidl-k8s/global-values-dev-carrier.yaml -n openidl-carrier-apps --set global.minikubehostip=$(MINIKUBE_HOST_IP)

uninstall_from_k8s:
	helm uninstall local-aais -n openidl-aais-apps 
	helm uninstall local-analytics -n openidl-analytics-apps
	helm uninstall local-carrier -n openidl-carrier-apps

reinstall_in_k8s:
	helm uninstall local-aais -n openidl-aais-apps 
	helm uninstall local-analytics -n openidl-analytics-apps
	helm uninstall local-carrier -n openidl-carrier-apps
	helm upgrade --install local-aais ./openidl-k8s -f ./openidl-k8s/global-values-dev-aais.yaml -n openidl-aais-apps --set global.minikubehostip=$(MINIKUBE_HOST_IP)
	helm upgrade --install local-analytics ./openidl-k8s -f ./openidl-k8s/global-values-dev-analytics.yaml -n openidl-analytics-apps --set global.minikubehostip=$(MINIKUBE_HOST_IP)
	helm upgrade --install local-carrier ./openidl-k8s -f ./openidl-k8s/global-values-dev-carrier.yaml -n openidl-carrier-apps --set global.minikubehostip=$(MINIKUBE_HOST_IP)

reinstall_in_k8s_aais_dev:
	helm uninstall dev-aais -n openidl 
	helm upgrade --install dev-aais ./openidl-k8s -f ./openidl-k8s/global-values-dev-aais.yaml -n openidl --set global.datacallapp.ingressenabled=true --set global.utilities.ingressenabled=true --set global.ui.ingressenabled=true --set global.insurancedatamanager.ingressenabled=true --set global.secrets.install=false

reinstall_in_k8s_analytics_dev:
	helm uninstall dev-analytics -n openidl 
	helm upgrade --install dev-analytics ./openidl-k8s -f ./openidl-k8s/global-values-dev-analytics.yaml -n openidl --set global.datacallapp.ingressenabled=true --set global.utilities.ingressenabled=true  --set global.ui.ingressenabled=true --set global.secrets.install=false

reinstall_in_k8s_carrier_dev:
	helm uninstall dev-carrier -n openidl 
	helm upgrade --install dev-carrier ./openidl-k8s -f ./openidl-k8s/global-values-dev-carrier.yaml -n openidl --set global.datacallapp.ingressenabled=true --set global.utilities.ingressenabled=true --set global.carrierui.ingressenabled=true --set global.insurancedatamanager.ingressenabled=true --set global.secrets.install=false

dashboard:
	echo better to open a separate terminal for this
	minikube dashboard

build_all_images:
	docker build ./openidl-data-call-app -t openidl/data-call-app
	docker build ./openidl-data-call-processor -t openidl/data-call-processor
	docker build ./openidl-data-call-mood-listener -t openidl/data-call-mood-listener
	docker build ./openidl-insurance-data-manager -t openidl/insurance-data-manager
	docker build ./openidl-transactional-data-event-listener -t openidl/transactional-data-event-listener
	docker build ./openidl-ui-workspace -t openidl/ui --build-arg PROJECT=aais
	docker build ./openidl-ui-workspace -t openidl/carrier-ui --build-arg PROJECT=carrier
	docker build ./openidl-utilities -t openidl/utilities

delete_all_images:
	docker rmi openidl/ui openidl/data-call-app openidl/data-call-processor openidl/data-call-mood-listener openidl/transactional-data-event-listener openidl/insurance-data-manager openidl/carrier-ui openidl/upload openidl/utilities

build_insurance_data_manager:
	docker build ./openidl-insurance-data-manager -t openidl/insurance-data-manager

build_data_call_mood_listener:
	docker build ./openidl-data-call-mood-listener -t openidl/data-call-mood-listener

build_transactional_data_event_listener:
	docker build ./openidl-transactional-data-event-listener -t openidl/transactional-data-event-listener

build_data_call_processor:
	docker build ./openidl-data-call-processor -t openidl/data-call-processor

build_data_call_app:
	docker build ./openidl-data-call-app -t openidl/data-call-app

build_ui:
	docker build ./openidl-ui-workspace -t openidl/ui --build-arg PROJECT=aais

build_carrier_ui:
	docker build ./openidl-ui-workspace -t openidl/carrier-ui --build-arg PROJECT=carrier

build_upload:
	(cd ./openidl-upload && npm run build && cd .. && docker build ./openidl-upload -t openidl/upload)

build_utilities:
	docker build ./openidl-utilities -t openidl/utilities

run_ui:
	minikube service ui-service  -n openidl-aais-apps 

run_analytics_ui:
	minikube service ui-service  -n openidl-analytics-apps 

run_carrier_ui:
	minikube service carrier-ui-service  -n openidl-carrier-apps 

run_data_call_app:
	minikube service data-call-app-service -n openidl-aais-apps 

run_analytics_data_call_app:
	minikube service data-call-app-service -n openidl-analytics-apps 

run_carrier_data_call_app:
	minikube service data-call-app-service -n openidl-carrier-apps

run_insurance_data_manager:
	minikube service insurance-data-manager-service -n openidl-aais-apps 

run_carrier_insurance_data_manager:
	minikube service insurance-data-manager-service -n openidl-carrier-apps

run_upload:
	minikube service upload-service -n openidl-carrier-apps

run_utilities:
	minikube service utilities-service  -n openidl-aais-apps 

run_carrier_utilities:
	minikube service utilities-service  -n openidl-carrier-apps 

run_analytics_utilities:
	minikube service utilities-service  -n openidl-analytics-apps 

# The ingress targets are not necessary if the ingress addon can be applied successfully
docker_save_ingress:
	docker save -o ./openidl-iac-local/images/ingresscontroller.tar us.gcr.io/k8s-artifacts-prod/ingress-nginx/controller:v0.40.2 

docker_load_ingress:
	docker load -i ./openidl-iac-local/images/ingresscontroller.tar
# end ingress targets

install_dns_utils:
	echo see this for details on using: https://kubernetes.io/docs/tasks/administer-cluster/dns-debugging-resolution/
	kubectl apply -f ./kubernetes-dns-utils/deployment.yaml

aws_ecr_login:
	aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 531234332176.dkr.ecr.us-east-1.amazonaws.com

aws_load_image:
	docker load -i openidl-iac-local/images/openidl-$(IMAGE_NAME).tar
	docker tag openidl/$(IMAGE_NAME):latest 531234332176.dkr.ecr.us-east-1.amazonaws.com/openidl-$(IMAGE_NAME):latest
	docker push 531234332176.dkr.ecr.us-east-1.amazonaws.com/openidl-$(IMAGE_NAME):latest



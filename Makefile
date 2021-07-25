.PHONY: build_upload docker_save_upload docker_load_upload

#Image namespace
NAMESPACE ?= openidl
# image name
NAME ?= openidl-k8s
#image default tag
IMAGE_TAG ?= latest


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

load_images_full:
	docker load -i ./openidl-iac-local/images/openidl-ui.tar
	docker load -i ./openidl-iac-local/images/openidl-insurance-data-manager.tar
	docker load -i ./openidl-iac-local/images/openidl-data-call-processor.tar
	docker load -i ./openidl-iac-local/images/openidl-data-call-app.tar
	docker load -i ./openidl-iac-local/images/openidl-upload.tar

load_images:
	echo No longer need to load images, they all come from github container registry
	docker load -i ./openidl-iac-local/images/openidl-ui.tar
	
docker_load_ui:
	docker load -i ./openidl-iac-local/images/openidl-ui.tar

docker_load_upload:
	docker load -i ./openidl-iac-local/images/openidl-upload.tar

refresh_upload: | build_upload docker_save_upload docker_load_upload

install_in_k8s:
	helm install local-aais ./openidl-k8s -f ./openidl-k8s/global-values.yaml

uninstall_from_k8s:
	helm uninstall local-aais

reinstall_in_k8s:
	helm uninstall local-aais
	helm install local-aais ./openidl-k8s -f ./openidl-k8s/global-values.yaml

dashboard:
	echo better to open a separate terminal for this
	minikube dashboard

run_mongo_express:
	minikube service mongo-express-service

run_insurance_data_manager:
	minikube service insurance-data-manager-service

run_data_call_app:
	minikube service data-call-app-service

run_ui:
	minikube service ui-service

build_ui:
	docker build ./openidl-ui -t openidl/ui

run_upload:
	minikube service upload-service

build_upload:
	(cd ./openidl-upload && npm run build && cd .. && docker build ./openidl-upload -t openidl/upload)

build_data_call_processor:
	docker build ./openidl-data-call-processor -t openidl/data-call-processor
	
save_images:
	docker_save_ui

docker_save_ui:
	docker save -o ./openidl-iac-local/images/openidl-ui.tar openidl/ui:latest

docker_save_upload:
	docker save -o ./openidl-iac-local/images/openidl-upload.tar openidl/upload:latest

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

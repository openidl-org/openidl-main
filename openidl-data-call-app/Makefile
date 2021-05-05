# SPDX-License-Identifier: Apache-2.0
#Image namespace
NAMESPACE ?= openidl
# image name
NAME ?= data-call-app
#image default tag
IMAGE_TAG ?= latest

IMAGE_NAME = ${NAMESPACE}/${NAME}:${IMAGE_TAG}

use_minikube:
	eval $$(minikube -p minikube docker-env)

build:
	docker build -t ${IMAGE_NAME} .

k8s_deploy:
	kubectl apply -f deployment.yml

k8s_clean:
	kubectl delete -f k8s

swagger:
	minikube service data-call-app-service
	
mongo_express:
	minikube service mongo-express-service

delete_appssecret:
	kubectl delete secret appssecret

create_appssecret:
	kubectl create secret generic appssecret --from-file=appid=server/config/local-appid-config.json --from-file=certmanager=server/config/local-certmanager-config.json --from-file=mongodb=server/config/local-mongo-config.json --from-file=cloudantdb=server/config/local-cloudant-config.json --from-file=connectionprofile=server/config/connection-profile.json
	# kubectl create secret generic appssecret --from-file=appid=server/config/local-appid-config.json --from-file=certmanager=server/config/local-certmanager-config.json --from-file=mongodb=server/config/local-mongo-config.json --from-file=cloudantdb=server/config/local-cloudant-config.json --from-file=connectionprofile=server/config/connection-profile.json --from-file=awss3=server/config/s3-bucket-config.json
#!/bin/sh
echo "Here we setup the system from start to finish."
make delete_minikube
make start_minikube
make enable_ingress
./updatehosts.sh
eval $(minikube -p minikube docker-env)
docker images | grep openidl
# make load_images
make install_in_k8s

#!/bin/sh
echo "================================================="
echo "Here we setup the system from start to finish."
echo "================================================="

echo "================================================="
echo "Setting up hyperledger fabric local test network"
echo "================================================="
cd openidl-test-network
./start.sh
cd ..

echo "================================================="
echo "Setting up minikube"
echo "================================================="
make delete_minikube
make start_minikube

echo "================================================="
echo "Enable ingress and update hosts"
echo "================================================="
make enable_ingress
./updatehosts.sh

echo "================================================="
echo "Copy hyperledger fabric local test network connection profile"
echo "================================================="
cp -R ./openidl-test-network/organizations/peerOrganizations/aais.example.com/connection-aais.json ./openidl-k8s/charts/openidl-secrets/config-local-aais/connection-profile.json
cp -R ./openidl-test-network/organizations/peerOrganizations/carrier.example.com/connection-carrier.json ./openidl-k8s/charts/openidl-secrets/config-local-carrier/connection-profile.json 
cp -R ./openidl-test-network/organizations/peerOrganizations/analytics.example.com/connection-analytics.json ./openidl-k8s/charts/openidl-secrets/config-local-analytics/connection-profile.json 

echo "================================================="
echo "Install application helm charts"
echo "================================================="
# make load_images
make install_in_k8s

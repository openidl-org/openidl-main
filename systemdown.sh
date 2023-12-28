#!/bin/sh
echo "Here we teardown."

echo "Tearing down hyperledger fabric local test network"
cd openidl-test-network
./network.sh down
cd ..

echo "Tearing down minikube"
make stop_minikube

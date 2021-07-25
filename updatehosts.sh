#!/bin/sh
echo "*================================================*"
echo "* Updating the host address for the test.io urls "
MINIKUBE_IP_ADDRESS=$(minikube ip)
echo "* Minikube IP is: ${MINIKUBE_IP_ADDRESS}"
echo "*================================================*"
HOST_LIST="aais.test.io insurance-data-manager-aais.test.io data-call-app-aais.test.io upload-aais.test.io ui-aais.test.io mongo-express-aais.test.io"

# check for previous existence of HOST_LIST
if [ `grep -c "${HOST_LIST}" /etc/hosts` = "0" ];then
	cp /etc/hosts hosts-updated.txt
	echo "${MINIKUBE_IP_ADDRESS} $HOST_LIST" >> hosts-updated.txt
else
	cp /etc/hosts hosts-input.txt
	MINIKUBE_IP_ADDRESS=`echo $MINIKUBE_IP_ADDRESS | sed 's/\./\\\./g'`
	SED_COMMAND="s/[[:digit:]]*.[[:digit:]]*.[[:digit:]]*.[[:digit:]]*\ aais.test.io/${MINIKUBE_IP_ADDRESS} aais\.test\.io/"
	sed -e "${SED_COMMAND}" hosts-input.txt > hosts-updated.txt
fi
sudo cp hosts-updated.txt /etc/hosts

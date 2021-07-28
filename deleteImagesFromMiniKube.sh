echo "@-@-@-@-@-@-@  D E L E T I N G   L O C A L   D O C K E R   I M A G E S  @-@-@-@-@-@-@"
eval $(minikube -p minikube docker-env)
docker rmi openidl/insurance-data-manager openidl/data-call-processor openidl/data-call-app

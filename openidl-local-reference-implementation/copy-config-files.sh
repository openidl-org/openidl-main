echo 'Copying config files to openidl-secrets'
cp -R ./config/config-local-aais ../openidl-k8s/charts/openidl-secrets/
cp -R ./config/config-local-analytics ../openidl-k8s/charts/openidl-secrets/
cp -R ./config/config-local-carrier ../openidl-k8s/charts/openidl-secrets/
echo 'Done'
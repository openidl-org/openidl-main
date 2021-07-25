# openIDL secrets manager

Use this project to get secrets from AWS

Usually, this will be used from IaC to load the secrets into images. Look at the openidl-k8s project. It has a nodejs script "load-secrets.js" and a call from the make file to explain how it works.

## downloading the secrets

-   from the ../openidl-k8s directory run

```
node load-secrets <dir> <cloud> <environment> <node>
```

-   example

```
node load-secrets charts/openidl-secrets/config/ ibm stage aais
```

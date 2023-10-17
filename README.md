## openIDL Main

This is the main repostiory for openidl

All projects are contained in subdirectories

This is a single monorepository

## contributing

Here is a course on how to contribute to open source: https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github

## Current Backlog

-   there is a backlog of work necessary to get everything running from github as open source.
-   please refer to [backlog](./BACKLOG.md) for more information

# Quickstart

To get started quickly, follow these steps. This assumes you don't need to update any code etc.

## Initial setup

There are several different ways to run things:

-   Install VirtualBox
    -   Make sure it has 4 cpus
-   Running on a local system
-   Running on a remote system
    \*See instructions below for setting up a proxy

## Install Golang

The smart contracts we use are written in Go. See below for installation instructions. Version 1.16 is recommended.

For ubuntu

```
$ wget https://dl.google.com/go/go1.16.4.linux-amd64.tar.gz
$ rm -rf /usr/local/go && tar -C /usr/local -xzf  go1.16.4.linux-amd64.tar.gz
$ export PATH=$PATH:/usr/local/go/bin
$ go version
```

For Mac:

```
$ curl -o golang.pkg https://dl.google.com/go/go1.16.4.darwin-amd64.pkg
$ sudo open golang.pkg
```

An installation wizard will come up, complete the process there. After that, run the following command:

```
$ export PATH=$PATH:/usr/local/go/bin
$ go version
```

**Troubleshooting note**: If you have "permission denied" error in untarring the file, please make sure to have correct ownership of directories, or you may want to use `sudo` for the untar. 
For more details or troubleshooting, see https://golang.org/doc/install

## Install Git

For ubuntu

```
$ sudo apt install git-all
```

For Mac:

```
$ brew install git
```

For more details or troubleshooting,see https://curl.haxx.se/download.html

## Install Docker

Please follow the documentation given below to make sure you have Docker and you have it set up in correct way:
https://hyperledger-fabric.readthedocs.io/en/release-2.2/prereqs.html#docker-and-docker-compose

For more details and troubleshooting, please refer to
https://hyperledger-fabric.readthedocs.io/en/release-2.2/prereqs.html#

### Install Docker Compose
For Ubuntu:
```
$ sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
$ sudo chmod +x /usr/local/bin/docker-compose
$ sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
```
For Mac:
Docker Compose comes as a part of Docker, there's no need for a separate install.

### Install Make
If `make` is not installed, for Ubuntu:
```
$ sudo apt-get install build-essential
```
For mac
```
 brew install make
```

### Install JQ
If `jq` is not installed, for Ubuntu:
```
$ sudo apt-get install jq
```
For mac
```
 brew install jq
```

## Get Minikube working

[Install Minikube](https://minikube.sigs.k8s.io/docs/start/)

## Install helm

[Installation Instructions](https://helm.sh/docs/intro/install/)

## Clone the openidl-main repository

```
git clone https://github.com/openidl-org/openidl-main.git
```

## Clone the openidl-aais-gitops repository

```
git clone https://github.com/openidl-carrier1/openidl-aais-gitops.git
```

## Copy helm charts from openidl-aais-gitops to openidl-main
Go to openidl-aais-gitops local repository cloned in previous step and copy "openidl-k8s/" to openidl-main repository. 

cp -r ./openidl-aais-gitops/openidl-k8s/ ./openidl-main/

## Get the Config files

You will need configuration files so that your runtime can connect into the network successfully.
Most of these configuration files are different for every node. There are some that don't change from node to node, but we are keeping separate copies for simplification.
For the correct list of required configuration files, refer to the `openidl-k8s/charts/openidl-secrets/values.yaml` file.
Place the files into the `openidl-k8s/charts/openidl-secrets/config` directory.
The location of these files is currently in the air. Please contact AAIS to get the files for the test nodes.

### Make sure to remove any running minikube

Run `./systemdown.sh` from the `openidl-main` directory.
If usinb bash then `bash systemdown.sh`

### Startup the system

Run `./systemup.sh` from the `openidl-main` directory.

If you get an error that includes "failed calling webhook", then wait 30 seconds and run `make reinstall_in_k8s`. The first time it may complain that it couldn't create new content in the nifi namespace. Just run `make reinstall_in_k8s` again after a short time.

### Monitor the Kubernetes cluster

Run `make dashboard` from the `openidl-main` directory.

### Test the application ui and apis

From the `openidl-main` directory run any of the following:

```
make run_data_call_app
make run_insurance_data_manager
make run_ui
```

## Secrets / Config Files

As of now, the secrets are kept in AWS Secrets Manager. This will migrate to TBD.

Use the load-secrets.js node script or the load_secrets make command.

There is a secret for each node following this naming convention
/openidl/<cloud>/<envt>/<node>

cloud is in (ibm, aws, local)
envt is in (stage, test, dev, prod)
node is in (aais, analytics, carrier)

the helm charts will look in the following directories for the files to load into mounts in the image
-    openidl-k8s/charts/openidl-secrets/config-aais 
-    openidl-k8s/charts/openidl-secrets/config-analytics 
-    openidl-k8s/charts/openidl-secrets/config-carrier 

this folder is ignored in .gitignore so no secrets get checked in to git.

the helm chart uses the following mapping:

| filename                               | secret name                      |
| -------------------------------------- | -------------------------        |
| channel-config.json                    | channel-config                   |
| connection-profile.json                | connection-profile               |
| local-db-config.json                   | local-db-config                  |
| default.json                           | default-config                   |
| email.json                             | email-config                     |
| listener-channel-config.json           | listener-channel-config          |
| local-cognito-config.json              | local-cognito-config             |
| local-kvs-config.json                  | local-kvs-config                 |
| flowconfig.json                        | nifi-flowconfig                  |
| s3-bucket-config.json                  | s3-bucket-config                 |
| target-channel-identifiers-config.json | target-channel-config            |
| unique-identifiers-config.json         | unique-identifiers-config        |
| local-vault-config.json                | vault-config                     |
| mappings.json                          | data-call-app-mappings-config    |
| utilities-fabric-config.json           | utilities-fabric-config          |
| utilities-admin-config.json            | utilities-admin-config           |
| local-cognito-admin-config.json        | cognito-admin-config             |

Look to each project specific helm chart to see what configs are used.

# Local Development

-   there are two ways to develop locally
    -   use the minikube reference implementation
        -   to release code you'll need to load the images into the minikube so the deployments get them from there. See documentation elsehwere in this section and in the specific project subfolders.
    -   run npm / node from the project subdirectory

# Proxy Setup

If running on a remote system you must set up a kubernetes proxy on the remote system and tunnel to it in order to access any web UI and to use `kubectl` commands from your local desktop.

-   Setup proxy
    `kubectl proxy --address='0.0.0.0' --port=8080 --accept-hosts='^*$'`
    will setup a proxy on port 8080 and allow connections from anywhere

-   Setup tunnel to remote system

`ssh -L 8080:localhst:8080 USER@REMOTE-SYSTEM` will set up a tunnel to port 8080

-   Access the dashboard
    `http://localhost:8080/api/v1/namespaces/kubernetes-dashboard/services/http:kubernetes-dashboard:/proxy/#/overview?namespace=default` will give you access to the dashboard. (Change port in proxy, tunnel and URL as necessary)

-   Access to other services

-   kubectl: If you use 8080 as the port in the proxy then kubectl commands will work from the local host with nothing else needed. It you use a port other than 8080 than you will need to add the switch `-s localhost:PORT` for other ports

-   Other UI services: When you set up another service in minikube you will get a line similar to `🎉 Opening service default/ui-service in default browser... 👉 http://192.168.49.2:31903`
    You will need to setup another tunnel appropriately.
    In the example from above `ssh -L 31903:192.168.42.2:31903 USER@REMOTESYSTEM` will do this. Then you can get access through `http://localhost:31903`

# Troubleshooting

-   the system may show an error trying to access the ingress-controller. A restart will often fix this.
    -   another way to fix this is to run the `make reinstall_in_k8s` command
    -   this may run too fast and get an error that the namespace is not deleted, just try again
    -   this documentation may help regarding enabling the ingress controller https://kubernetes.github.io/ingress-nginx/deploy/#minikube
-   the system up may hang. This can be fixed with a restart. Docker seems to be in a problem state.
-   docker can sometimes crash silently. If things are hanging or not working, make sure docker is running.
-   the ingress addin may not install or hang. We have seen that the vpn was the cause. Anyconnect froom cisco causes issue. Disable VPN or move to another VPN.
-   if you find that you have a memory error in docker, you can change the size of the request in the makefile in the start_minikube section

## NOTE: AnyConnect vpn and minikube

There are issues with running minikube while connected to a VPN with the Cisco AnyConnect client. Initially the `minikube addons enable ingress` from `make enable_ingress` in the Makefile called by `systemup.sh` will hang. It may work if you connect _after_ minikube is running. This problem does not seem to occur with other VPN clients such as OpenVPN.

# Full Process

When asked for the password, this is for sudo, so it should be the administrator of your machine, most likely the password when you start your machine.

The ./systemup.sh script will execute the following

```bash
make delete_minikube
make start_minikube
make enable_ingress
make check_minikube_ip
make update_hosts
eval $(minikube -p minikube docker-env)
docker images
make load_images
make install_in_k8s
```

Once the system is up you can do the following

-   change to another terminal and run the dashboard. This will block.

```
make dashboard
```

-   other things you can do to see different apis etc

```
make run_ui
make run_upload
make run_insurance_data_manager
make run_data_call_app
make run_mongo_express
```

# Builing Local Images

This repository leverages common functionality from [openidl-common-lib](https://github.com/openidl-org/openidl-main/tree/main/openidl-common-lib) . To install this dependency, replace `{GITHUB_TOKEN}` in `.npmrc` with your own Git personal access token in all the repositories. For details on how to get an access token, please see [Personal access tokens](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/creating-a-personal-access-token) on the GitHub site. Access Token should have at least `read:packages` permissions

```
make build_all_images
```

# Experimental

To make everything work for everyone, we are using virtual machines for the reference implementation.
We provide an importable virtual machine.

username=openidl
password=openidl

## use the minifab network to run the examples

# Prerequisites

-   you may want to use a VirtualBox ubuntu virtual machine to run the reference implementation see section below on setup
-   NOTE: it seems there is an issue with 6.x and autosizing the screen. Consider using 5.2.x instead. You can also scale the window to make it bigger.
-   [here is a video](https://youtu.be/aJcc-xC6krE)
-   install git

```bash
sudo apt install git-all
```

-   [install docker](https://docs.docker.com/engine/install/ubuntu/)

```bash
sudo apt-get update
sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    lsb-release
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo \
  "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io
sudo docker run hello-world
```

-   [install minikube](https://minikube.sigs.k8s.io/docs/start/)

```bash
 curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
 sudo install minikube-linux-amd64 /usr/local/bin/minikube
```

-   install make

```bash
sudo apt-get install build-essential
```

-   install libvert

```bash
sudo apt update
sudo apt install qemu-kvm libvirt-daemon-system
```

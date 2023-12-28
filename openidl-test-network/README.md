This document details the steps necessary for bringing up the Blockchain network and the smart contracts in local environment. After following this document, you should be able to stand up a Blockchain network that will be ready to interact with the Openidl app to submit or query transaction that are to be persisted in the Blockchain.

After introducing Hyperledger Fabric, we will go through the prerequisites, and then will go step by step on how to bring up the network. 

## What is a Hyperledger Fabric Network
Source and more details: https://hyperledger-fabric.readthedocs.io/en/release-2.2/whatis.html

A blockchain is an immutable transaction ledger, maintained within a distributed network of peer nodes. These nodes each maintain a copy of the ledger by applying transactions that have been validated by a consensus protocol, grouped into blocks that include a hash that bind each block to the preceding block.

Hyperledger Fabric is an open source enterprise-grade permissioned distributed ledger technology (DLT) platform, designed for use in enterprise contexts.

Started under the Linux Foundation, Hyperledger Fabric has a modular architecture that separates the duties of peer, ordering, and identity management. The Fabric platform is **permissioned**, meaning that the participants, even though they may not fully trust each other, can come together under a governance model like a legal agreement and have a framework for handling disputes.

At a high level, a hyperledger Fabric platform is composed of the following components in addition to the participants("peers"):

1. An ordering service ("orderer") that orders transactions and broadcast them to peers in blocks of transactions.
2. A membership service provider ("Fabric Certificate Authority") for associating entities in the network with cryptographic identities.
3. Smart contracts (“chaincode”) run within a container environment (e.g. Docker) for isolation.

Next, we will go through the steps to stand up the Hyperledger Fabric platform in a local environment.

## Prerequisites
To run the Blockchain network, you will need several applications installed in your device. We will show the commands For Ubuntu Linux and Mac, and the commands for other OSes should be available in the corresponding application documentations.

### Install Golang
The smart contracts we use are written in Go. Follow the below steps to install it. Version 1.16 is recommended.

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
### Install Git
For ubuntu
```
$ sudo apt install git-all
```
For Mac:
```
$ brew install git
```

For more details or troubleshooting,see https://curl.haxx.se/download.html
### Install Docker
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

## TL;DR: One step setup
We will be using HyperLedger Fabric 2.2.

To run through all the steps in one go, from the main directory of this repo:
```
$ cd openidl-test-network
$ ./start.sh
```
This should bring up all the components of the Fabric platform, register the necessary identities, and deploy the Openidl smart contracts, and now it should be ready to interact with the Openidl app.

In the next section, we will go though the steps in details.

## Step by step in detail

### Starting up the base network
First, let's make sure we are starting from a blank slate and there are no dangling containers. From the main directory of the repo:
```
$ cd openidl-test-network
$ /network.sh down
```

Next, we will pull all the necessary docker images and binaries 
```
$ ./bootstrap.sh 2.2.3 1.5.0
```
This will pull the Docker images for the Hyperledger Fabric services (Peers, Certificate Authorities, Orderers etc.) and also the binaries necessary for Fabric management. The version for Fabric would be `2.2.3` and the Certificate Authority (CA) is `1.5.0`

Next, we will start up the network that will comprise of several Docker containers for different Fabric services.

```
$ ./network.sh up -ca -s couchdb
```
This command will create a Hyperledger Fabric network with three different participating organizations:
1. Aais
2. Carrier
3. Analytics

each organization will have one `peer`, each peer will have a `couchdb` database for saving the world state, and each organization will have one certificate authority (`ca`). There will also be an `orderer`, a corresponding `ca`, a `fabric-tools` container and a `couchdb` container as the key store.

After the command completes, you can see the list of containers by running
```
$ docker ps -a
```

### Creating Channels
In this step, we will create the necessary channels. A participating organization (peer) needs to join channel in order to create and transfer assets. Channels are private layer of communication between specific organizations, and are invisible to other organizations.

```
# create the defaultchannel
$ ./network.sh createChannel -c defaultchannel -p DefaultChannel

# create the analytics-aais
$ ./network.sh createChannel -c analytics-aais -p AnalyticsAaisChannel

# create the analytics-carrier
$ ./network.sh createChannel -c analytics-carrier -p AnalyticsCarrierChannel

```

These will create 3 channels, `defaultchannel`, `analytics-aais`, and `analytics-carrier`. The `defaultchannel` will include all three organizations, and other two channels will have organizations corresponding to the channel names.

### Package and install Smart Contracts (Chaincodes)
Organizations that want to validate transactions or query the ledger need to install the chaincode on their peers. The Openidl chaincodes are in the `openidl-chaincode` directory.
First, you will need to package the chaincode and install it in peers to prepare it for deployment in the next step.
```
# package and install 'openidl-cc-default' chaincode on aais node
$ ./network.sh deployCC -ccn openidl-cc-default -ccp ../openidl-chaincode/chaincode/openidl -ccl go -ccsd true

# package and install 'openidl-cc-aais-carriers' chaincode on aais, analytics and carrier nodes 
$ ./network.sh deployCC -ccn openidl-cc-aais-carriers -ccp ../openidl-chaincode/chaincode/openidl -ccl go -ccsd true

```

### Deploy the Chaincode
In this step, we will deploy the Chaincodes in the corresponding Channels and corresponding peers. We also need to configure the private data collection to be part of the channels:
```
# deploy 'openidl-cc-default' chaincode on 'defaultchannel'
$ ./network.sh deployCC -c defaultchannel -ccn openidl-cc-default -ccp ../openidl-chaincode/chaincode/openidl -ccl go -cci Init -ccsp true

# deploy 'openidl-cc-aais-carriers' chaincode on 'analytics-aais'
$ ./network.sh deployCC -c analytics-aais -ccn openidl-cc-aais-carriers -ccp ../openidl-chaincode/chaincode/openidl -ccl go -cci Init -ccsp true -cccg ../openidl-chaincode/chaincode/openidl/collection-config-analytics-aais.json

# deploy 'openidl-cc-aais-carriers' chaincode on 'analytics-carrier'
$ ./network.sh deployCC -c analytics-carrier -ccn openidl-cc-aais-carriers -ccp ../openidl-chaincode/chaincode/openidl -ccl go -cci Init -ccsp true -cccg ../openidl-chaincode/chaincode/openidl/collection-config-analytics-carrier.json

```
After this step, the Chaincodes will be deployed and ready to process transactions. You can see the new chaincode containers listed in the ```docker ps -a``` command.

### Pre-register Users in Certificate Authorities:
After the Chaincode is deployed, the network is ready for operations. As Hyperledger Fabric is a permissioned network, you have to register users first with the Certificate Authority, and then those registered users will be able to interact with the Blockchain. You will register users for different services of the Openidl application and then store the certificates in `couchdb`.
```
$ ./pre-register-users.sh
```

Now the platform is ready. 

## Upgrades
The Hyperledger Fabric version used in this network is v2.2.3, and this is the latest long-term support (LTS) release. If you want to use the latest version v2.3, you need to pull the Fabric Docker images with correct versions.

Edit the `start.sh` file and use the following line instead
```
./bootstrap.sh 2.3.2 1.5.0
```
And remove all the existing docker images by running the following command:
```
$ docker rmi -f $(docker images -aq)
```
After this, you can follow the steps from the beginning of the document, and it should run the Hyperledger Fabric platform with latest images.

As for future Hyperledger Fabric versions, it's too early to tell what steps would be necessary to migrate. There's an upcoming v2.4.0-beta planned for Q4 2021 or later, that will implement Fabric Gateway, and may need change in client-level code for interacting with Fabric. When it's released, the first and best place to start on this would be https://hyperledger-fabric.readthedocs.io/ 

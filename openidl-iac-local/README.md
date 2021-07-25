# openidl-iac-local
This repository contains setup code for putting the openidl system into kubernetes.
It relies on other projects to provide kubernetes config files and docker images.
The hyperledger fabric network is completely configured here.

# AAIS node
This section describes how to install the aais node into a local kubernetes

- go through the readme files in the following order running the deploy kubernetes section
    - openidl-data-call-app
    - openidl-ui
    - openidl-data-call-processor
    - openidl-hds
    - openidl-insurance-data-manager



# Use Helm
- [helm quickstart](https://helm.sh/docs/intro/quickstart/)
- [install helm](https://helm.sh/docs/intro/install/)
````
brew install helm
````


# Architecture Decisions
| Issue | Decision |
| ----- | -------- |
| What Build Tool - Terraform, Ansible, Helm | Lean toward helm as it is really good at building kubernetest clusters |

# here are some resources used to develop this code
## Accenture - looks like a good approach
https://accenture.github.io/blog/2019/06/25/hl-fabric-meets-kubernetes.html

## original from webinar AID Tech
https://url.emailprotection.link/?b-n5E-p5cAj6bbH7tVdyl-P4j-cNIeumO12BWEuPNmQi2ZQ-e3pPq0qxqoyW4xIMEmfsDyVykb3M0DL-VvhqbqJcwdGZweFp4dnIPr1l9SAzPPZhHPACofTJC8hf2l8TcQN1RKvnJOGKXjY86JAmFo7vvclxVjX0y1nnNXLsavY4~

https://opensource.com/article/18/4/deploying-hyperledger-fabric-kubernetes

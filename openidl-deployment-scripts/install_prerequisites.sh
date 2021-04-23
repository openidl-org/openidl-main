# SPDX-License-Identifier: Apache-2.0
#!/bin/bash

PIPELINE_DIR=$PWD

sudo apt install unzip
echo "UNZIP installed"

echo "Installing Terraform - Start"
mkdir terraform_tool
cd terraform_tool
wget https://releases.hashicorp.com/terraform/0.13.4/terraform_0.13.4_linux_amd64.zip
unzip terraform_0.13.4_linux_amd64.zip
export PATH=$PATH:$PWD

terraform -version
echo "Installing Terraform - End"

echo "Installing IBM Terraform Plugin - Start"
wget https://github.com/IBM-Cloud/terraform-provider-ibm/releases/download/v1.12.0/linux_amd64.zip
unzip linux_amd64.zip
mkdir -p $HOME/.terraform.d/plugins
mv terraform-provider-ibm* $HOME/.terraform.d/plugins/
mkdir -p $HOME/.terraform.d/plugins/localdomain/provider/ibm/1.12.0/linux_amd64
cp $HOME/.terraform.d/plugins/*.* $HOME/.terraform.d/plugins/localdomain/provider/ibm/1.12.0/linux_amd64/
cd $HOME/.terraform.d/plugins/localdomain/provider/ibm/1.12.0/linux_amd64
chmod -R 777 $HOME/.terraform.d
echo "Listing terraform plugins folder"
ls -ltr
echo "Installing IBM Terraform Plugin - End"


echo "Running deploy scripts- Start"
ls -ltr
cd $PIPELINE_DIR/terraform

echo "Running Terraform script"
export PATH=$PATH:$HOME/.terraform.d/plugins
export PATH=$PATH:$PIPELINE_DIR/terraform_tool

terraform init
terraform apply -auto-approve

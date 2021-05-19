# SPDX-License-Identifier: Apache-2.0
#Set the Provider
terraform {
  required_providers {
    ibm = {
      source  = "localdomain/provider/ibm"
      version = "1.12.0"
    }
  }
}

provider "ibm" {
  ibmcloud_api_key = "${var.ibmcloud_api_key}"
  generation = 1
  region = "${var.region}"
  iaas_classic_username = "${var.iaas_classic_username}"
  iaas_classic_api_key  = "${var.iaas_classic_api_key}"
}

#Create Resource Group - Start
#resource "ibm_resource_group" "group" {
#  name =  "rg-${var.environment}-${var.node}"
#}

data "ibm_resource_group" "group" {
  name = "rg-${var.environment}-${var.node}"
}
#Create Resource Group - End

#Create AppID instance - Start
resource "ibm_resource_instance" "appid_instance" {
  name                = "${var.environment}-${var.node}-${var.appid_name}"
  resource_group_id   = "${data.ibm_resource_group.group.id}"
  service             = "appid"
  plan                = var.appid_plan
  location            = "${var.region}"
}
#Create AppID instance - End

#Create COS instance - Start
resource "ibm_resource_instance" "cos_instance" {
  count = "${var.node == "analytics" ? 0 : 1}"
  name              = "${var.environment}-${var.node}-${var.cos_name}"
  resource_group_id = "${data.ibm_resource_group.group.id}"
  service           = "cloud-object-storage"
  plan              = "standard"
  location          = "global"
}

#resource "ibm_cos_bucket" "standard-ams03" {
#  bucket_name          = "ravi1-standard-bucket-at-ams"
#  resource_instance_id = ibm_resource_instance.cos_instance.id
#  single_site_location = "ams03"
#  storage_class        = "standard"
#}
#Create COS instance - End

#Create MongoDB instance - Start
resource "ibm_database" "mongo-db" {
  name                          = "${var.environment}-${var.node}-${var.mongo_name}"
  plan                          = var.mongo_plan
  location                      = "${var.region}"
  service                       = "databases-for-mongodb"
  resource_group_id             = "${data.ibm_resource_group.group.id}"
  adminpassword                 = "password12"
  members_memory_allocation_mb  = var.mongo_memory
  members_disk_allocation_mb    = var.mongo_disk
  users {
    name     = "user123"
    password = "password12"
  }
}

output "ICD_Etcd_database_connection_string" {
value = ibm_database.mongo-db.connectionstrings.0.composed
}
#Create MongoDB instance - End


#Create Certificate Manager - Start
resource "ibm_resource_instance" "certmanager" {
    name     = "${var.environment}-${var.node}-${var.certmanager_name}"
    resource_group_id = "${data.ibm_resource_group.group.id}"
    plan    = var.certmanager_plan
    location = "${var.region}"
    service  = "cloudcerts"
}
#Create Certificate Manager - End

#Create Kubernetes instance - Start
resource "ibm_container_cluster" "ibpclusters" {
  
  name                      = "${var.environment}-${var.node}-ibp-clstr"
  datacenter                = var.cluster_datacenter
  machine_type              = var.cluster_machinetype
  resource_group_id         = "${data.ibm_resource_group.group.id}"
  
  hardware                  = "shared"
  public_service_endpoint   = true
  public_vlan_id            = "2619937"
  private_vlan_id           = "2619939"
  default_pool_size         = var.cluster_numworkernodes
}

resource "ibm_container_cluster" "appsclusters" {

  name                      = "${var.environment}-${var.node}-apps-clstr"
  datacenter                = var.cluster_datacenter
  machine_type              = var.cluster_machinetype
  resource_group_id         = "${data.ibm_resource_group.group.id}"
  
  hardware                  = "shared"
  public_service_endpoint   = true
  public_vlan_id            = "2619937"
  private_vlan_id           = "2619939"
  default_pool_size         = var.cluster_numworkernodes
}

resource "ibm_container_cluster" "nificlusters" {
  count = "${var.node == "analytics" ? 0 : 1}"
  name                      = "${var.environment}-${var.node}-nifi-clstr"
  datacenter                = var.cluster_datacenter
  machine_type              = var.cluster_machinetype
  resource_group_id         = "${data.ibm_resource_group.group.id}"
  
  hardware                  = "shared"
  public_service_endpoint   = true
  public_vlan_id            = "2619937"
  private_vlan_id           = "2619939"
  default_pool_size         = 3
}

#Create Kubernetes instance - End

#Create IBP instance - Start
resource "ibm_resource_instance" "mos-ibp" {
  name              = "${var.environment}-${var.node}-${var.ibp_name}"
  service           = "blockchain"
  plan              = "standard"
  location          = "${var.region}"
  resource_group_id = "${data.ibm_resource_group.group.id}"
}
#Create IBP instance - End
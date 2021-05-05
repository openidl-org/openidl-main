# SPDX-License-Identifier: Apache-2.0
#IBM Cloud API KEY
variable ibmcloud_api_key {}

#Classic Infrastructure keys
variable iaas_classic_username {}
variable iaas_classic_api_key {}
variable region {
    type    = string
    default = "us-south"
}

#Environment
variable environment {
    type    = string
}

#COS
variable cos_name {
    type    = string
    default = "cos"
}

#Node
variable node {
    type    = string
}

#AppID variables
variable appid_plan {
    type    = string
    default = "lite"
}
variable appid_name {
    type    = string
    default = "appid"
}

#MongoDB variables
variable mongo_plan {
    type    = string
    default = "standard"
}
variable mongo_name {
    type    = string
    default = "mongodb"
}
variable mongo_memory {
    type    = number
    default = 3072
}
variable mongo_disk {
    type    = number
    default = 30720
}

#AppID variables
variable certmanager_plan {
    type    = string
    default = "free"
}
variable certmanager_name {
    type    = string
    default = "certman"
}

# Cluster variables
variable cluster_machinetype {
    type    = string
    default = "b3c.4x16"
}
variable cluster_datacenter {
    type    = string
    default = "dal10"
}
variable cluster_numworkernodes {
    type    = number
    default = 1
}

# IBP variables
variable ibp_name {
    type    = string
    default = "ibp"
}





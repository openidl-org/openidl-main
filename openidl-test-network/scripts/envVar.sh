#!/bin/bash
#
# Copyright IBM Corp All Rights Reserved
#
# SPDX-License-Identifier: Apache-2.0
#

# This is a collection of bash functions used by different scripts

# imports
. scripts/utils.sh

export CORE_PEER_TLS_ENABLED=true
export ORDERER_CA=${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem
export PEER0_AAIS_CA=${PWD}/organizations/peerOrganizations/aais.example.com/peers/peer0.aais.example.com/tls/ca.crt
export PEER0_ANALYTICS_CA=${PWD}/organizations/peerOrganizations/analytics.example.com/peers/peer0.analytics.example.com/tls/ca.crt
export PEER0_CARRIER_CA=${PWD}/organizations/peerOrganizations/carrier.example.com/peers/peer0.carrier.example.com/tls/ca.crt

# Set environment variables for the peer org
setGlobals() {
  local USING_ORG=""
  if [ -z "$OVERRIDE_ORG" ]; then
    USING_ORG=$1
  else
    USING_ORG="${OVERRIDE_ORG}"
  fi
  infoln "Using organization ${USING_ORG}"
  if [ "$USING_ORG" == "aais" ]; then
    export CORE_PEER_LOCALMSPID="aaismsp"
    export CORE_PEER_TLS_ROOTCERT_FILE=$PEER0_AAIS_CA
    export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/aais.example.com/users/Admin@aais.example.com/msp
    export CORE_PEER_ADDRESS=localhost:7051
  elif [ "$USING_ORG" == "analytics" ]; then
    export CORE_PEER_LOCALMSPID="analyticsmsp"
    export CORE_PEER_TLS_ROOTCERT_FILE=$PEER0_ANALYTICS_CA
    export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/analytics.example.com/users/Admin@analytics.example.com/msp
    export CORE_PEER_ADDRESS=localhost:9051

  elif [ "$USING_ORG" == "carrier" ]; then
    export CORE_PEER_LOCALMSPID="carriermsp"
    export CORE_PEER_TLS_ROOTCERT_FILE=$PEER0_CARRIER_CA
    export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/carrier.example.com/users/Admin@carrier.example.com/msp
    export CORE_PEER_ADDRESS=localhost:11051
  else
    errorln "ORG Unknown"
  fi

  if [ "$VERBOSE" == "true" ]; then
    env | grep CORE
  fi
}

# Set environment variables for use in the CLI container 
setGlobalsCLI() {
  setGlobals $1

  local USING_ORG=""
  if [ -z "$OVERRIDE_ORG" ]; then
    USING_ORG=$1
  else
    USING_ORG="${OVERRIDE_ORG}"
  fi
  if [ "$USING_ORG" == "aais" ]; then
    export CORE_PEER_ADDRESS=peer0.aais.example.com:7051
  elif [ "$USING_ORG" == "analytics" ]; then
    export CORE_PEER_ADDRESS=peer0.analytics.example.com:9051
  elif [ "$USING_ORG" == "carrier" ]; then
    export CORE_PEER_ADDRESS=peer0.carrier.example.com:11051
  else
    errorln "ORG Unknown"
  fi
}

# parsePeerConnectionParameters $@
# Helper function that sets the peer connection parameters for a chaincode
# operation
parsePeerConnectionParameters() {
  PEER_CONN_PARMS=""
  PEERS=""
  echo $1
  while [ "$#" -gt 0 ]; do
    setGlobals $1
    PEER="peer0.$1"
    ## Set peer addresses
    PEERS="$PEERS $PEER"
    PEER_CONN_PARMS="$PEER_CONN_PARMS --peerAddresses $CORE_PEER_ADDRESS"
    ## Set path to TLS certificate
    TLSINFO=$(eval echo "--tlsRootCertFiles \$PEER0_$(echo $1 | tr 'a-z' 'A-Z')_CA")
    PEER_CONN_PARMS="$PEER_CONN_PARMS $TLSINFO"
    # shift by one to get to the next organization
    shift
  done
  # remove leading space for output
  PEERS="$(echo -e "$PEERS" | sed -e 's/^[[:space:]]*//')"
}

verifyResult() {
  if [ $1 -ne 0 ]; then
    fatalln "$2"
  fi
}

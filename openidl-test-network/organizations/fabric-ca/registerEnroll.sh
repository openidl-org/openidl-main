#!/bin/bash

function createaais() {
  infoln "Enrolling the CA admin"
  mkdir -p organizations/peerOrganizations/aais.example.com/

  export FABRIC_CA_CLIENT_HOME=${PWD}/organizations/peerOrganizations/aais.example.com/

  
  fabric-ca-client enroll -u https://admin:adminpw@localhost:7054 --caname ca-aais --tls.certfiles ${PWD}/organizations/fabric-ca/aais/tls-cert.pem
  

  echo 'NodeOUs:
  Enable: true
  ClientOUIdentifier:
    Certificate: cacerts/localhost-7054-ca-aais.pem
    OrganizationalUnitIdentifier: client
  PeerOUIdentifier:
    Certificate: cacerts/localhost-7054-ca-aais.pem
    OrganizationalUnitIdentifier: peer
  AdminOUIdentifier:
    Certificate: cacerts/localhost-7054-ca-aais.pem
    OrganizationalUnitIdentifier: admin
  OrdererOUIdentifier:
    Certificate: cacerts/localhost-7054-ca-aais.pem
    OrganizationalUnitIdentifier: orderer' >${PWD}/organizations/peerOrganizations/aais.example.com/msp/config.yaml

  infoln "Registering peer0"
  
  fabric-ca-client register --caname ca-aais --id.name peer0 --id.secret peer0pw --id.type peer --tls.certfiles ${PWD}/organizations/fabric-ca/aais/tls-cert.pem
  

  infoln "Registering user"
  
  fabric-ca-client register --caname ca-aais --id.name user1 --id.secret user1pw --id.type client --tls.certfiles ${PWD}/organizations/fabric-ca/aais/tls-cert.pem
  

  infoln "Registering the org admin"
  
  fabric-ca-client register --caname ca-aais --id.name aaisadmin --id.secret aaisadminpw --id.type admin --tls.certfiles ${PWD}/organizations/fabric-ca/aais/tls-cert.pem
  

  infoln "Generating the peer0 msp"
  
  fabric-ca-client enroll -u https://peer0:peer0pw@localhost:7054 --caname ca-aais -M ${PWD}/organizations/peerOrganizations/aais.example.com/peers/peer0.aais.example.com/msp --csr.hosts peer0.aais.example.com --tls.certfiles ${PWD}/organizations/fabric-ca/aais/tls-cert.pem
  

  cp ${PWD}/organizations/peerOrganizations/aais.example.com/msp/config.yaml ${PWD}/organizations/peerOrganizations/aais.example.com/peers/peer0.aais.example.com/msp/config.yaml

  infoln "Generating the peer0-tls certificates"
  
  fabric-ca-client enroll -u https://peer0:peer0pw@localhost:7054 --caname ca-aais -M ${PWD}/organizations/peerOrganizations/aais.example.com/peers/peer0.aais.example.com/tls --enrollment.profile tls --csr.hosts peer0.aais.example.com --csr.hosts localhost --tls.certfiles ${PWD}/organizations/fabric-ca/aais/tls-cert.pem
  

  cp ${PWD}/organizations/peerOrganizations/aais.example.com/peers/peer0.aais.example.com/tls/tlscacerts/* ${PWD}/organizations/peerOrganizations/aais.example.com/peers/peer0.aais.example.com/tls/ca.crt
  cp ${PWD}/organizations/peerOrganizations/aais.example.com/peers/peer0.aais.example.com/tls/signcerts/* ${PWD}/organizations/peerOrganizations/aais.example.com/peers/peer0.aais.example.com/tls/server.crt
  cp ${PWD}/organizations/peerOrganizations/aais.example.com/peers/peer0.aais.example.com/tls/keystore/* ${PWD}/organizations/peerOrganizations/aais.example.com/peers/peer0.aais.example.com/tls/server.key

  mkdir -p ${PWD}/organizations/peerOrganizations/aais.example.com/msp/tlscacerts
  cp ${PWD}/organizations/peerOrganizations/aais.example.com/peers/peer0.aais.example.com/tls/tlscacerts/* ${PWD}/organizations/peerOrganizations/aais.example.com/msp/tlscacerts/ca.crt

  mkdir -p ${PWD}/organizations/peerOrganizations/aais.example.com/tlsca
  cp ${PWD}/organizations/peerOrganizations/aais.example.com/peers/peer0.aais.example.com/tls/tlscacerts/* ${PWD}/organizations/peerOrganizations/aais.example.com/tlsca/tlsca.aais.example.com-cert.pem

  mkdir -p ${PWD}/organizations/peerOrganizations/aais.example.com/ca
  cp ${PWD}/organizations/peerOrganizations/aais.example.com/peers/peer0.aais.example.com/msp/cacerts/* ${PWD}/organizations/peerOrganizations/aais.example.com/ca/ca.aais.example.com-cert.pem

  infoln "Generating the user msp"
  
  fabric-ca-client enroll -u https://user1:user1pw@localhost:7054 --caname ca-aais -M ${PWD}/organizations/peerOrganizations/aais.example.com/users/User1@aais.example.com/msp --tls.certfiles ${PWD}/organizations/fabric-ca/aais/tls-cert.pem
  

  cp ${PWD}/organizations/peerOrganizations/aais.example.com/msp/config.yaml ${PWD}/organizations/peerOrganizations/aais.example.com/users/User1@aais.example.com/msp/config.yaml

  infoln "Generating the org admin msp"
  
  fabric-ca-client enroll -u https://aaisadmin:aaisadminpw@localhost:7054 --caname ca-aais -M ${PWD}/organizations/peerOrganizations/aais.example.com/users/Admin@aais.example.com/msp --tls.certfiles ${PWD}/organizations/fabric-ca/aais/tls-cert.pem
  

  cp ${PWD}/organizations/peerOrganizations/aais.example.com/msp/config.yaml ${PWD}/organizations/peerOrganizations/aais.example.com/users/Admin@aais.example.com/msp/config.yaml
}

function createanalytics() {
  infoln "Enrolling the CA admin"
  mkdir -p organizations/peerOrganizations/analytics.example.com/

  export FABRIC_CA_CLIENT_HOME=${PWD}/organizations/peerOrganizations/analytics.example.com/

  
  fabric-ca-client enroll -u https://admin:adminpw@localhost:8054 --caname ca-analytics --tls.certfiles ${PWD}/organizations/fabric-ca/analytics/tls-cert.pem
  

  echo 'NodeOUs:
  Enable: true
  ClientOUIdentifier:
    Certificate: cacerts/localhost-8054-ca-analytics.pem
    OrganizationalUnitIdentifier: client
  PeerOUIdentifier:
    Certificate: cacerts/localhost-8054-ca-analytics.pem
    OrganizationalUnitIdentifier: peer
  AdminOUIdentifier:
    Certificate: cacerts/localhost-8054-ca-analytics.pem
    OrganizationalUnitIdentifier: admin
  OrdererOUIdentifier:
    Certificate: cacerts/localhost-8054-ca-analytics.pem
    OrganizationalUnitIdentifier: orderer' >${PWD}/organizations/peerOrganizations/analytics.example.com/msp/config.yaml

  infoln "Registering peer0"
  
  fabric-ca-client register --caname ca-analytics --id.name peer0 --id.secret peer0pw --id.type peer --tls.certfiles ${PWD}/organizations/fabric-ca/analytics/tls-cert.pem
  

  infoln "Registering user"
  
  fabric-ca-client register --caname ca-analytics --id.name user1 --id.secret user1pw --id.type client --tls.certfiles ${PWD}/organizations/fabric-ca/analytics/tls-cert.pem
  

  infoln "Registering the org admin"
  
  fabric-ca-client register --caname ca-analytics --id.name analyticsadmin --id.secret analyticsadminpw --id.type admin --tls.certfiles ${PWD}/organizations/fabric-ca/analytics/tls-cert.pem
  

  infoln "Generating the peer0 msp"
  
  fabric-ca-client enroll -u https://peer0:peer0pw@localhost:8054 --caname ca-analytics -M ${PWD}/organizations/peerOrganizations/analytics.example.com/peers/peer0.analytics.example.com/msp --csr.hosts peer0.analytics.example.com --tls.certfiles ${PWD}/organizations/fabric-ca/analytics/tls-cert.pem
  

  cp ${PWD}/organizations/peerOrganizations/analytics.example.com/msp/config.yaml ${PWD}/organizations/peerOrganizations/analytics.example.com/peers/peer0.analytics.example.com/msp/config.yaml

  infoln "Generating the peer0-tls certificates"
  
  fabric-ca-client enroll -u https://peer0:peer0pw@localhost:8054 --caname ca-analytics -M ${PWD}/organizations/peerOrganizations/analytics.example.com/peers/peer0.analytics.example.com/tls --enrollment.profile tls --csr.hosts peer0.analytics.example.com --csr.hosts localhost --tls.certfiles ${PWD}/organizations/fabric-ca/analytics/tls-cert.pem
  

  cp ${PWD}/organizations/peerOrganizations/analytics.example.com/peers/peer0.analytics.example.com/tls/tlscacerts/* ${PWD}/organizations/peerOrganizations/analytics.example.com/peers/peer0.analytics.example.com/tls/ca.crt
  cp ${PWD}/organizations/peerOrganizations/analytics.example.com/peers/peer0.analytics.example.com/tls/signcerts/* ${PWD}/organizations/peerOrganizations/analytics.example.com/peers/peer0.analytics.example.com/tls/server.crt
  cp ${PWD}/organizations/peerOrganizations/analytics.example.com/peers/peer0.analytics.example.com/tls/keystore/* ${PWD}/organizations/peerOrganizations/analytics.example.com/peers/peer0.analytics.example.com/tls/server.key

  mkdir -p ${PWD}/organizations/peerOrganizations/analytics.example.com/msp/tlscacerts
  cp ${PWD}/organizations/peerOrganizations/analytics.example.com/peers/peer0.analytics.example.com/tls/tlscacerts/* ${PWD}/organizations/peerOrganizations/analytics.example.com/msp/tlscacerts/ca.crt

  mkdir -p ${PWD}/organizations/peerOrganizations/analytics.example.com/tlsca
  cp ${PWD}/organizations/peerOrganizations/analytics.example.com/peers/peer0.analytics.example.com/tls/tlscacerts/* ${PWD}/organizations/peerOrganizations/analytics.example.com/tlsca/tlsca.analytics.example.com-cert.pem

  mkdir -p ${PWD}/organizations/peerOrganizations/analytics.example.com/ca
  cp ${PWD}/organizations/peerOrganizations/analytics.example.com/peers/peer0.analytics.example.com/msp/cacerts/* ${PWD}/organizations/peerOrganizations/analytics.example.com/ca/ca.analytics.example.com-cert.pem

  infoln "Generating the user msp"
  
  fabric-ca-client enroll -u https://user1:user1pw@localhost:8054 --caname ca-analytics -M ${PWD}/organizations/peerOrganizations/analytics.example.com/users/User1@analytics.example.com/msp --tls.certfiles ${PWD}/organizations/fabric-ca/analytics/tls-cert.pem
  

  cp ${PWD}/organizations/peerOrganizations/analytics.example.com/msp/config.yaml ${PWD}/organizations/peerOrganizations/analytics.example.com/users/User1@analytics.example.com/msp/config.yaml

  infoln "Generating the org admin msp"
  
  fabric-ca-client enroll -u https://analyticsadmin:analyticsadminpw@localhost:8054 --caname ca-analytics -M ${PWD}/organizations/peerOrganizations/analytics.example.com/users/Admin@analytics.example.com/msp --tls.certfiles ${PWD}/organizations/fabric-ca/analytics/tls-cert.pem
  

  cp ${PWD}/organizations/peerOrganizations/analytics.example.com/msp/config.yaml ${PWD}/organizations/peerOrganizations/analytics.example.com/users/Admin@analytics.example.com/msp/config.yaml
}

function createcarrier() {
  infoln "Enrolling the CA admin"
  mkdir -p organizations/peerOrganizations/carrier.example.com/

  export FABRIC_CA_CLIENT_HOME=${PWD}/organizations/peerOrganizations/carrier.example.com/

  
  fabric-ca-client enroll -u https://admin:adminpw@localhost:10054 --caname ca-carrier --tls.certfiles ${PWD}/organizations/fabric-ca/carrier/tls-cert.pem
  

  echo 'NodeOUs:
  Enable: true
  ClientOUIdentifier:
    Certificate: cacerts/localhost-10054-ca-carrier.pem
    OrganizationalUnitIdentifier: client
  PeerOUIdentifier:
    Certificate: cacerts/localhost-10054-ca-carrier.pem
    OrganizationalUnitIdentifier: peer
  AdminOUIdentifier:
    Certificate: cacerts/localhost-10054-ca-carrier.pem
    OrganizationalUnitIdentifier: admin
  OrdererOUIdentifier:
    Certificate: cacerts/localhost-10054-ca-carrier.pem
    OrganizationalUnitIdentifier: orderer' >${PWD}/organizations/peerOrganizations/carrier.example.com/msp/config.yaml

  infoln "Registering peer0"
  
  fabric-ca-client register --caname ca-carrier --id.name peer0 --id.secret peer0pw --id.type peer --tls.certfiles ${PWD}/organizations/fabric-ca/carrier/tls-cert.pem
  

  infoln "Registering user"
  
  fabric-ca-client register --caname ca-carrier --id.name user1 --id.secret user1pw --id.type client --tls.certfiles ${PWD}/organizations/fabric-ca/carrier/tls-cert.pem
  

  infoln "Registering the org admin"
  
  fabric-ca-client register --caname ca-carrier --id.name carrieradmin --id.secret carrieradminpw --id.type admin --tls.certfiles ${PWD}/organizations/fabric-ca/carrier/tls-cert.pem
  

  infoln "Generating the peer0 msp"
  
  fabric-ca-client enroll -u https://peer0:peer0pw@localhost:10054 --caname ca-carrier -M ${PWD}/organizations/peerOrganizations/carrier.example.com/peers/peer0.carrier.example.com/msp --csr.hosts peer0.carrier.example.com --tls.certfiles ${PWD}/organizations/fabric-ca/carrier/tls-cert.pem
  

  cp ${PWD}/organizations/peerOrganizations/carrier.example.com/msp/config.yaml ${PWD}/organizations/peerOrganizations/carrier.example.com/peers/peer0.carrier.example.com/msp/config.yaml

  infoln "Generating the peer0-tls certificates"
  
  fabric-ca-client enroll -u https://peer0:peer0pw@localhost:10054 --caname ca-carrier -M ${PWD}/organizations/peerOrganizations/carrier.example.com/peers/peer0.carrier.example.com/tls --enrollment.profile tls --csr.hosts peer0.carrier.example.com --csr.hosts localhost --tls.certfiles ${PWD}/organizations/fabric-ca/carrier/tls-cert.pem
  

  cp ${PWD}/organizations/peerOrganizations/carrier.example.com/peers/peer0.carrier.example.com/tls/tlscacerts/* ${PWD}/organizations/peerOrganizations/carrier.example.com/peers/peer0.carrier.example.com/tls/ca.crt
  cp ${PWD}/organizations/peerOrganizations/carrier.example.com/peers/peer0.carrier.example.com/tls/signcerts/* ${PWD}/organizations/peerOrganizations/carrier.example.com/peers/peer0.carrier.example.com/tls/server.crt
  cp ${PWD}/organizations/peerOrganizations/carrier.example.com/peers/peer0.carrier.example.com/tls/keystore/* ${PWD}/organizations/peerOrganizations/carrier.example.com/peers/peer0.carrier.example.com/tls/server.key

  mkdir -p ${PWD}/organizations/peerOrganizations/carrier.example.com/msp/tlscacerts
  cp ${PWD}/organizations/peerOrganizations/carrier.example.com/peers/peer0.carrier.example.com/tls/tlscacerts/* ${PWD}/organizations/peerOrganizations/carrier.example.com/msp/tlscacerts/ca.crt

  mkdir -p ${PWD}/organizations/peerOrganizations/carrier.example.com/tlsca
  cp ${PWD}/organizations/peerOrganizations/carrier.example.com/peers/peer0.carrier.example.com/tls/tlscacerts/* ${PWD}/organizations/peerOrganizations/carrier.example.com/tlsca/tlsca.carrier.example.com-cert.pem

  mkdir -p ${PWD}/organizations/peerOrganizations/carrier.example.com/ca
  cp ${PWD}/organizations/peerOrganizations/carrier.example.com/peers/peer0.carrier.example.com/msp/cacerts/* ${PWD}/organizations/peerOrganizations/carrier.example.com/ca/ca.carrier.example.com-cert.pem

  infoln "Generating the user msp"
  
  fabric-ca-client enroll -u https://user1:user1pw@localhost:10054 --caname ca-carrier -M ${PWD}/organizations/peerOrganizations/carrier.example.com/users/User1@carrier.example.com/msp --tls.certfiles ${PWD}/organizations/fabric-ca/carrier/tls-cert.pem
  

  cp ${PWD}/organizations/peerOrganizations/carrier.example.com/msp/config.yaml ${PWD}/organizations/peerOrganizations/carrier.example.com/users/User1@carrier.example.com/msp/config.yaml

  infoln "Generating the org admin msp"
  
  fabric-ca-client enroll -u https://carrieradmin:carrieradminpw@localhost:10054 --caname ca-carrier -M ${PWD}/organizations/peerOrganizations/carrier.example.com/users/Admin@carrier.example.com/msp --tls.certfiles ${PWD}/organizations/fabric-ca/carrier/tls-cert.pem
  

  cp ${PWD}/organizations/peerOrganizations/carrier.example.com/msp/config.yaml ${PWD}/organizations/peerOrganizations/carrier.example.com/users/Admin@carrier.example.com/msp/config.yaml
}

function createOrderer() {
  infoln "Enrolling the CA admin"
  mkdir -p organizations/ordererOrganizations/example.com

  export FABRIC_CA_CLIENT_HOME=${PWD}/organizations/ordererOrganizations/example.com

  
  fabric-ca-client enroll -u https://admin:adminpw@localhost:9054 --caname ca-orderer --tls.certfiles ${PWD}/organizations/fabric-ca/ordererOrg/tls-cert.pem
  

  echo 'NodeOUs:
  Enable: true
  ClientOUIdentifier:
    Certificate: cacerts/localhost-9054-ca-orderer.pem
    OrganizationalUnitIdentifier: client
  PeerOUIdentifier:
    Certificate: cacerts/localhost-9054-ca-orderer.pem
    OrganizationalUnitIdentifier: peer
  AdminOUIdentifier:
    Certificate: cacerts/localhost-9054-ca-orderer.pem
    OrganizationalUnitIdentifier: admin
  OrdererOUIdentifier:
    Certificate: cacerts/localhost-9054-ca-orderer.pem
    OrganizationalUnitIdentifier: orderer' >${PWD}/organizations/ordererOrganizations/example.com/msp/config.yaml

  infoln "Registering orderer"
  
  fabric-ca-client register --caname ca-orderer --id.name orderer --id.secret ordererpw --id.type orderer --tls.certfiles ${PWD}/organizations/fabric-ca/ordererOrg/tls-cert.pem
  

  infoln "Registering the orderer admin"
  
  fabric-ca-client register --caname ca-orderer --id.name ordererAdmin --id.secret ordererAdminpw --id.type admin --tls.certfiles ${PWD}/organizations/fabric-ca/ordererOrg/tls-cert.pem
  

  infoln "Generating the orderer msp"
  
  fabric-ca-client enroll -u https://orderer:ordererpw@localhost:9054 --caname ca-orderer -M ${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp --csr.hosts orderer.example.com --csr.hosts localhost --tls.certfiles ${PWD}/organizations/fabric-ca/ordererOrg/tls-cert.pem
  

  cp ${PWD}/organizations/ordererOrganizations/example.com/msp/config.yaml ${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/config.yaml

  infoln "Generating the orderer-tls certificates"
  
  fabric-ca-client enroll -u https://orderer:ordererpw@localhost:9054 --caname ca-orderer -M ${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/tls --enrollment.profile tls --csr.hosts orderer.example.com --csr.hosts localhost --tls.certfiles ${PWD}/organizations/fabric-ca/ordererOrg/tls-cert.pem
  

  cp ${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/tls/tlscacerts/* ${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/tls/ca.crt
  cp ${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/tls/signcerts/* ${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/tls/server.crt
  cp ${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/tls/keystore/* ${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/tls/server.key

  mkdir -p ${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts
  cp ${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/tls/tlscacerts/* ${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem

  mkdir -p ${PWD}/organizations/ordererOrganizations/example.com/msp/tlscacerts
  cp ${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/tls/tlscacerts/* ${PWD}/organizations/ordererOrganizations/example.com/msp/tlscacerts/tlsca.example.com-cert.pem

  infoln "Generating the admin msp"
  
  fabric-ca-client enroll -u https://ordererAdmin:ordererAdminpw@localhost:9054 --caname ca-orderer -M ${PWD}/organizations/ordererOrganizations/example.com/users/Admin@example.com/msp --tls.certfiles ${PWD}/organizations/fabric-ca/ordererOrg/tls-cert.pem
  

  cp ${PWD}/organizations/ordererOrganizations/example.com/msp/config.yaml ${PWD}/organizations/ordererOrganizations/example.com/users/Admin@example.com/msp/config.yaml
}

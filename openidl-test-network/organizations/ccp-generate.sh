#!/bin/bash

function one_line_pem {
    echo "`awk 'NF {sub(/\\n/, ""); printf "%s\\\\\\\n",$0;}' $1`"
}

function json_ccp {
    local PP=$(one_line_pem $4)
    local CP=$(one_line_pem $5)
    sed -e "s/\${ORG}/$1/" \
        -e "s/\${P0PORT}/$2/" \
        -e "s/\${CAPORT}/$3/" \
        -e "s#\${PEERPEM}#$PP#" \
        -e "s#\${CAPEM}#$CP#" \
        organizations/ccp-template.json
}

function yaml_ccp {
    local PP=$(one_line_pem $4)
    local CP=$(one_line_pem $5)
    sed -e "s/\${ORG}/$1/" \
        -e "s/\${P0PORT}/$2/" \
        -e "s/\${CAPORT}/$3/" \
        -e "s#\${PEERPEM}#$PP#" \
        -e "s#\${CAPEM}#$CP#" \
        organizations/ccp-template.yaml | sed -e $'s/\\\\n/\\\n          /g'
}

ORG=aais
P0PORT=7051
CAPORT=7054
PEERPEM=organizations/peerOrganizations/aais.example.com/tlsca/tlsca.aais.example.com-cert.pem
CAPEM=organizations/peerOrganizations/aais.example.com/ca/ca.aais.example.com-cert.pem

echo "$(json_ccp $ORG $P0PORT $CAPORT $PEERPEM $CAPEM)" > organizations/peerOrganizations/aais.example.com/connection-aais.json
echo "$(yaml_ccp $ORG $P0PORT $CAPORT $PEERPEM $CAPEM)" > organizations/peerOrganizations/aais.example.com/connection-aais.yaml

ORG=analytics
P0PORT=9051
CAPORT=8054
PEERPEM=organizations/peerOrganizations/analytics.example.com/tlsca/tlsca.analytics.example.com-cert.pem
CAPEM=organizations/peerOrganizations/analytics.example.com/ca/ca.analytics.example.com-cert.pem

echo "$(json_ccp $ORG $P0PORT $CAPORT $PEERPEM $CAPEM)" > organizations/peerOrganizations/analytics.example.com/connection-analytics.json
echo "$(yaml_ccp $ORG $P0PORT $CAPORT $PEERPEM $CAPEM)" > organizations/peerOrganizations/analytics.example.com/connection-analytics.yaml


ORG=carrier
P0PORT=11051
CAPORT=10054
PEERPEM=organizations/peerOrganizations/carrier.example.com/tlsca/tlsca.carrier.example.com-cert.pem
CAPEM=organizations/peerOrganizations/carrier.example.com/ca/ca.carrier.example.com-cert.pem

echo "$(json_ccp $ORG $P0PORT $CAPORT $PEERPEM $CAPEM)" > organizations/peerOrganizations/carrier.example.com/connection-carrier.json
echo "$(yaml_ccp $ORG $P0PORT $CAPORT $PEERPEM $CAPEM)" > organizations/peerOrganizations/carrier.example.com/connection-carrier.yaml

// create a configuration file that holds all info necessary access the services in minikube
// something like:
/*
{
    "ip": "192.168.64.87",
    "carrier" : {
        "utilities" : "31522",
        "insuranceDataManager" : "31523",
        "dataCallApp" : "31524" 
    }
    "aais" : {
        "utilities" : "31522",
        "insuranceDataManager" : "31523",
        "dataCallApp" : "31524" 
    }
    "analytics" : {
        "utilities" : "31522",
        "insuranceDataManager" : "31523",
        "dataCallApp" : "31524" 
    }
}
*/
const fs = require('fs')
const execSync = require('child_process').execSync
const k8s = require('@kubernetes/client-node');

let config = {}

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

// k8sApi.listNamespace().then((res) => {
//     console.log(res.body);
// });

async function processStuff() {
    const output = execSync('minikube ip', { encoding: 'utf-8' })
    config.ip = output.trim()
    let namespacesResult = await k8sApi.listNamespace()
    for (ns of namespacesResult.body.items) {
        let servicesResult = await k8sApi.listNamespacedService(ns.metadata.name, 'pretty')
        for (item of servicesResult.body.items) {
            // console.log(item)
            // console.log(item.metadata.name)
            let namespace = config[item.metadata.namespace]
            if (!namespace) {
                namespace = {}
                config[item.metadata.namespace] = namespace
            }
            let service = namespace[item.metadata.name]
            if (!service) {
                service = {}
                namespace[item.metadata.name] = service
            }
            for (port of item.spec.ports) {
                // console.log(port)
                service.port = port.nodePort
            }
            // service.port = '11111'
        }
    }
    fs.writeFile('./config/config.json', JSON.stringify(config), err => {
        if (err) {
            console.log('Error writing config file.')
        } else {
            console.log('Successfully wrote config file')
        }
    })
}

processStuff()


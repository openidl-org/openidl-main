# openIDL chaincode

This repository contains one smart contract (aka chaincode) component for the openIDL network:
* `openIDLCC` - This chaincode component is installed and instantiated in the network. Please see the test-network documentation for more details.

Please note that the `openIDLCC` chaincode component is implemented in the [GO](https://golang.org/) language.

## Key Entities
The following are the main entities (aka structures) defined in the `openIDLCC` chaincode component:

1. DataCall.
1. Report 
1. Like
1. Consent

## Compiling and running test cases locally
### Platform
It is strongly recommended to use **macOS** or a **Linux** flavor (such as Ubuntu) for compiling and testing the chaincode components. 

### Prerequisites
1) Before you attempt to compile and run the tests cases for the chaincode components, please make sure you have the necessary pre-requisites on your system:

* GO programming language (v1.16.x)
* Python (v2.7)

2) Finally, you'll also need to download the following assert library before proceeding with steps in the next section:

```
go get github.com/stretchr/testify/assert
```

### Steps

1) You should clone this repository into the `src` folder of your `GOPATH` folder (it is assumed you have configured your GO development environment and the `GOPATH` environment variable is set accordingly).

2) Navigate to the folder where you cloned this repository and go to the `chaincode/openidl` sub-folder.

3) Once in the `chaincode/openidl` sub-folder, let's run `go build` to compile the chaincode (please note there will not be any output message if compilation was successful:

```
$ pwd
$GOPATH/src/openidl-chaincode/chaincode/openidl
$ go build
```

After compiling the chaincode, you should see an executable file named `openidl` in the `chaincode/openidl` sub-folder.

4) To run the automated test cases for the chaincode, execute `go test *.go` in the `chaincode/openidl` sub-folder. All tests should succeed; you should see a `ok` message as the output, similar to the following:

```
$ go test  *.go
ok  	command-line-arguments	0.032s

```

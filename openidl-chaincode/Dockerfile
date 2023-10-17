# openIDL Dockerfile
ARG GO_VER=1.17.5
ARG ALPINE_VER=3.14

FROM golang:${GO_VER}-alpine${ALPINE_VER} as build

RUN apk add --no-cache \
	bash \
	binutils-gold \
  dumb-init \
	gcc \
	git \
	make \
	musl-dev

ADD ./chaincode/openidl $GOPATH/src/openidl-chaincode/chaincode/openidl
WORKDIR $GOPATH/src/openidl-chaincode/chaincode/openidl

RUN go install

RUN ls -l
RUN ls -l /go/bin

FROM golang:${GO_VER}-alpine${ALPINE_VER}

LABEL org.opencontainers.image.title "openIDL Smart Contract"
LABEL org.opencontainers.image.description "openIDL smart contract for Kubernetes chaincode builder"
LABEL org.opencontainers.image.source "https://github.com/openidl-org/openidl-main/openidl-chaincode"

COPY --from=build /usr/bin/dumb-init /usr/bin/dumb-init
COPY --from=build /go/bin/openidl-contract /usr/bin/openidl-contract

WORKDIR /var/openidl
ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["sh", "-c", "exec /usr/bin/openidl-contract -peer.address=$CORE_PEER_ADDRESS"]

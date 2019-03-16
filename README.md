# Stella Project

## Getting Started

Install golang

```bash
$ brew install golang
$ export GOPATH=$HOME/golang # or any place you want. You may also want to put that in .zshrc or .bashrc
$ mkdir -p $GOPATH/src/github.com/Buzzvil
$ cd $GOPATH/src/github.com/Buzzvil
$ git clone git@github.com:Buzzvil/stella.git
```

Install docker for desktop and [enable kubernetes](https://medium.com/containers-101/local-kubernetes-for-mac-minikube-vs-docker-desktop-f2789b3cad3a).

Install kubernetes and related tools.
```
$ brew install kubernetes-cli kubernetes-helm skaffold stern
$ helm init
```

Run `skaffold dev` within project root directory.

## Directory Layout

* authsvc: Authentication service. Handles slack oauth2 login flow and verifies signed requests.
* booksvc: Manages book catalog.
* chart: Helm chart for deployment.
* frontend: Web frontend.
* protobuf: Contains protobuf definitions.
* ratingsvc: Rate/review entity(book).
* rentalsvc: Rent entity(book).

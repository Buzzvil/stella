FROM golang:1.11-alpine

COPY . /go/src/github.com/Buzzvil/stella/authsvc

RUN go build -o /go/bin/authsvc github.com/Buzzvil/stella/authsvc/cmd/authsvc

ENTRYPOINT ["/go/bin/authsvc"]

EXPOSE 8080

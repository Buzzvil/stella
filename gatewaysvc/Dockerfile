FROM golang:1.11-alpine

COPY . /go/src/github.com/Buzzvil/stella/gatewaysvc

RUN go build -o /go/bin/gatewaysvc github.com/Buzzvil/stella/gatewaysvc/cmd/gatewaysvc

ENTRYPOINT ["/go/bin/gatewaysvc"]

EXPOSE 9000

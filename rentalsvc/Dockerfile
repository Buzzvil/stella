FROM golang:1.11-alpine

COPY . /go/src/github.com/Buzzvil/stella/rentalsvc

RUN go build -o /go/bin/rentalsvc github.com/Buzzvil/stella/rentalsvc/cmd/rentalsvc

ENTRYPOINT ["/go/bin/rentalsvc"]

EXPOSE 9000

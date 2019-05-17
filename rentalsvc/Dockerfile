FROM golang:1.11-alpine

RUN apk add --update gcc musl-dev

COPY . /go/src/github.com/Buzzvil/stella/rentalsvc

RUN go build -o /go/bin/rentalsvc github.com/Buzzvil/stella/rentalsvc/cmd/rentalsvc

ENTRYPOINT ["/go/bin/rentalsvc"]

EXPOSE 9000

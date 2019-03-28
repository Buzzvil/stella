FROM golang:1.11-alpine

COPY . /go/src/github.com/Buzzvil/stella

RUN go build -o /go/bin/ratingsvc github.com/Buzzvil/stella/ratingsvc/cmd/ratingsvc

ENTRYPOINT ["/go/bin/ratingsvc"]

EXPOSE 9000

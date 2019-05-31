FROM golang:1.11-alpine

RUN apk add --update git && rm -rf /var/cache/apk/* && \
    go get -tags 'postgres' -u github.com/golang-migrate/migrate/cmd/migrate

COPY . /go/src/github.com/Buzzvil/stella/usersvc

RUN go build -o /go/bin/usersvc github.com/Buzzvil/stella/usersvc/cmd/usersvc

ENTRYPOINT ["/go/bin/usersvc"]

EXPOSE 9000

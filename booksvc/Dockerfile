FROM golang:1.11-alpine

COPY . /go/src/github.com/Buzzvil/stella/booksvc

RUN go build -o /go/bin/booksvc github.com/Buzzvil/stella/booksvc/cmd/booksvc

ENTRYPOINT ["/go/bin/booksvc"]

EXPOSE 9000

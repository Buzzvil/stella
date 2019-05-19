FROM alpine:latest

LABEL version="1.0.0"
LABEL repository="http://github.com/Buzzvil/stella"
LABEL maintainer="Buzzvil"
LABEL "com.github.actions.name"="Diff includes"
LABEL "com.github.actions.description"="Stop workflow unless changes were made in certain files/directories."
LABEL "com.github.actions.icon"="check-square"
LABEL "com.github.actions.color"="gray-dark"

RUN apk add --update git jq && rm -rf /var/cache/apk/*

COPY entrypoint.sh /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]

FROM golang:1.11

LABEL version="1.0.0"
LABEL repository="http://github.com/Buzzvil/stella"
LABEL maintainer="Buzzvil"
LABEL "com.github.actions.name"="Go Tools"
LABEL "com.github.actions.description"="This is an Action to run go commands."
LABEL "com.github.actions.icon"="code"
LABEL "com.github.actions.color"="green-dark"

COPY entrypoint.sh /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]

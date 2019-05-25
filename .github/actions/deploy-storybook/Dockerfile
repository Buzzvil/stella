FROM node:10.15-alpine

LABEL version="1.0.0"
LABEL repository="http://github.com/Buzzvil/stella"
LABEL maintainer="Buzzvil"
LABEL "com.github.actions.name"="Publish storybook"
LABEL "com.github.actions.description"="This is an action to publish storybook to gh-pages."
LABEL "com.github.actions.icon"="upload-cloud"
LABEL "com.github.actions.color"="green-dark"

ADD entrypoint.sh /entrypoint.sh

ENTRYPOINT [ "/entrypoint.sh" ]

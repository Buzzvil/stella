#!/bin/sh

git config --global user.name "${GITHUB_ACTOR}"
git config --global user.email "${GITHUB_ACTOR}@users.noreply.github.com"
remote_repo="git@github.com:${GITHUB_REPOSITORY}.git"
git remote add origin "${remote_repo}"

cd frontend
echo 'Installing npm'
npm install
echo 'Deploying storybook'
npm run deploy-storybook -- --ci --host-token-env-variable=GITHUB_TOKEN
echo 'Successfully deployed!'

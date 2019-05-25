#!/bin/sh

cd frontend
echo 'Installing npm'
npm install
echo 'Deploying storybook'
npm run deploy-storybook -- --ci --host-token-env-variable=GITHUB_TOKEN
echo 'Successfully deployed!'

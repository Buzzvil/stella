#!/bin/sh -l

if ! git diff-index --quiet HEAD~$(jq '.commits | length' "${GITHUB_EVENT_PATH}") $*; then
  echo "Changes in $*, proceeding"
  exit 0
else
  echo "No changes in $*, stopping"
  exit 78
fi

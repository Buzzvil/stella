# Diff Includes Filter for GitHub Actions

This action includes a filter to stop workflows unless certain files or directories are changed in a range of commits.

## Examples

```hcl
workflow "Build if changed" {
  on = "push"
  resolves = ["Build"]
}

action "Check changes in authsvc" {
  uses = "./actions/diff-includes/"
  args = "authsvc"
}

// This will only be run if there are changes in authsvc directory in the last set
// of commits pushed
action "Build authsvc image" {
  needs = "Check changes in authsvc"
  uses = "actions/docker/cli@master"
  args = ["build", "-t", "authsvc", "authsvc"]
  needs = ["authsvc changed?"]
}
```

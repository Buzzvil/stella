workflow "Monorepo PR Repo Labeler" {
  resolves = ["Label PR Monorepos"]
  on = "pull_request"
}

action "Label PR Monorepos" {
  uses = "adamzolyak/monorepo-pr-labeler-action@master"
  secrets = ["GITHUB_TOKEN"]
}

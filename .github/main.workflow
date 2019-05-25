workflow "Monorepo PR Repo Labeler" {
  resolves = ["Label PR Monorepos"]
  on = "pull_request"
}

action "Label PR Monorepos" {
  uses = "adamzolyak/monorepo-pr-labeler-action@master"
  secrets = ["GITHUB_TOKEN"]
}

workflow "Deploy storybook to gh-pages" {
  resolves = ["Deploy storybook"]
  on = "push"
}

action "Filter master branch" {
  uses = "actions/bin/filter@3c0b4f0e63ea54ea5df2914b4fabf383368cd0da"
  args = "branch deploy-storybook"
  secrets = ["GITHUB_TOKEN"]
}

action "Deploy storybook" {
  uses = "./.github/actions/deploy-storybook/"
  needs = ["Filter master branch"]
  secrets = ["GITHUB_TOKEN"]
}

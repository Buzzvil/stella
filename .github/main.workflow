workflow "Build authsvc" {
  resolves = [
    "Push authsvc to GCR",
    "Setup Google Cloud",
  ]
  on = "push"
}

workflow "Build booksvc" {
  resolves = [
    "Push booksvc to GCR",
    "Setup Google Cloud",
  ]
  on = "push"
}

workflow "Build frontendsvc" {
  resolves = [
    "Push frontend to GCR",
    "Setup Google Cloud",
  ]
  on = "push"
}

workflow "Build ratingsvc" {
  resolves = [
    "Push ratingsvc to GCR",
    "Setup Google Cloud",
  ]
  on = "push"
}

workflow "Build rentalsvc" {
  resolves = [
    "Push rentalsvc to GCR",
    "Setup Google Cloud",
  ]
  on = "push"
}

action "authsvc changed?" {
  uses = "./actions/diff-includes/"
  args = "authsvc"
}

action "booksvc changed?" {
  uses = "./actions/diff-includes/"
  args = "booksvc"
}

action "frontend changed?" {
  uses = "./actions/diff-includes/"
  args = "frontend"
}

action "ratingsvc changed?" {
  uses = "./actions/diff-includes/"
  args = "ratingsvc"
}

action "rentalsvc changed?" {
  uses = "./actions/diff-includes/"
  args = "rentalsvc"
}

action "Build authsvc image" {
  uses = "actions/docker/cli@master"
  args = ["build", "-t", "authsvc", "authsvc"]
  needs = ["authsvc changed?"]
}

action "Build booksvc image" {
  uses = "actions/docker/cli@master"
  args = ["build", "-t", "booksvc", "booksvc"]
  needs = ["booksvc changed?"]
}

action "Build frontend image" {
  uses = "actions/docker/cli@master"
  args = ["build", "-t", "frontend", "frontend"]
  needs = ["frontend changed?"]
}

action "Build ratingsvc image" {
  uses = "actions/docker/cli@master"
  args = ["build", "-t", "ratingsvc", "ratingsvc"]
  needs = ["ratingsvc changed?"]
}

action "Build rentalsvc image" {
  uses = "actions/docker/cli@master"
  args = ["build", "-t", "rentalsvc", "rentalsvc"]
  needs = ["rentalsvc changed?"]
}

action "Setup Google Cloud" {
  uses = "actions/gcloud/auth@master"
  secrets = ["GCLOUD_AUTH"]
}

action "Tag authsvc for GCR" {
  needs = [
    "Setup Google Cloud",
    "Build authsvc image",
  ]
  uses = "actions/docker/tag@master"
  env = {
    PROJECT_ID = "devops-229509"
    APPLICATION_NAME = "stella/authsvc"
  }
  args = ["authsvc", "asia.gcr.io/$PROJECT_ID/$APPLICATION_NAME"]
}

action "Tag booksvc for GCR" {
  needs = [
    "Setup Google Cloud",
    "Build booksvc image",
  ]
  uses = "actions/docker/tag@master"
  env = {
    PROJECT_ID = "devops-229509"
    APPLICATION_NAME = "stella/booksvc"
  }
  args = ["booksvc", "asia.gcr.io/$PROJECT_ID/$APPLICATION_NAME"]
}

action "Tag frontend for GCR" {
  needs = [
    "Setup Google Cloud",
    "Build frontend image",
  ]
  uses = "actions/docker/tag@master"
  env = {
    PROJECT_ID = "devops-229509"
    APPLICATION_NAME = "stella/frontend"
  }
  args = ["frontend", "asia.gcr.io/$PROJECT_ID/$APPLICATION_NAME"]
}

action "Tag ratingsvc for GCR" {
  needs = [
    "Setup Google Cloud",
    "Build ratingsvc image",
  ]
  uses = "actions/docker/tag@master"
  env = {
    PROJECT_ID = "devops-229509"
    APPLICATION_NAME = "stella/ratingsvc"
  }
  args = ["ratingsvc", "asia.gcr.io/$PROJECT_ID/$APPLICATION_NAME"]
}

action "Tag rentalsvc for GCR" {
  needs = [
    "Setup Google Cloud",
    "Build rentalsvc image",
  ]
  uses = "actions/docker/tag@master"
  env = {
    PROJECT_ID = "devops-229509"
    APPLICATION_NAME = "stella/rentalsvc"
  }
  args = ["rentalsvc", "asia.gcr.io/$PROJECT_ID/$APPLICATION_NAME"]
}

action "Set Credential Helper for Docker" {
  needs = [
    "Setup Google Cloud",
  ]
  uses = "actions/gcloud/cli@master"
  args = ["auth", "configure-docker", "--quiet"]
}

action "Deploy branch filter" {
  needs = ["Set Credential Helper for Docker"]
  uses = "actions/bin/filter@master"
  args = "branch master"
}

action "Push authsvc to GCR" {
  needs = ["Setup Google Cloud", "Deploy branch filter", "Tag authsvc for GCR"]
  uses = "actions/gcloud/cli@master"
  runs = "sh -c"
  env = {
    PROJECT_ID = "devops-229509"
    APPLICATION_NAME = "stella/authsvc"
  }
  args = ["SHORT_SHA=$(echo ${GITHUB_SHA} | head -c7) && docker push asia.gcr.io/$PROJECT_ID/$APPLICATION_NAME:$SHORT_SHA"]
}

action "Push booksvc to GCR" {
  needs = ["Setup Google Cloud", "Deploy branch filter", "Tag booksvc for GCR"]
  uses = "actions/gcloud/cli@master"
  runs = "sh -c"
  env = {
    PROJECT_ID = "devops-229509"
    APPLICATION_NAME = "stella/booksvc"
  }
  args = ["SHORT_SHA=$(echo ${GITHUB_SHA} | head -c7) && docker push asia.gcr.io/$PROJECT_ID/$APPLICATION_NAME:$SHORT_SHA"]
}

action "Push frontend to GCR" {
  needs = ["Setup Google Cloud", "Deploy branch filter", "Tag frontend for GCR"]
  uses = "actions/gcloud/cli@master"
  runs = "sh -c"
  env = {
    PROJECT_ID = "devops-229509"
    APPLICATION_NAME = "stella/frontend"
  }
  args = ["SHORT_SHA=$(echo ${GITHUB_SHA} | head -c7) && docker push asia.gcr.io/$PROJECT_ID/$APPLICATION_NAME:$SHORT_SHA"]
}

action "Push ratingsvc to GCR" {
  needs = ["Setup Google Cloud", "Deploy branch filter", "Tag ratingsvc for GCR"]
  uses = "actions/gcloud/cli@master"
  runs = "sh -c"
  env = {
    PROJECT_ID = "devops-229509"
    APPLICATION_NAME = "stella/ratingsvc"
  }
  args = ["SHORT_SHA=$(echo ${GITHUB_SHA} | head -c7) && docker push asia.gcr.io/$PROJECT_ID/$APPLICATION_NAME:$SHORT_SHA"]
}

action "Push rentalsvc to GCR" {
  needs = ["Setup Google Cloud", "Deploy branch filter", "Tag rentalsvc for GCR"]
  uses = "actions/gcloud/cli@master"
  runs = "sh -c"
  env = {
    PROJECT_ID = "devops-229509"
    APPLICATION_NAME = "stella/rentalsvc"
  }
  args = ["SHORT_SHA=$(echo ${GITHUB_SHA} | head -c7) && docker push asia.gcr.io/$PROJECT_ID/$APPLICATION_NAME:$SHORT_SHA"]
}

workflow "Monorepo PR Repo Labeler" {
  resolves = [
    "Label PR Monorepos",
  ]
  on = "pull_request"
}

action "Label PR Monorepos" {
  uses = "adamzolyak/monorepo-pr-labeler-action@master"
  secrets = ["GITHUB_TOKEN"]
}

workflow "Build and deploy" {
  resolves = [
    "Setup Google Cloud",
    "Push authsvc to GCR",
    "Push booksvc to GCR",
    "Push frontend to GCR",
    "Push ratingsvc to GCR",
    "Push rentalsvc to GCR",
  ]
  on = "push"
}

action "authsvc changed?" {
  uses = "netlify/actions/diff-includes@master"
  args = "authsvc"
}

action "booksvc changed?" {
  uses = "netlify/actions/diff-includes@master"
  args = "booksvc"
}

action "frontend changed?" {
  uses = "netlify/actions/diff-includes@master"
  args = "frontend"
}

action "ratingsvc changed?" {
  uses = "netlify/actions/diff-includes@master"
  args = "ratingsvc"
}

action "rentalsvc changed?" {
  uses = "netlify/actions/diff-includes@master"
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
  args = "branch github-action"
}

action "Push authsvc to GCR" {
  needs = ["Setup Google Cloud", "Deploy branch filter", "Tag authsvc for GCR"]
  uses = "actions/gcloud/cli@master"
  runs = "sh -c"
  env = {
    PROJECT_ID = "devops-229509"
    APPLICATION_NAME = "stella/authsvc"
  }
  args = ["docker push gcr.io/$PROJECT_ID/$APPLICATION_NAME:$GITHUB_SHA"]
}

action "Push booksvc to GCR" {
  needs = ["Setup Google Cloud", "Deploy branch filter", "Tag booksvc for GCR"]
  uses = "actions/gcloud/cli@master"
  runs = "sh -c"
  env = {
    PROJECT_ID = "devops-229509"
    APPLICATION_NAME = "stella/booksvc"
  }
  args = ["docker push gcr.io/$PROJECT_ID/$APPLICATION_NAME:$GITHUB_SHA"]
}

action "Push frontend to GCR" {
  needs = ["Setup Google Cloud", "Deploy branch filter", "Tag frontend for GCR"]
  uses = "actions/gcloud/cli@master"
  runs = "sh -c"
  env = {
    PROJECT_ID = "devops-229509"
    APPLICATION_NAME = "stella/frontend"
  }
  args = ["docker push gcr.io/$PROJECT_ID/$APPLICATION_NAME:$GITHUB_SHA"]
}

action "Push ratingsvc to GCR" {
  needs = ["Setup Google Cloud", "Deploy branch filter", "Tag ratingsvc for GCR"]
  uses = "actions/gcloud/cli@master"
  runs = "sh -c"
  env = {
    PROJECT_ID = "devops-229509"
    APPLICATION_NAME = "stella/ratingsvc"
  }
  args = ["docker push gcr.io/$PROJECT_ID/$APPLICATION_NAME:$GITHUB_SHA"]
}

action "Push rentalsvc to GCR" {
  needs = ["Setup Google Cloud", "Deploy branch filter", "Tag rentalsvc for GCR"]
  uses = "actions/gcloud/cli@master"
  runs = "sh -c"
  env = {
    PROJECT_ID = "devops-229509"
    APPLICATION_NAME = "stella/rentalsvc"
  }
  args = ["docker push gcr.io/$PROJECT_ID/$APPLICATION_NAME:$GITHUB_SHA"]
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

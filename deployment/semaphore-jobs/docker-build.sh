checkout
sudo pip install awscli
aws ecr get-login --no-include-email | bash
docker pull "${ECR_REGISTRY}:latest" || true
docker build --cache-from "${ECR_REGISTRY}:latest" -t "${ECR_REGISTRY}:${SEMAPHORE_WORKFLOW_ID}"
docker images
docker push "${ECR_REGISTRY}:${SEMAPHORE_WORKFLOW_ID}"

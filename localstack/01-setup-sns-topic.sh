#!/usr/bin/env bash
set -e
export TERM=ansi
export AWS_ACCESS_KEY_ID=pre-sentence-service
export AWS_SECRET_ACCESS_KEY=pre-sentence-service
export AWS_DEFAULT_REGION=eu-west-2

aws --endpoint-url=http://localhost:4566 sns create-topic --name pre-sentence-service-topic-arn

echo Topic setup complete

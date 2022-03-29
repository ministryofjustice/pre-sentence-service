#!/usr/bin/env bash
set -e
export TERM=ansi
export AWS_ACCESS_KEY_ID=pre-sentence-service
export AWS_SECRET_ACCESS_KEY=pre-sentence-service
export AWS_DEFAULT_REGION=eu-west-2

aws --endpoint-url=http://localhost:4566 sqs create-queue --queue-name pre_sentence_service_domain_events_queue
aws --endpoint-url=http://localhost:4566 sqs create-queue --queue-name pre_sentence_service_domain_events_queue_dl
aws --endpoint-url=http://localhost:4566 sqs set-queue-attributes --queue-url "http://localhost:4566/queue/pre_sentence_service_domain_events_queue" --attributes '{"RedrivePolicy":"{\"maxReceiveCount\":\"3\", \"deadLetterTargetArn\":\"arn:aws:sqs:eu-west-2:000000000000:pre_sentence_service_domain_events_queue_dl\"}"}'

echo Queue setup complete

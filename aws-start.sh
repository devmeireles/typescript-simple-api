echo "STARTING AWS CONFIG"
echo "SETTING UP THE KEYS"
# aws configure --profile localstack set region us-east-1
export AWS_ACCESS_KEY_ID=test
export AWS_SECRET_ACCESS_KEY=test

echo "SETTING UP A PROFILE"
aws configure --profile localstack set region us-east-1

echo "CREATING THE ACCOUNT QUEUE"
aws --endpoint-url=http://localhost:4566 sqs create-queue --queue-name accountQueue --region eu-west-1

echo "CREATING THE SELLER BUCKET"
aws --endpoint-url=http://localhost:4566 s3api create-bucket --bucket seller --region us-east-1
aws --endpoint-url=http://localhost:4566 s3api put-bucket-acl --bucket seller --acl public-read
# Pet App

## Instructions

In case the project is removed from the AWS cloud (S3 Bucket) save the schema.graphql file and then remove the amplify folder completely.
Use `amplify init` to initialize a new amplify project.
add the api again with `amplify add api`, during the setup use the graphql file contents from the previous steps.
In case the project is not using cognito user pools, run `amplify add auth` or in case you have it check it again with `amplify update auth`
Make sure that the api is using cognito authorizations by checking `amplify api update`
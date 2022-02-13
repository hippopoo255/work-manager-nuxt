const AWS_COGNITO_REGION = process.env.AWS_COGNITO_REGION || 'ap-northeast-1'
const AWS_COGNITO_IDENTITY_POOL_ID =
  process.env.AWS_COGNITO_IDENTITY_POOL_ID || ''
const AWS_COGNITO_USER_POOL_ID = process.env.AWS_COGNITO_USER_POOL_ID || ''
const AWS_COGNITO_CLIENT_ID = process.env.AWS_COGNITO_CLIENT_ID || ''

export const awsConfiguration = {
  region: AWS_COGNITO_REGION,
  IdentityPoolId: AWS_COGNITO_IDENTITY_POOL_ID,
  UserPoolId: AWS_COGNITO_USER_POOL_ID,
  ClientId: AWS_COGNITO_CLIENT_ID,
}

export const cognitoTestAdmin = {
  name: process.env.AWS_COGNITO_TEST_ADMIN_NAME || '',
  email: process.env.AWS_COGNITO_TEST_ADMIN_EMAIL || '',
  password: process.env.AWS_COGNITO_TEST_ADMIN_PASSWORD || '',
}

// eslint-disable-next-line import/first
import { Amplify } from 'aws-amplify'

export const amplifyConfigure = () => {
  Amplify.configure({
    Auth: {
      // REQUIRED - Amazon Cognito Region
      region: awsConfiguration.region,
      // OPTIONAL - Amazon Cognito User Pool ID
      userPoolId: awsConfiguration.UserPoolId,
      // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
      userPoolWebClientId: awsConfiguration.ClientId,
    },
  })
}

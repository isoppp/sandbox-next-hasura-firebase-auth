import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import axios from 'axios'

admin.initializeApp(functions.config().firebase)

const hasuraClient = axios.create({
  baseURL: 'http://localhost:8080/v1/graphql/',
  timeout: 1000,
  headers: {
    'content-type': 'application/json',
    'x-hasura-admin-secret': 'youradminsecretkey',
  },
})

// https://github.com/hasura/graphql-engine/tree/master/community/sample-apps/firebase-jwt
export const processSignUp = functions.auth.user().onCreate(async (user, context) => {
  const customClaims = {
    'https://hasura.io/jwt/claims': {
      'x-hasura-default-role': 'user',
      'x-hasura-allowed-roles': ['user'],
      'x-hasura-user-id': user.uid,
    },
  }

  await admin
    .auth()
    .setCustomUserClaims(user.uid, customClaims)
    .then(() => {
      // const metadataRef = admin.database().ref('metadata/' + user.uid)
      // return metadataRef.set({ refreshTime: new Date().getTime() })
      console.log('succeeded to add custom claims')
    })
    .catch((error) => {
      console.log(error)
    })
  await syncWithHasura({ uid: user.uid, email: user.email, displayName: user.displayName ?? 'anonymous' })
})

export const syncWithHasura = async ({
  uid,
  email,
  displayName,
}: {
  uid: string
  email?: string
  displayName: string
}) => {
  const query = `
  mutation ($uid: String!, $email: String, $displayName: String!) {
    insert_users(
      objects: [{id: $uid, email: $email, display_name:$displayName}],
      on_conflict: {constraint: users_pkey, update_columns: [email, display_name]}) {
      returning{
        id
        display_name
        display_id
      }
    }
  }
  `
  const variables: { uid: string; email?: string; displayName: string } = {
    uid,
    displayName,
  }
  if (email) {
    variables.email = email
  }
  hasuraClient
    .post('', {
      query,
      variables,
    })
    .then((res) => {
      // console.log(res)
    })
    .catch((e) => {
      functions.logger.error(e)
      console.log(e)
    })
}

export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info('Hello logs!', { structuredData: true })
  response.send('Hello from Firebase!')
})

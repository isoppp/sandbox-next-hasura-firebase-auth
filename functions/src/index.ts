import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

admin.initializeApp(functions.config().firebase)

// https://github.com/hasura/graphql-engine/tree/master/community/sample-apps/firebase-jwt
export const processSignUp = functions.auth.user().onCreate((user) => {
  console.log(user)
  const customClaims = {
    'https://hasura.io/jwt/claims': {
      'x-hasura-default-role': 'user',
      'x-hasura-allowed-roles': ['user'],
      'x-hasura-user-id': user.uid,
    },
  }
  return admin
    .auth()
    .setCustomUserClaims(user.uid, customClaims)
    .then(() => {
      const metadataRef = admin.database().ref('metadata/' + user.uid)
      return metadataRef.set({ refreshTime: new Date().getTime() })
    })
    .catch((error) => {
      console.log(error)
    })
})

export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info('Hello logs!', { structuredData: true })
  response.send('Hello from Firebase!')
})

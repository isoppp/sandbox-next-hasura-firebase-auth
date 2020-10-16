import { AppProps } from 'next/app'
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'
import { ApolloProvider } from '@apollo/react-hooks'
import Head from 'next/head'

const createApolloClient = () => {
  return new ApolloClient({
    link: new HttpLink({
      uri: 'http://localhost:8080/v1/graphql',
    }),
    cache: new InMemoryCache(),
  })
}

const MyApp = ({ Component, pageProps }: AppProps) => {
  const client = createApolloClient()
  return (
    <>
      <Head>
        <link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet" />
      </Head>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </>
  )
}
export default MyApp

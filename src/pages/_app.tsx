import { AppProps } from 'next/app'
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { ApolloProvider } from '@apollo/react-hooks'
import Head from 'next/head'
import ArticleNav from '@/components/ArticleNav'

const createApolloClient = () => {
  return new ApolloClient({
    link: new HttpLink({
      uri: 'http://localhost:8080/v1/graphql',
    }),
    cache: new InMemoryCache(),
  })
}

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  const client = createApolloClient()
  return (
    <>
      <Head>
        <link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet" />
      </Head>
      <ApolloProvider client={client}>
        <>
          <div className="max-w-screen-lg mx-auto mt-10">
            <ArticleNav />
          </div>
          <div className="max-w-screen-lg mx-auto mt-6 p-10 shadow-lg rounded-lg">
            <Component {...pageProps} />
          </div>
        </>
      </ApolloProvider>
    </>
  )
}
export default MyApp

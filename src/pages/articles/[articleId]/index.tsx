import { useRouter } from 'next/router'
import { NextPage } from 'next'
import { useGetArticleQuery } from '@/generated/graphql'
import Error from 'next/error'

const ArticlePage: NextPage = () => {
  const router = useRouter()
  const { articleId } = router.query
  const { loading, error, data } = useGetArticleQuery({
    variables: {
      id: articleId as string,
    },
  })

  if (loading) {
    return <p>...loading</p>
  }
  if (error) {
    return <p>{error.toString()}</p>
  }
  if (!data?.articles_by_pk) {
    return <Error statusCode={404} />
  }

  const { user, subject, content } = data.articles_by_pk
  return (
    <div className="max-w-screen-lg mx-auto p-10">
      <div>{user.display_name}</div>
      <div>{subject}</div>
      <div>{content}</div>
    </div>
  )
}

export default ArticlePage

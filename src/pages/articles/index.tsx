import { NextPage } from 'next'
import { useGetArticlesQuery } from '@/generated/graphql'
import Link from 'next/link'

const ArticlesIndex: NextPage = () => {
  const { loading, error, data } = useGetArticlesQuery()
  if (loading) {
    return <p>...loading</p>
  }
  if (error) {
    return <p>{error.toString()}</p>
  }

  if (data?.articles?.length === 0) return <div>No articles</div>

  return (
    <div>
      <ul className="flex flex-col gap-4">
        {data?.articles?.map((article) => (
          <li key={article.id}>
            <Link href={`/articles/${encodeURIComponent(article.id)}`}>
              <a className="block p-4 border rounded-md">
                <div className="font-bold">{article?.subject}</div>
                <div>{article?.content}</div>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ArticlesIndex

import Link from 'next/link'
import { useRouter } from 'next/router'

export default function ArticleNav(): JSX.Element {
  const router = useRouter()
  const { articleId } = router.query
  return (
    <div className="flex justify-end gap-4">
      <Link href="/articles/">
        <a className="block py-2 px-4 border rounded-sm">
          <div>Articles</div>
        </a>
      </Link>
      <Link href="/articles/new">
        <a className="block py-2 px-4 border rounded-sm">
          <div>New Article</div>
        </a>
      </Link>
      {articleId && (
        <Link href={`/articles/${articleId}/edit`}>
          <a className="block py-2 px-4 border rounded-sm">
            <div>Edit</div>
          </a>
        </Link>
      )}
    </div>
  )
}

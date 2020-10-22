import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { useDeleteArticleMutation } from '@/generated/graphql'

export default function ArticleNav(): JSX.Element {
  const router = useRouter()
  const { articleId } = router.query

  const [deleteArticleMutation] = useDeleteArticleMutation()
  const deleteArticle = useCallback(
    async (e) => {
      e.preventDefault()
      if (typeof articleId === 'string') {
        const { data } = await deleteArticleMutation({
          variables: {
            id: articleId,
          },
        })
        const id = data?.delete_articles_by_pk?.id
        window.alert('deleted ' + id)
        await router.push('/articles')
      }
    },
    [articleId],
  )
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
        <>
          <Link href={`/articles/${articleId}/edit`}>
            <a className="block py-2 px-4 border rounded-sm">
              <div>Edit</div>
            </a>
          </Link>
          <a href="#" className="block py-2 px-4 border rounded-sm" onClick={deleteArticle}>
            <div>Delete</div>
          </a>
        </>
      )}
    </div>
  )
}

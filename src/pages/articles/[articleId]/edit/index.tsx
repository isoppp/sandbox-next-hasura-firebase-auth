import { useRouter } from 'next/router'
import { NextPage } from 'next'
import { useGetArticleQuery, usePostArticleMutation, useUpdateArticleMutation } from '@/generated/graphql'
import { useForm } from 'react-hook-form'
import { DUMMY_USER_ID } from '@/constants/dummy'

const ArticlesEdit: NextPage = () => {
  const router = useRouter()
  const { articleId } = router.query
  const { loading, error, data } = useGetArticleQuery({
    variables: {
      id: articleId as string,
    },
  })
  const [updateArticle] = useUpdateArticleMutation()
  const { register, handleSubmit } = useForm()
  const onSubmit = async (formData) => {
    const { data } = await updateArticle({
      variables: {
        ...formData,
        id: articleId,
      },
    })
    if (data?.update_articles_by_pk?.id) {
      const aritcleId = data?.update_articles_by_pk?.id
      router.push(`/articles/${aritcleId}`)
    } else {
      Promise.reject('UPDATE unknown state')
    }
  }

  if (loading) {
    return <p>...loading</p>
  }
  if (error) {
    return <p>{error.toString()}</p>
  }

  const formClasses = 'w-full border border-gray-300 rounded-md p-4'
  return (
    <div>
      <form className="flex flex-col items-center gap-4" onSubmit={handleSubmit(onSubmit)}>
        <input
          name="subject"
          className={formClasses}
          type="text"
          ref={register}
          defaultValue={data?.articles_by_pk?.subject}
        />
        <textarea name="content" className={formClasses} ref={register} defaultValue={data?.articles_by_pk?.content} />

        <button className="max-w-lg border border-gray-300 bg-gray-100 font-medium text-center py-2 px-5">
          Update
        </button>
      </form>
    </div>
  )
}

export default ArticlesEdit

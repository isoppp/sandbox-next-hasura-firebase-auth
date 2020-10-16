import { useRouter } from 'next/router'
import { NextPage } from 'next'
import { useGetArticleQuery, usePostArticleMutation } from '@/generated/graphql'
import { useForm } from 'react-hook-form'
import { DUMMY_USER_ID } from '@/constants/dummy'

const ArticlesNew: NextPage = () => {
  const router = useRouter()
  const [postArticle] = usePostArticleMutation()
  const { register, handleSubmit, watch, errors } = useForm()
  const onSubmit = async (formData) => {
    const { data } = await postArticle({
      variables: {
        ...formData,
        author_id: DUMMY_USER_ID,
        published_at: 'now()',
      },
    })
    if (data?.insert_articles_one) {
      const aritcleId = data.insert_articles_one.id
      router.push(`/articles/${aritcleId}`)
    } else {
      Promise.reject('POST unknown state')
    }
  }

  const formClasses = 'w-full border border-gray-300 rounded-md p-4'
  return (
    <div>
      <form className="flex flex-col items-center gap-4" onSubmit={handleSubmit(onSubmit)}>
        <input name="subject" className={formClasses} type="text" ref={register} />
        <textarea name="content" className={formClasses} ref={register} />

        <button className="max-w-lg border border-gray-300 bg-gray-100 font-medium text-center py-2 px-5">
          Register
        </button>
      </form>
    </div>
  )
}

export default ArticlesNew

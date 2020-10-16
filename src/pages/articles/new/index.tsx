import { useRouter } from 'next/router'
import { NextPage } from 'next'
import { useGetArticleQuery } from '@/generated/graphql'
import { useForm } from 'react-hook-form'

const ArticlesNew: NextPage = () => {
  const router = useRouter()
  const { register, handleSubmit, watch, errors } = useForm()
  const onSubmit = (data) => console.log(data)
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

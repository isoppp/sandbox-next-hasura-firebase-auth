import Link from 'next/link'

interface Props {}

export default function ArticleNav(props: Props) {
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
    </div>
  )
}

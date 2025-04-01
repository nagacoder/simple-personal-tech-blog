import { genPageMetadata } from 'app/seo'
import Link from '@/components/Link'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import ListLayout from '@/layouts/ListLayout'
import { allBlogs } from 'contentlayer/generated'

const POSTS_PER_PAGE = 5
export const runtime = 'edge'

export const metadata = genPageMetadata({ title: 'Archives' })

export default async function ArchivesPages(props: { params: Promise<{ years: string }> }) {
  const params = await props.params
  const years = decodeURI(params.years)
  const filteredPosts = allCoreContent(
    sortPosts(allBlogs.filter((post) => post.date && post.date.includes(years)))
  )
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
  const initialDisplayPosts = filteredPosts.slice(0, POSTS_PER_PAGE)
  const pagination = {
    currentPage: 1,
    totalPages: totalPages,
  }
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
            <div className="text-base leading-6 font-medium">
              <Link
                href={`/archives`}
                className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 dark:text-gray-100"
                aria-label={`Back to archives`}
              >
                &larr; Back to Archives
              </Link>
            </div>
          </h1>
          {/* <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            Showcase my project
          </p> */}
        </div>
        <div className="container py-12">
          <ListLayout
            isSearchAble={false}
            posts={filteredPosts}
            initialDisplayPosts={initialDisplayPosts}
            pagination={pagination}
            title={years + ' Posts'}
          />
        </div>
      </div>
    </>
  )
}

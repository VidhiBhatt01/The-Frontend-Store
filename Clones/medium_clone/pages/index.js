import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Header from '../components/Header'
import { sanityClient, urlFor } from '../sanity'

export default function Home(props) {
  const { posts } = props
  console.log(posts)
  return (
    <div className='max-w-7xl mx-auto'>
      <Head>
        <title>Medium Clone</title>
        <meta name="description" content="Medium Clone created using NEXT.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <div className="flex justify-between items-center bg-yellow-400 border-black border-y py-10 lg:py-0">
        <div className="space-y-5 p-10">
          <h1 className='text-6xl max-w-xl font-serif'> <span className='underline decoration-black decoration-4'>Medium</span> is a place to write, read and connect</h1>
          <h2>It&apos;s easy and free to post your thinking on topic and connect with millions of readers.</h2>
        </div>
        <img src="https://accountabilitylab.org/wp-content/uploads/2020/03/Medium-logo.png" alt="Medium Logo" className='hidden md:inline-flex h-32 lg:h-full' />
      </div>

      {/* Posts  */}
      <div className="grid grid-col-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 lg:p-6">
        {
          posts && posts.map(post => {
            return (
              <Link key={post._id} href={`post/${post.slug.current}`}>
                <div className='border rounded-lg group cursor-pointer overflow-hidden'>
                  <img className='h-64 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out' src={urlFor(post.mainImage).url()} alt={post.title} />
                  <div className="flex justify-between p-5 bg-white">
                    <div className="">
                      <p className='text-lg font-bold'>{post.title}</p>
                      <p className='text-xs'>{post.description} by {post.author.name}</p>
                    </div>

                    <img className='h-12 w-12 rounded-full' src={urlFor(post.author.image).url()} alt={post.author.name} />
                  </div>
                </div>
              </Link>
            )
          })
        }
      </div>
    </div>
  )
}

export const getServerSideProps = async () => {
  const query = `
  *[_type=="post"]{
    _id,
    title,
    slug,
    author -> {
      name,
      image
    },
    description,
    mainImage
  }`;

  const posts = await sanityClient.fetch(query);

  return {
    props: {
      posts,
    }
  }
}

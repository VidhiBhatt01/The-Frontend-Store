import React, { useState } from 'react'
import Header from '../../components/Header';
import { sanityClient, urlFor } from '../../sanity'
import PortableText from 'react-portable-text';
import { useForm, SubmitHandler } from 'react-hook-form'

function Post(props) {
    const { post } = props;
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async data => {
        await fetch('/api/createComment', {
            method: "POST",
            body: JSON.stringify(data),
        }).then(() => {
            console.log(data)
            setSubmitted(true)
        }).catch((err) => {
            console.log(err)
            setSubmitted(false)
        })
    };

    const [submitted, setSubmitted] = useState(false);
    return (
        <main>
            <Header />
            <img className='w-full h-64 object-cover' src={urlFor(post.mainImage).url()} alt="" />

            <article className='max-w-3xl mx-auto p-5'>
                <h1 className='text-4xl mt-10 mb-3'>{post.title}</h1>
                <h2 className='text-xl font-light text-gray-500 mb-2'>{post.description}</h2>
                <div className="flex items-center space-x-2">
                    <img className='h-10 w-10 rounded-full' src={urlFor(post.author.image).url()} alt="" />
                    <p className='font-extralight text-sm'> Blog Post by <span className='text-green-600'>{post.author.name}</span> published at {new Date(post.createdAt).toLocaleString()}</p>
                </div>

                <div className="mt-10">
                    <PortableText
                        className=''
                        dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
                        projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
                        content={post.body}
                        serializers={{
                            h1: (props) => {
                                <h1 className='text-2xl font-bold my-5' {...props} />
                            },
                            h2: (props) => {
                                <h2 className='text-xl font-bold my-5' {...props} />
                            },
                            li: ({ children }) => {
                                <li className='ml-4 list-disc'>{children}</li>
                            },
                            link: ({ href, children }) => {
                                <a href={href} className='text-blue-500 hover:underline'>{children}</a>
                            },
                        }}
                    />
                </div>
            </article>

            <hr className='max-w-lg my-5 mx-auto border border-yellow-500' />

            {
                submitted ?
                    <div className="flex flex-col p-10 my-10 bg-yellow-500 text-white max-w-2xl mx-auto">
                        <h3 className='text-3xl font-bold'>Thank you for submitting comment!</h3>
                        <p>Once it will be approved it will apprear below.</p>
                    </div>
                    :
                    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col p-5 max-w-2xl mx-auto border border-yellow-500'>

                        <h3 className='text-sm text-yellow-500'>Enjoyed The artical?</h3>
                        <h3 className='text-3xl font-bold'>Leave a comment below!</h3>
                        <hr className='py-3 mt-2' />
                        <input {...register("_id")} type="hidden" name="_id" value={post._id} />
                        <label className='block mb-5'>
                            <span className='text-grey-700'>Name</span>
                            <input {...register("name", { required: true })} className='shadow border rounded form-input px-3 py2 mt-1 block w-full ring-yellow-500 outline-none focus:ring' placeholder='Your Name' type="text" name="name" id="name" />
                        </label>
                        <label className='block mb-5'>
                            <span className='text-grey-700'>Email</span>
                            <input {...register("email", { required: true })} className='shadow border rounded form-input px-3 py2 mt-1 block w-full ring-yellow-500 outline-none focus:ring' placeholder='Your Name' type="email" name="email" id="email" />
                        </label>
                        <label className='block mb-5'>
                            <span className='text-grey-700'>Comment</span>
                            <textarea {...register("comment", { required: true })} className='shadow border rounded py-2 px-3 form-textarea mt-1 block w-full ring-yellow-500 outline-none focus:ring' placeholder='Your Name' rows={8} name="comment" id="comment" />
                        </label>

                        {/* Errors  */}
                        <div className="flex flex-col p-5">
                            {errors.name && (
                                <span className="text-red-500">-The Name Field is Required</span>
                            )}
                            {errors.comment && (
                                <span className="text-red-500">-The Comment Field is Required</span>
                            )}
                            {errors.email && (
                                <span className="text-red-500">-The Email Field is Required</span>
                            )}
                        </div>

                        <input type="submit" className='bg-yellow-500 shadow hover:bg-yellow-400 focus:shadow-outline focus:outline-none text-white font-bold rounded cursor-pointer py-2 px-4' />
                    </form>
            }

            {/* Comments */}
            <div className="flex flex-col p-10 my-10 max-w-2xl mx-auto shadow shadow-yellow-500 space-y-2">
                <h3 className='text-4xl'>Comments</h3>
                <hr className='pb-2'/>
                {
                    post.comments && post.comments.map((comment)=>{
                        return (
                            <div className="" key={comment._id}>
                                <p><span className='text-yellow-500 font-semibold'>{comment.name}:</span> {comment.comment}</p>
                            </div>
                        )
                    })
                }
            </div>
        </main>
    )
}

export default Post
export const getStaticPaths = async () => {
    const query = `
    *[_type=="post"]{
        _id,
        slug {
          current
        }
    }`

    const posts = await sanityClient.fetch(query);
    const paths = posts.map(post => (
        {
            params: {
                slug: post.slug.current
            }
        }
    ))

    return {
        paths,
        fallback: 'blocking'
    }
}

export const getStaticProps = async ({ params }) => {
    const query = `
        *[_type=="post" && slug.current == $slug][0]{
            _id,
            createdAt,
            title,
            author -> {
                name,
                image
            },
            'comments': *[
                _type == "comment" &&
                post.ref == ^._id &&
                approved == true
            ],
            description,
            mainImage,
            slug,
            body
        }
    `

    const post = await sanityClient.fetch(query, {
        slug: params?.slug,
    });

    if (!post) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            post,
        },
        revalidate: 60, //updates old cache after 60sec
    }
}
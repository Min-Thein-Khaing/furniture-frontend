import { postInfiniteQuery } from '@/api/query'
import { useInfiniteQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom' // သို့မဟုတ် 'react-router'

const Blog = () => {
    const {
        data,
        status,
        error,
        isFetching,
        isFetchingNextPage,
        hasNextPage,
        fetchNextPage
    } = useInfiniteQuery(postInfiniteQuery())

    // Infinite scroll အတွက် observer


    // Data တွေကို flat ဖြစ်အောင် လုပ်ခြင်း
    const allPosts = data?.pages.flatMap((page) => page.data) || []
    

    // Return logic ကို သန့်သန့်ရှင်းရှင်း ပြင်ထားပါတယ်
    return (
        <div className='container mx-auto my-10'>
            <h1 className='text-3xl font-bold text-[#056152] mb-10'>Latest All Blogs</h1>

            {status === "pending" ? (
                <p>Loading....</p>
            ) : status === "error" ? (
                <p>Error: {(error as any).message}</p>
            ) : (
                <>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                        {allPosts.map((post: any) => (
                            <Link
                                to={`/blogs/${post.id}`}
                                key={post.id}
                                className='group flex border border-[#056152]/20 flex-col bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1'
                            >
                                <div className="relative h-64 overflow-hidden">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        loading='lazy'
                                        decoding='async'
                                        className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
                                    />
                                    <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-300" />
                                </div>

                                <div className="p-6 flex flex-col flex-1 gap-4">
                                    <h3 className='text-xl font-bold text-[#056152] line-clamp-2 leading-tight '>
                                        {post.title}
                                    </h3>
                                    <p className='text-[#056152]/70 text-sm line-clamp-2'>{post.content}</p>
                                    <p className='text-[#056152]/70 text-xs '>
                                        by {post.author} on <span>{new Date(post.updated_at).toLocaleDateString()}</span>
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>

                    
                </>
            )}
            <button className={`bg-[#db821d] flex mx-auto lg:mt-10  md:mt-4 text-white rounded-full px-6 py-3 text-nowrap duration-300 active:scale-95 hover:opacity-90 shadow-md ${!hasNextPage || isFetchingNextPage ? "opacity-50 cursor-not-allowed" : ""}`} onClick={() => fetchNextPage()} disabled={!hasNextPage || isFetchingNextPage}>
                {isFetchingNextPage ? "Loading more..." : hasNextPage ? "Load more" : "No more posts"}
            </button>
            <div>
                {isFetching && !isFetchingNextPage ? "update background" : null}
            </div>
        </div>
    )
}

export default Blog
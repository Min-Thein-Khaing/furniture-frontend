import type { Post } from '@/types'
import React from 'react'
import { Link } from 'react-router';



interface Props {
    posts: Post[];
}
const BlogCard = ({ posts }: Props) => {

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {posts.map((post) => (
                <Link to={`/blogs/${post.id}`}
                    key={post.id}
                    className='group flex flex-col bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1'
                >
                    <div className="relative h-64 overflow-hidden">
                        <img
                            src={post.image}
                            alt={post.title}
                            className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
                        />
                        <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-300" />
                    </div>

                    <div className="p-6 flex flex-col flex-1 gap-4">
                        <h3 className='text-xl font-bold text-[#056152] line-clamp-2 leading-tight min-h-[3.5rem]'>
                            {post.title}
                        </h3>

                        <div className='mt-auto flex items-center justify-between border-t pt-4'>
                            <div className="flex flex-col">
                                <span className='text-[10px] text-[#056152]/50 uppercase tracking-widest'>Date</span>
                                <span className='text-xs font-semibold text-[#056152]'>{post.updated_at}</span>
                            </div>
                            <div className="flex flex-col items-end">
                                <span className='text-[10px] text-[#056152]/50 uppercase tracking-widest'>Author</span>
                                <span className='text-xs font-semibold text-[#056152]'>{post.author}</span>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default BlogCard
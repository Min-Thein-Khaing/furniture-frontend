import { posts } from '@/data/images/posts'
import type { Post } from '@/types'
import React from 'react'
import { Link } from 'react-router'


const Blog = () => {
  
  return (
    <div className='container mx-auto my-10'>
      <h1 className='text-3xl font-bold text-[#056152] mb-10'>Latest All Blogs</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-8'>
            {posts.map((post) => (
                <Link to={`/blogs/${post.id}`}
                    key={post.id}
                    className='group flex border border-[#056152]/20 flex-col bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1'
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
                        <h3 className='text-xl font-bold text-[#056152] line-clamp-2 leading-tight '>
                            {post.title}
                        </h3>
                        <p className='text-[#056152]/70 text-sm line-clamp-2'>{post.content}</p>
                        <p className='text-[#056152]/70 text-xs '>by {post.author} on <span className='text-[#056152]/70 text-xs '>{post.updated_at}</span> </p>
                    </div>
                </Link>
            ))}
        </div>
    </div>
  )
}

export default Blog
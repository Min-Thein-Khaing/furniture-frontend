import { posts } from '@/data/images/posts';
import { ChevronLeft } from 'lucide-react';
import React from 'react';
import { Link, useParams } from 'react-router';
import RichTextRender from './RichTextRender';

const BlogDetail = () => {
  const { id } = useParams();

  // ✅ FIX type (string → number)
  const samePostOfId = posts.find((post) => post.id === id);

  if (!samePostOfId) {
    return <div className="text-center mt-10">Post not found</div>;
  }

  return (
    <div className='container mx-auto px-4 my-5'>

      {/* Back Button */}
      <Link
        to="/blogs"
        className='inline-flex items-center gap-2 px-3 py-2 text-sm text-[#056152] border rounded-lg hover:bg-gray-100'
      >
        <ChevronLeft size={18} />
        <span>All Blogs</span>
      </Link>

      {/* ✅ RESPONSIVE GRID */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-4'>

        {/* LEFT CONTENT */}
        <div className='col-span-1 md:col-span-2 lg:col-span-3 order-1'>

          <h1 className='text-xl md:text-3xl font-bold text-[#056152] mb-2'>
            {samePostOfId.title.charAt(0).toUpperCase() + samePostOfId.title.slice(1)}
          </h1>

          <p className='text-xs text-gray-500 mb-3'>
            by {samePostOfId.author} on {samePostOfId.updated_at}
          </p>

          <p className='text-sm md:text-base text-gray-700 mb-4 leading-relaxed'>
            {samePostOfId.content}
          </p>

          {/* ✅ IMAGE (Aspect Ratio FIX) */}
          <img
            src={samePostOfId.image}
            alt={samePostOfId.title}
            className='w-full aspect-video object-cover rounded-xl'
          />
          <p className='text-sm md:text-base text-gray-700 mb-4 leading-relaxed mt-4' >
            <RichTextRender html={samePostOfId.body} />
          </p>
          <div className='flex flex-wrap gap-2 mt-6'>
            {samePostOfId.tags.map((tag) => (
              <span
                key={tag}
                className='px-3 py-1 bg-gray-100 text-gray-600 rounded-full md:text-md text-xs'
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className='col-span-1 md:col-span-2 lg:col-span-1 order-2'>

          <h2 className='text-lg font-semibold text-[#056152] my-6 lg:my-0 mb-3'>
            Other Blog Posts
          </h2>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4'>
            {posts
              .filter((post) => post.id !== samePostOfId.id)
              .map((post) => (
                <Link
                  to={`/blogs/${post.id}`}
                  key={post.id}
                  className='flex gap-3 p-2 rounded-lg hover:bg-gray-100 transition'
                >
                  {/* IMAGE */}
                  <img
                    src={post.image}
                    alt={post.title}
                    className='w-14 h-14 object-cover rounded-md flex-shrink-0'
                  />

                  {/* TEXT */}
                  <div>
                    <p className='text-xs md:text-sm text-gray-700 line-clamp-2'>
                      {post.content}
                    </p>
                    <span className='text-[10px] text-gray-400'>
                      ... see more
                    </span>
                  </div>
                </Link>
              ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
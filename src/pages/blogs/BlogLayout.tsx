import React from 'react'
import { Outlet } from 'react-router'

const BlogLayout = () => {
  return (
    <div>
        <Outlet />
    </div>
  )
}

export default BlogLayout
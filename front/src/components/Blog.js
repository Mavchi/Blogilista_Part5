import React, { useState } from 'react'
const Blog = ({ blog, handleLike }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  if (visible)
    return (
      <div style={blogStyle}>
        {blog.title} <button onClick={toggleVisibility}>hide</button><br />
        {blog.url} <br />
        {blog.likes} <button onClick={handleLike(blog)}>like</button> <br/>
        {blog.author} 
      </div>
    )
  
  return (
    <div style={blogStyle}>
      {blog.title} <button onClick={toggleVisibility}>show</button><br />
    </div>
  )
}

export default Blog

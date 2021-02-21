import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title, author, url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            type='text'
            name='Title'
            id='title'
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div>
          author:
          <input
            type='text'
            name='Author'
            id='author'
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
          />
        </div>
        <div>
          url:
          <input
            type='text'
            name='Url'
            id='url'
            value={url}
            onChange={(event) => setUrl(event.target.value)}
          />
        </div>
        <button id='create-blog-button' type='submit'>create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm
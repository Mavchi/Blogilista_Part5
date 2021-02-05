import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'

import blogService from './services/blogs'
import loginServices from './services/login'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={message.type}>
      {message.txt}
    </div>
  )
}

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogsPart5User')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginServices.login({ username, password })

      window.localStorage.setItem(
        'loggedBlogsPart5User', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      setErrorMessage({ type: 'error', txt: 'wrong username or password' })
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const logOut = () => {
    window.localStorage.removeItem('loggedBlogsPart5User')
    setUser(null)
  }

  const handleAddBlog = async (event) => {
    event.preventDefault()

    try {
      const new_blog = await blogService.create({
        title, author, url
      })
      if(new_blog){
        setBlogs(blogs.concat(new_blog))
      }
      setTitle('')
      setAuthor('')
      setUrl('')

      setErrorMessage({ type: 'success', txt: `a new blog ${new_blog.name} by ${new_blog.author} added` })
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch(error) {
      setErrorMessage({ type: 'error', txt: error.message })
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  if (user === null)
    return (
      <div>
        <h2>log in to application</h2>
        <Notification message={errorMessage}/>
        <form onSubmit={handleLogin}>
          <div>
            username
        <input
              type='text'
              value={username}
              name='Username'
              onChange={(event) => setUsername(event.target.value)}
            />
          </div><div>
            password
        <input
              type='password'
              value={password}
              name='Password'
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <button type='submit'>login</button>
        </form>
      </div>
    )

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage}/>
      <p>{user.name} logged in <button onClick={logOut}>logout</button></p>

      <h2>create new</h2>
      <form onSubmit={handleAddBlog}>
        <div>
          title:
          <input
            type='text'
            name='Title'
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div>
          author:
          <input
            type='text'
            name='Author'
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
          />
        </div>
        <div>
          url:
          <input
            type='text'
            name='Url'
            value={url}
            onChange={(event) => setUrl(event.target.value)}
          />
        </div>
        <button type='submit'>create</button>
      </form>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { fireEvent, prettyDOM } from '@testing-library/dom'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  test('updates parent state and calls onSubmit', async () => {
    const blog = {
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
        id: '60195104d30c6f53fb2afd6a',
        user: {
            username: 'root',
            name: 'Aleksi,'
        }
    }
    const createBlog = jest.fn()

    const component = render(
      <BlogForm createBlog={createBlog} />
    )

    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')
    const form = component.container.querySelector('form')

    fireEvent.change(title, {
        target: { value: blog.title}
    })
    fireEvent.change(author, {
        target: { value: blog.author}
    })
    fireEvent.change(url, {
        target: { value: blog.url}
    })
    fireEvent.submit(form)
    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe(blog.title)
    expect(createBlog.mock.calls[0][0].author).toBe(blog.author)
    expect(createBlog.mock.calls[0][0].url).toBe(blog.url)
  })
})
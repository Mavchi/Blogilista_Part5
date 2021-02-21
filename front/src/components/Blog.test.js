import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { fireEvent, prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

describe('<Blog />', () => {
    test('by default only shows title and author', () => {
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
        const user = {
          token: '123',
          username: 'root',
          name: 'Aleksi,'
        }
        const mockHandler1 = jest.fn()
        const mockHandler2 = jest.fn()

        //const mockHandler = jest.fn()
        const component = render(
            <Blog blog={blog} user={user} handleLike={mockHandler1} handleRemoveBlog={mockHandler2} />
        )

        //const div = component.container.querySelector('.blogDiv')
        //console.log(prettyDOM(div))

        expect(component.container).toHaveTextContent(blog.title)
        expect(component.container).toHaveTextContent(blog.author)
        expect(component.container).not.toHaveTextContent(blog.url)
        expect(component.container).not.toHaveTextContent(blog.likes)
    })

    test('url and likes are shown once show-button is clicked', async () => {
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
        const user = {
          token: '123',
          username: 'root',
          name: 'Aleksi,'
        }
        const mockHandler1 = jest.fn()
        const mockHandler2 = jest.fn()

        //const mockHandler = jest.fn()
        const component = render(
            <Blog blog={blog} user={user} handleLike={mockHandler1} handleRemoveBlog={mockHandler2} />
        )

        const button = component.getByText('show')
        fireEvent.click(button)

        const div = component.container.querySelector('.blogDiv')
        //console.log(prettyDOM(div))


        expect(div).toHaveTextContent(blog.url)
        expect(div).toHaveTextContent(blog.likes)
    })
})

test('if like-pressed twice, event handler is called twice', async () => {
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
    const user = {
      token: '123',
      username: 'fail',
      name: 'Aleksi,'
    }
    const mockHandler = jest.fn()
    const component = render(
        <Blog blog={blog} user={user} handleLike={mockHandler} handleRemoveBlog={() => console.log('fail')} />
    )

    const show_button = component.getByText('show')
    fireEvent.click(show_button)

    const button = component.getByText('like')
    //console.log(prettyDOM(button))
    fireEvent.click(button)
    fireEvent.click(button)
    //expect(mockHandler1).toHaveBeenCalledTimes(2)
    expect(mockHandler).toHaveBeenCalledTimes(2)
    //expect(mockHandler1.mock.calls.length).toBe(2)
})
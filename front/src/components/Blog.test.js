import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

describe('<Blog />', () => {
    test('by default only shows title and author', () => {
        const blog = {
            title: 'React patterns',
            author: 'Michael Chan',
            url: 'https://reactpatterns.com/',
            likes: 7,
            id: '60195104d30c6f53fb2afd6a',
        }

        const component = render(
            <Blog blog={blog} />
        )

        //const div = component.container.querySelector('.blogDiv')
        //console.log(prettyDOM(div))

        expect(component.container).toHaveTextContent(blog.title)
        expect(component.container).toHaveTextContent(blog.author)
        expect(component.container).not.toHaveTextContent(blog.url)
        expect(component.container).not.toHaveTextContent(blog.likes)
    })
})
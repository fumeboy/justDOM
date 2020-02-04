import { Component } from '../../../def/component'
import { router } from './index'

export let link = (...children) => (path_fn, ...args) => {
    let href = path_fn(...args)
    return new Component('a').a({ href }).c(...children).on('click', (e) => {
        e.preventDefault()
        router.push(href)
    })
}

import { Status } from '../../def/status'
import { Component } from '../../def/component'

export const counter = (count: Status) => {
    return new Component('button')
        .on('click', () => {
            count.set((v) => v + 1)
        })
        .with(count, (v, c) => {
            c.elem.innerHTML = 'count is ' + v
        },true)
}

export const counter2 = () => {
    let count = new Status(0)
    return new Component('button')
        .on('click', () => {
            count.set((v) => v + 1)
        })
        .with(count, (v,c) => {
            c.elem.innerHTML = 'count is ' + v
        },true)
}

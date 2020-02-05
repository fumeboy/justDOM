import { Status } from '@d/status'
import { Component } from '@d/component'
import {reactive_text} from '@s/reactive_text'

export const counter = (count: Status) => {
    return new Component('button')
        .c(reactive_text(count, (v) => 'count is ' + v))
        .on('click', () => {
            count.set((v) => v + 1)
        })
}

export const counter2 = () => {
    let count = new Status(0)
    return new Component('button').c(reactive_text(count, (v) => 'count is ' + v)).on('click', () => {
        count.set((v) => v + 1)
    })
}

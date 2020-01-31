import { Status, Statuses } from '../../def/status'
import { Component } from '../../def/component'
import { vfor } from '../../def/vfor'

type itemT = {
    text: string
    done: boolean
}

const todoitem = (data: Statuses<itemT>) => {
    let { done, text } = data.children()
    return new Component('li').c(
        new Component('span').with(
            text,
            (v, c) => {
                c.elem.innerText = v
            },
            true
        ),
        new Component('button')
            .on('click', () => {
                done.set((v) => !v)
            })
            .with(
                done,
                (v, c) => {
                    c.elem.innerText = '[have done? ' + v + ']'
                },
                true
            )
    )
}

let todoList = [
        { text: 'item a', done: true },
        { text: 'item b', done: false },
        { text: 'item c', done: false }
    ],
    array = new Status(todoList)

export const todolist = () => {
    let filter = (filter: number, list) => {
        let showList = []
        if (filter === 1) {
            showList = list.filter((n) => n.done)
        } else if (filter === 2) {
            showList = list.filter((n) => !n.done)
        } else {
            showList = list
        }
        return showList
    }
    let title = new Component('h1').c('TODO list')
    let tabs = new Component().c(
        new Component('button').c('all').on('click', () => array.set(filter(0,todoList))),
        new Component('button').c('finished').on('click', () => array.set(filter(1, todoList))),
        new Component('button').c('todo').on('click', () => array.set(filter(2,todoList)))
    )
    let input = new Component('input')
    let list = new vfor(todoList, todoitem).with(array, (v, c: vfor<itemT>) => {
        c.update(v)
    })
    let button = new Component('button').c('input').on('click', () => {
        let i = <HTMLInputElement>input.elem
        let data = {
            text: i.value,
            done: false
        }
        todoList.push(data)
        array.must_update(todoList)
        i.value = ''
    })
    return new Component('ul').c(title, tabs, input, button, list)
}

import { counter, counter2 } from '../components/counter/index'
import { todolist } from '../components/todolist/index'
import { Status } from '../def/status'
import { Component } from '../def/component'
let counter_ = counter2()
let counter_2 = counter2()
let counter_3 = counter2()

let counter_4_status = new Status(0)
let counter_4 = counter(counter_4_status)
let button = new Component('button').c('reset counter_4').on('click', ()=>{counter_4_status.set(0)})

let todolist_ = todolist()
document.body.appendChild(counter_.elem)
document.body.appendChild(counter_2.elem)
document.body.appendChild(counter_3.elem)
document.body.appendChild(counter_4.elem)
document.body.appendChild(button.elem)
document.body.appendChild(todolist_.elem)
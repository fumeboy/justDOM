import { counter, counter2 } from '@c/counter'
import { Status } from '@d/status'
import { Component } from '@d/component'

let counter_ = counter2()
let counter_2 = counter2()
let counter_3 = counter2()
let counter_4_status = new Status(0)
let counter_4 = counter(counter_4_status)
let button = new Component('button').c('reset counter_4').on('click', ()=>{counter_4_status.set(0)})

export default new Component().c(counter_, counter_2, counter_3, counter_4, button)
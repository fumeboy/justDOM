# You Might Not Need VDOM

justDOM 项目展示了如何在不使用 vdom 的情况下，获取与现代流行前端框架类似的编程体验。

传统 vdom 的处理流程是这样的：

1. 程序员需要更新 DOM 节点树的一部分，并且“明确地”知道具体需要如何更新。（需求明确）

2. 但是他并不直接去做这件事，而是产生 vdom 节点树，通过对比新旧 vdom 节点树来寻找需要更新的部分。这个时候，diff 程序在猜测程序员的想法。（需求丢失再捕获） 

程序员既然已经知道了要更新何处，为什么还要绕一个弯子，体验需求丢失再捕获呢


## 项目说明

具体实例可以阅读 ./components 下的 counter 和 todolist 文件夹下的程序

核心定义在于 ./def 文件夹

```javascript
// status.ts
// status 对象储存 callbacks[] 和 variable
let count = new Status(0)
// 具有 set 方法，当执行 set 方法时
// 如果 variable 发生改变，会执行所有的 callback
count.set(1)
count.set(v=>v+1) // set 可以接受一个函数，函数参数即 count.variable
// 具有 with 方法，当执行 with 方法时
// 添加 callback
count.with(v=>console.log(v))
```

```javascript
// component.ts 组件类的定义
// 可以通过下面的方法产生一个组件实例
const counter = () => {
    let count = new Status(0)
    return new Component('button')
            .c(reactive_text(count, (v) => 'count is ' + v))
            .on('click', () => {
                count.set((v) => v + 1)
            })
}
```

在 node 环境下，使用 npm run example 体验示例


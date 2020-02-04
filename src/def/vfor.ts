import { Status, StatusCallback, Statuses } from './status'
import { Component } from './component'

export abstract class Components {
    abstract to(parentNode)
    abstract with(s:Status, fn: StatusCallback)
}

export class vfor<T> extends Components {
    private array
    private begin = document.createTextNode('')
    private end = document.createTextNode('')
    private cache: { [k: number]: { status: Statuses<T>; component: Component } } = {}
    private item_fn
    private key_fn
    private parentNode
    private key = 0
    private default_key_fn(){
        this.key ++
        return this.key
    }
    private old_list = []
    constructor(array, item_fn, key_fn?) {
        super()
        if(!key_fn)key_fn = this.default_key_fn
        this.array = array
        this.key_fn = key_fn
        this.item_fn = item_fn
    }
    to(parentNode) {
        parentNode.appendChild(this.begin)
        for (let i = 0, len = this.array.length; i < len; i++) {
            let data = this.array[i]
            let key = data.__key__ = this.key_fn(data)
            let status = new Statuses<T>(data)
            let item = this.cache[key] = {
                component: this.item_fn(status),
                status
            }
            this.old_list.push({key, el:item.component.elem})
            parentNode.appendChild(item.component.elem)
        }
        parentNode.appendChild(this.end)
        this.parentNode = parentNode
        delete this.array
    }
    with(s:Status, fn: StatusCallback){
        s.with(fn, this)
        return this
    }
    update(array) {
        if(this.array)return
        let key_map = {},
            new_list = [],
            len = array.length
        for (let i = 0; i < len; i++) {
            let item
            let data = array[i]
            let key = data.__key__
            if(key){
                item = this.cache[key]
                item.status.set()
            }else{
                key = this.key_fn(data)
                let status = new Statuses<T>(data)
                item = this.cache[key] = {
                    component: this.item_fn(status),
                    status
                }
            }
            key_map[key] = 1
            new_list.push({key, el: item.component.elem})
        }
        for(let i = 0; i < this.old_list.length; i++){
            let item = this.old_list[i]
            if(!key_map[item.key]){
                this.parentNode.removeChild(item.el)
            }
        }
        let ptr: Node = this.end,
            ptr2: Node = this.begin,
            index = len-1,
            index2 = 0,
            clean = () => {
                // 检查首尾元素是否相同，缩短检查组
                for(;index2<=index;){
                    if(new_list[index2].el===ptr2.nextSibling) {
                        index2++
                        ptr2 = ptr2.nextSibling
                    }else{
                        break
                    }
                }
                for(;index>index2;){
                    if(new_list[index].el===ptr.previousSibling) {
                        index--
                        ptr = ptr.previousSibling
                    }else{
                        break
                    }
                }
            }
        clean()
        while(index>=index2){
            this.parentNode.insertBefore(new_list[index].el, ptr)
            ptr = ptr.previousSibling
            index--
            clean()
        }
        this.old_list = new_list
    }
}

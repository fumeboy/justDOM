import { Status, StatusCallback } from './status'
import { Components } from './vfor'

export class Component{
    elem: Element
    with(s:Status, fn: StatusCallback, run?: boolean){
        s.with(fn, this)
        if(run){
            // with 挂上时，执行一次
            s.must_update(v=>v)
        }
        return this
    }
    on(k: keyof HTMLElementEventMap, event: EventListenerOrEventListenerObject){
        this.elem.addEventListener(k,event)
        return this
    }
    private contain(child){
        if(child instanceof Component){
            this.elem.appendChild(child.elem)
        }else if(child instanceof Components){
            child.to(this.elem)
        }else if(child instanceof Node){
            this.elem.appendChild(child)
        }else if(typeof child === 'string'){
            this.elem.appendChild(document.createTextNode(child))
        }
    }
    c(...children){
        for(let i = 0, len = children.length; i < len; i++){
            this.contain(children[i])
        }
        return this
    }
    constructor(tagName?){
        if(!tagName)tagName='div'
        this.elem = document.createElement(tagName)
    }
}
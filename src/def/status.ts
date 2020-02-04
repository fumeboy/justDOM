export type StatusCallback = (v, c?) => any
export type StatusCallbackO = {
    fn: StatusCallback
    args?: any[]
}

export class Status {
    private variable: any
    private callbacks: StatusCallbackO[]
    private update(v) {
        this.variable = v
        for (let i = 0, len = this.callbacks.length; i < len; i++) {
            let o = this.callbacks[i]
            o.fn(v, ...(o.args ? o.args : []))
        }
    }
    get() {
        return this.variable
    }
    set(v) {
        let v_ = typeof v === 'function' ? v(this.variable) : v
        if (this.variable !== v_) {
            this.update(v_)
        }
    }
    must_update(v) {
        this.update(typeof v === 'function' ? v(this.variable) : v)
    }
    with(fn, ...args) {
        this.callbacks.push({ fn, args })
    }
    constructor(v) {
        this.variable = v
        this.callbacks = []
    }
}

export class Statuses<T> {
    private data

    private children_ = <{ [k in keyof T]: Status }>{}
    set() {
        let o = this.data
        for (let k in o) {
            let s = this.children_[k]
            if (s) s.set(o[k])
        }
    }
    get(){
        return this.data
    }
    children(){
        return this.children_
    }
    constructor(o: object) {
        this.data = o
        for (let k in o) {
            if(k!=='__key__'){
                let s = new Status(o[k])
                this.children_[k] = s
                s.with((v)=>{o[k]=v})//子项更新时，同步母项
            }
        }
    }
}

// 发布订阅者模式

class Events {
    events = {}

    emit(type, ...args) {
        const listener = this.events[type]

        for (let listen of listener) {
            listen.listener(...args)
            if (listen.once) {
                this.off(type, listener.listener)
            }
        }
    }

    on(type, listener) {
        this.events[type] = this.events[type] || []
        this.events[type].push({ listener })
    }

    once(type, listener) {
        this.events[type] = this.events[type] || []
        this.events[type].push({ listener, once: true })
    }

    off(type, listener) {
        if(listener){
            this.events[type] = this.events[type].filter(listener => listener.listener !== listener)
        }else{
            this.events[type] = this.events[type] || []
        }
    }
}


const e = new Events()

const callback = x => { console.log('Click', x.id) }
e.on('click', callback)
e.on('click', callback)

// 只打印一次
const onceCallback = x => console.log('Once Click', x.id)
e.once('click', onceCallback)
e.once('click', onceCallback)

//=> 3
e.emit('click', { id: 3 })

//=> 4
e.emit('click', { id: 4 })
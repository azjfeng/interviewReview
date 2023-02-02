function MvvM(options = {}) {
    this.$options = options;

    let data = this._data = this.$options.data

    observe(data)

    new Complier(options.el, this)
}

function Observe(data) {
    for (const key in data) {
        let val = data[key]

        observe(val)    //对数据进行递归监听

        Object.defineProperty(data, key, {
            configurable: true,
            get() {
                return val
            },
            set(newVal) {
                if (val === newVal) {
                    return
                }
                val = newVal
                observe(newVal);    //数据发生变化时降新数据也监听
            }
        })
    }
}

function observe(data) {
    if (!data || typeof data !== 'object') return;

    return new Observe(data);
}


function Complier(el, vm) {
    // 将el挂载到实例上方便调用
    vm.$el = document.querySelector(el);

    // 在el范围里将内容都拿到，当然不能一个一个的拿
    // 可以选择移到内存中去然后放入文档碎片中，节省开销
    let fragment = document.createDocumentFragment();

    while (child = vm.$el.firstChild) {
        fragment.appendChild(child);    // 此时将el中的内容放入内存中
    }

    function replace(frag) {
        Array.from(frag.childNodes).forEach(node => {
            let text = node.textContent
            
            let reg = /\{\{(.*?)\}\}/g;
            if (node.nodeType === 3 && reg.test(text)) {
                // console.log('RegExp.$1', text.match(reg)); // 匹配到的第一个分组 如： a.b, c
                // let arrr = text.match(reg);
                // arrr.forEach((item, key)=>{
                //     reg.lastIndex = 0 
                //     arrr[key] = reg.exec(item)[1]
                // })
                // console.log('arrr222222', arrr)
                let arr = RegExp.$1.split('.');
                let val = vm._data;
                arr.forEach(key => {
                    val = val[key];     // 如this.a.b
                });
                console.log(val)
                // 用trim方法去除一下首尾空格
                node.textContent = text.replace(reg, val).trim();
            }
            // 如果还有子节点，继续递归replace
            if (node.childNodes && node.childNodes.length) {
                replace(node);
            }
        })
    }
    replace(fragment)
    vm.$el.appendChild(fragment);   // 再将文档碎片放入el中
}

let mvvm = new MvvM({
    el: '#app',
    data: {     // Object.defineProperty(obj, 'song', '发如雪');
        song: '发如雪',
        album: {
            name: '十一月的萧邦',
            theme: '夜曲'
        },
        singer: '周杰伦'
    }
});
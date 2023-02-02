function deepClone(source, hash = new WeakMap()) {
    if (typeof source !== 'object' || source === null) return source;
    if (hash.has(source)) return hash.get(source); // 新增代码，查哈希表

    let target = Array.isArray(source) ? [] : {};

    hash.set(source, target); // 新增代码，哈希表设值

    for (const key in source) {
        if (Object.hasOwnProperty.call(object, key)) {
            if (typeof source === 'object' && source !== null) {
                target[key] = deepClone(source[key], hash)
            } else {
                target[key] = source[key]
            }
        }
    }
    return target
}


function cloneDeep5(x) {
    const root = {};

    // 栈
    const loopList = [
        {
            parent: root,
            key: undefined,
            data: x,
        }
    ];

    while(loopList.length) {
        // 广度优先
        const node = loopList.pop();
        const parent = node.parent;
        const key = node.key;
        const data = node.data;

        // 初始化赋值目标，key为undefined则拷贝到父元素，否则拷贝到子元素
        let res = parent;
        if (typeof key !== 'undefined') {
            res = parent[key] = {};
        }

        for(let k in data) {
            if (data.hasOwnProperty(k)) {
                if (typeof data[k] === 'object') {
                    // 下一次循环
                    loopList.push({
                        parent: res,
                        key: k,
                        data: data[k],
                    });
                } else {
                    res[k] = data[k];
                }
            }
        }
    }

    return root;
}
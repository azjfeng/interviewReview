/**
 * 手写call
*/
Function.prototype.myApply = function () {
    let thisArg = arguments[0]
    const args = Array.from(arguments).slice(1)
    if (thisArg == null || thisArg == undefined) {
        /**
         * 判断继承的对象是否存在
        */
        thisArg = window
    } else {
        /**
         * 将用户传入的this改成对象
        */
        thisArg = Object(thisArg)
    }

    const method = Symbol('method')
    /**
     * 将调用call的函数绑定到传入的对象上
    */
    thisArg[method] = this

    let result = ''
    if (!args) {
        result = thisArg[method](...args)
    } else {
        result = thisArg[method](args)
    }
    delete thisArg.method

    return result

}

const obj = {
    name: 'jack',
    age: 18
}

function add() {
    console.log(this.name, this.age, arguments)
}

add.myApply(obj, [1,2])




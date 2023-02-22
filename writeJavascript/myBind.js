Function.prototype.myBind() = function (context) {

    // 判断调用对象是否为函数
    if (typeof this !== "function") {
        throw new TypeError("Error");
    }

    var args = Array.from(arguments).slice(1)
    var fn = this

    return function Fn() {
        // 判断是否是Fn 实例 ，如果是就使用this，如果不是就使用传入的函数
        return fn.apply(this instanceof Fn ? this : context, args.concat(...arguments))
    }
}
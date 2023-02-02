function curry(fn){
    const len = fn.length
    const args = Array.from(arguments).slice(1)
    return function(){
        const newArgs = args.concat(Array.from(arguments))
        /**
         * 判断参数个数是否一致，如果少参数就执行柯里化函数转换，如果参数一致就输出结果
        */
        if(newArgs.length < len){
            return curry(fn, ...newArgs)
        }else{
            return fn.apply(this, newArgs)
        }
    }
}

function add(a, b){
    console.log(a+b)
}

var _add = curry(add)(1)(10)
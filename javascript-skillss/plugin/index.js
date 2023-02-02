class Calculator{
    plugins = [];
    constructor(num){
        this.num = num
    }
    use(plugin){
        this.plugins.push(plugin);
        this[plugin.name] = plugin.calculate.bind(this)
        return this
    }
    result(){
        return this.num
    }
}

class Add{
    name = 'add';
    calculate(num){
        this.num =  this.num + num;
        return this;
    }
}

const myCalculator  = new Calculator(5)
myCalculator.use(new Add()).add(5).result();

console.log(myCalculator.use(new Add(5)).result())
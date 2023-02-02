### 1. Node 与浏览器的 Event Loop 差异?
    浏览器环境下，microtask 的任务队列是每个 macrotask 执行完之后执行。而在 Node.js 中，microtask 会在事件循环的各个阶段之间执行，也就是一个阶段执行完毕，就会去执行 microtask 队列的任务。

    setTimeout(()=>{
        console.log('timer1')
        Promise.resolve().then(function() {
            console.log('promise1')
        })
    }, 0)
    setTimeout(()=>{
        console.log('timer2')
        Promise.resolve().then(function() {
            console.log('promise2')
        })
    }, 0)

    浏览器端运行结果：timer1=>promise1=>timer2=>promise2

    Node 端运行结果：timer1=>timer2=>promise1=>promise2

    1. 全局脚本（main()）执行，将 2 个 timer 依次放入 timer 队列，main()执行完毕，调用栈空闲，任务队列开始执行；
    2. 首先进入 timers 阶段，执行 timer1 的回调函数，打印 timer1，并将 promise1.then 回调放入 microtask 队列，同样的步骤执行 timer2，打印 timer2；
    3. 至此，timer 阶段执行结束，event loop 进入下一个阶段之前，执行 microtask 队列的所有任务，依次打印 promise1、promise2

    #### 浏览器和 Node 环境下，microtask 任务队列的执行时机不同

    1. Node 端，microtask 在事件循环的各个阶段之间执行
    2. 浏览器端，microtask 在事件循环的 macrotask 执行完之后执行

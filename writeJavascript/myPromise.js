class ToyPromise {
    static PENDING = "pending";
    static FULFILLED = "fulfilled";
    static REJECTED = "rejected";

    constructor(handler) {
        // 数组：队列 - 先注册的，在调用resolve方法的时候，先执行, FIFO
        this.resolvedHandler = [];
        // 注册在调用 reject 方法的时候，执行的函数
        this.rejectedHandler = [];
        // 注册在调用 finally 方法的时候，执行的函数
        this.finallyHandler = [];
        // 初始化状态
        this.status = ToyPromise.PENDING;
        try {
            handler(this._resolve.bind(this), this._reject.bind(this));
        } catch (error) {
            this._reject(error);
        }
    }

    _resolve(val) {
        // 判断是否为初始化状态
        if (this.status !== ToyPromise.PENDING) return;
        this.status = ToyPromise.FULFILLED;
        this.observer(() => {
            let handler;
            while ((handler = this.resolvedHandler.shift())) {
                handler(val);
            }
            this._finally();
        });
    }

    _reject(val) {
        // 判断是否为初始化状态
        if (this.status !== ToyPromise.PENDING) return;
        this.status = ToyPromise.REJECTED;
        this.observer(() => {
            let handler;
            while ((handler = this.rejectedHandler.shift())) {
                handler(val);
            }
            this._finally();
        });
    }

    _finally() {
        let handler;
        // 因为每一个独立的Promise只处理一次任务，所以注册的回调取出以后就不再需要了
        while ((handler = this.finallyHandler.shift())) {
            handler();
        }
    }

    observer(callback) {
        let ob = new MutationObserver((list) => {
            callback();
        });
        //   观察者：观察 DOM 元素的变化
        ob.observe(document.body, {
            attributes: true,
        });
        document.body.setAttribute("random", Math.random());
    }

    then(resolvedHandler, rejectedHandler) {
        return new ToyPromise((resolve, reject) => {
            // 成功状态的注册的函数
            this.resolvedHandler.push((val) => {
                // 判断参数是否为函数
                if (typeof resolvedHandler === "function") {
                    try {
                        let res = resolvedHandler(val);
                        if (res instanceof ToyPromise) {
                            // 给 res 添加 then 方法, resolve 后执行
                            res.then(resolve, reject);
                            return;
                        }
                        // thenable 含有 then 属性的 对象
                        if (typeof res === "object" && res.then) {
                            res.then();
                            return;
                        }
                        resolve(res);
                    } catch (error) {
                        reject(error);
                    }
                }
            });

            // 失败状态的注册的函数
            this.rejectedHandler.push((val) => {
                // 判断参数是否为函数
                let res;
                if (typeof rejectedHandler === "function") {
                    try {
                        res = rejectedHandler(val);
                        if (res instanceof ToyPromise) {
                            // 给 res 添加 then 方法, resolve 后执行
                            res.then(resolve, reject);
                            return;
                        }
                        // thenable 含有 then 属性的 对象
                        if (typeof res === "object" && res.then) {
                            res.then();
                            return;
                        }
                        resolve(res);
                    } catch (error) {
                        alert(error);
                        reject(error);
                    }
                }
            });
        });
    }

    catch(rejectedHandler) {
        return this.then(undefined, rejectedHandler);
    }

    finally(finallyHandler) {
        this.finallyHandler.push(finallyHandler);
    }
    static resolve(val) {
        return new ToyPromise((resolve, reject) => {
            resolve(val);
        });
    }
    static all(arr) {
        let len = arr.length;
        let values = [];
        let n = 0;
        return new ToyPromise((resolve, reject) => {
            for (let i = 0; i < len; i++) {
                arr[i]
                    .then(
                        (val) => {
                            n++;
                            values.push(val);
                            if (len === n) {
                                resolve(values);
                            }
                        },
                        (error) => {
                            console.log(error);
                        }
                    )
                    .catch((error) => {
                        console.log(error);
                        reject(error);
                    });
            }
        });
    }
}
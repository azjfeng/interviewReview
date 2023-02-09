### 1. React性能优化？
    1. 使用PureComponent 避免父组件更新时影响到不需要更新的子组件（使用 PureComponent 的原理就是它会对state 和props进行浅比较，如果发现并不相同就会更新。）

    比较方法：  第一步，首先会直接比较新老 props 或者新老 state 是否相等。如果相等那么不更新组件。
    第二步，判断新老 state 或者 props ，有不是对象或者为 null 的，那么直接返回 false ，更新组件。
    第三步，通过 Object.keys 将新老 props 或者新老 state 的属性名 key 变成数组，判断数组的长度是否相等，如果不相等，证明有属性增加或者减少，那么更新组件。
    第四步，遍历老 props 或者老 state ，判断对应的新 props 或新 state ，有没有与之对应并且相等的（这个相等是浅比较），如果有一个不对应或者不相等，那么直接返回 false ，更新组件。 到此为止，浅比较流程结束， PureComponent 就是这么做渲染节流优化的。

    2. 使用useMemo或者useCallback缓存数据，避免重复更新。
    3. 使用React.memo缓存组件。（React.memo的规则是如果想要复用最后一次渲染结果，就返回true，不想复用就返回false。 所以它和shouldComponentUpdate的正好相反，false才会更新，true就返回缓冲。）
    4. 无意义重复调用setState，合并相关的state。
    5. 循环渲染时合理使用key加快diff速度。
    6. 使用React.lazy懒加载组件，避免首次渲染过多无用组件。

### 2. 判断数据类型的方法？
    1. typeof (typeof 是一个操作符，其右侧跟一个一元表达式，并返回这个表达式的数据类型。返回的结果用该类型的字符串(全小写字母)形式表示，包括以下 7 种：number、boolean、symbol、string、object、undefined、function 等。)
    2. instanceof (instanceof 是用来判断 A 是否为 B 的实例，表达式为：A instanceof B，如果 A 是 B 的实例，则返回 true,否则返回 false。 在这里需要特别注意的是：instanceof 检测的是原型，)
    3. constructor (当一个函数 F被定义时，JS引擎会为F添加 prototype 原型，然后再在 prototype上添加一个 constructor 属性，并让其指向 F 的引用)
    4. Object.prototype.toString.call() (toString() 是 Object 的原型方法，调用该方法，默认返回当前对象的 [[Class]] 。这是一个内部属性，其格式为 [object Xxx] ，其中 Xxx 就是对象的类型。)

### 3. commonjs 和 esm 的主要区别可以概括成以下几点：
   1. CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。
   2. CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。
   3. CommonJS 模块的require()是同步加载模块，ES6 模块的import命令是异步加载，有一个独立的模块依赖的解析阶段。
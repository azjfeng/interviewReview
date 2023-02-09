### 原子CSS实现方案

1. 设置原子基本配置项包括（vscode包括提示名    {
    "prefix": "border-none",
    "name": "border-none",
    "prop": "border",
    "value": "none",
    "description": "消除边框样式"
  }）
2. 使用fs.readdir api读取配置项文件夹并使用fs.readFile读取每个配置文件的数据组装成数组。


3. 遍历数组数据组装成基本的css格式，并使用fs.writeFile将数据写入根目录文件,同时组装成vscode的智能提示代码并写入到.vscode文件夹中（atom.code.snippets）（
   ```
   fs.readFile(`./config/${item}`, (err, data) => {
       if (err) throw err;
       const tmpData = JSON.parse(data)
       dataList.push(...tmpData)
       if (key === files.length - 1) {
           let content = ''
           // dataList = uniqueFunc(dataList, 'perfix');
           console.log(dataList)
           dataList.forEach(el => {
               if (el.type) {
                   let pData = ''
                   el.props.forEach((item) => {
                       pData += `${item.prop}: ${item.value};`
                   })
                   content += `.${el.prefix}:${el.pseudo} {${pData}}`
               } else {
                   content += `.${el.name}{${el.prop} : ${el.value}}`
               }
           });）
               fs.writeFile('../atom.wxss', content, (err) => {
               console.log(err)
           })

           let snips = {}
           dataList.forEach(el => {
               snips[el.prefix] = {
                   "scope": "html",
                   "prefix": el.prefix,
                   "body": [
                       el.prefix
                   ],
                   "description": el.description
               }
           });
           fs.writeFile(path.join(__dirname, '../.vscode/atom.code-snippets'), JSON.stringify(snips), (err) => {
               console.log(err)
           })
    ```

4. 使用postCss和autoprefixer库将css转成ast格式，并且将元素与原子配置进行对比然后逐个替换成原子的类名

5.  使用cherrio库将wxml文件转成dom树，并通过递归遍历所有元素。递归的同时将第四步获取到的原子数据重新赋值给对应的dom

6. 最后通过fs.writeFile方法将文件重新写入对应的文件中
const fs = require("fs");
const path = require("path");
 
function initCss() {
  fs.readdir(path.join(__dirname, "./config"), (err, files) => {
    if (err) return;
    let dataList = [];
    console.log(files);
    files.forEach((item, key) => {
      fs.readFile(path.join(__dirname, `./config/${item}`), (err, data) => {
        if (err) throw err;
        const tmpData = JSON.parse(data);
        dataList.push(...tmpData);
        /**
         * 判断文件是否遍历完，遍历完成之后开始生成全局CSS
        */
        if (key === files.length - 1) {
          let content = "";
          dataList.forEach((el) => {
            /**
             * @params type 用来区分是单一属性代码块还是多属性代码块
            */
            if (el.type) {
              let pData = "";
              el.props.forEach((item) => {
                pData += `${item.prop}: ${item.value};`;
              });
              content += `.${el.prefix}::${el.pseudo} {${pData}}`;
            } else {
              content += `.${el.name}{${el.prop} : ${el.value}}`;
            }
          });

          fs.writeFile("../atom.wxss", content, (err) => {
            console.log(err);
          });

          /**
           * snips 代码块配置
          */
          const snips = {};
          dataList.forEach((el) => {
            snips[el.prefix] = {
              scope: "html",
              prefix: el.prefix,
              body: [el.prefix],
              description: el.description,
            };
          });
          fs.writeFile(
            path.join(__dirname, "../.vscode/atom.code-snippets"),
            JSON.stringify(snips),
            (err) => {
              console.log(err);
            }
          );
        }
      });
    });
  });
}

initCss();


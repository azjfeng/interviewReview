const cheerio = require("cheerio");
const fs = require("fs");
const portCss = require("postcss");
const path = require("path");
const autoprefixer = require("autoprefixer");
const portCssTool = portCss([autoprefixer]);
const colors = require("colors-console");
const _ = require("underscore");
const ProgressBar = require("progress");
const { compare, calculate } = require("specificity");
const total = 1688;
const bar = new ProgressBar("  处理中 [:bar]  :percent", {
  total,
  complete: "=",
  incomplete: " ",
  width: 20,
});

/**
 * 转换路径
 */
const fullpath = process.argv[2];
/**
 * 转换文件名（避免文件名与文件夹名不一致）
 */
const fileName = process.argv[3];
if (!fullpath) {
  console.log(colors("red", "请输入转换路径"));
  return;
} else if (!fileName) {
  console.log(colors("red", "请输入转换文件名"));
  return;
}

/**
 * 将wxml转成dom
 */
function getDom(fullPath) {
  // let html = `${fs.readFileSync(
  //   path.join(__dirname, `${fullPath}/${fileName}.wxml`),
  //   "utf8"
  // )}`;

  let html = `<body>${fs.readFileSync(
    path.join(__dirname, `${fullPath}/${fileName}.wxml`),
    "utf8"
  )}</body>`;

  // 替换换行符
  const newHtml = html.replace(/\r|\n/g, "");
  // //替换自闭和标签
  // newHtml = newHtml.replace(/(<([^!\/][\S]+)[\s]+((?!<).)*?)\/>/g, (match, p, p2) => {
  //   return `${p}></${p2}>`
  // })
  const dom = cheerio.load(newHtml, {
    xmlMode: true,
    decodeEntities: false, // Decode HTML entities.
  });

  return dom;
}

/**
 * 将css转成ast格式
 */
function getCssAst(fullPath) {
  const css = fs.readFileSync(fullPath, "utf8");
  return portCssTool
    .process(css, { from: undefined })
    .then((result) => result.root);
}

/**
 * @param fullpath 页面路径
 * 解析html为dom格式
 */
async function paraseHtml(fullpath) {
  const $ = getDom(fullpath);
  const body = $("body")[0];
  const cssMap = await complier(fullpath);
  const cssJsonMap = {}; //记录所有需要替换的节点
  loopDomTree(body, $, cssMap, cssJsonMap);
  for (const key in cssJsonMap) {
    const element = key.split(' ').join(' .')
    console.log(`.${element}`)
    $(`.${element}`).attr("class", cssJsonMap[key]);
  }
  /**
   * 将文件重写进html
   */
  let html = $.html();
  html = html.replace("<body>", "");
  html = html.replace("</body>", "");
  fs.writeFile(
    path.join(__dirname, `${fullpath}/${fileName}.wxml`),
    html,
    (err) => {
      console.log(err);
    }
  );
}

paraseHtml(fullpath);
bar.tick(total)

/**
 * 递归将dom的class属性替换成代码块格式，如果没有对应的代码块，就保持原有class类名
 */
function loopDomTree(elem, $, cssMap, cssJsonMap) {
  if (!elem || elem.type === "text") return;
  if (elem.name !== "body") {
    const attributes = elem.attributes;
    const newCssList = [];
    let str = ''
    _.each(attributes, (item) => {
      if (item.name === "class") {
        const classList = item.value.split(" ").filter((item) => item);
        classList.forEach((element) => {
          // 判断是否存在代码块
          if (cssMap[element]) {
            let arr = cssMap[element];
            for (const key in cssMap) {
              const reg = new RegExp(`${element}$`);
              if (reg.test(key) && key.split(" ").length > 1) {
                const bool = parseTag(elem, key, element);
                if (bool) {
                  str = key
                  arr.push(...cssMap[key]);
                }
              }
            }
            newCssList.push(...arr);
          } else {
            newCssList.push(  {
              name: element,
              prop: element,
            },);
          }
        });
      }
    });
    const obj = {};
    newCssList.reverse().forEach((item) => {
      if (!obj[item.prop]) {
        obj[item.prop] = item.name;
      }
    });
    cssJsonMap[str || elem.attributes[0].value] = Object.values(obj).join(" ")
  }
  _.each(elem.childNodes, function (childElem) {
    loopDomTree(childElem, $, cssMap, cssJsonMap);
  });
}

/**
 * 获取当前元素的父元素和顶级元素,通过递归判断是否形成完整路径
 */

function parseTag(elem, key, element) {
  let el = elem;
  const arr = key.split(" ");
  let index = arr.length - 2;
  while (el.parent && el.parent.name !== "body" && index >= 0) {
    console.log(
      "attributes",
      el.parent.attributes,
      arr[index],
      el.parent.name
    );
    if (el.parent.attributes[0].value.split(" ").indexOf(arr[index]) !== -1) {

      el = el.parent;
      index--;
    } else {
      return false;
    }
  }
  if (index < 0 && el.attributes[0].value.split(" ").indexOf(arr[0]) !== -1) {
    return true;
  }
  return false;
}

function parseAttr(elem, $, snippets, cssMap) {}

/**
 * 合并提示代码块
 */
function getJSON() {
  return fs.readdirSync(path.join(__dirname, "./config"), (err, files) => {
    if (err) return;
    files.forEach((item, key) => {
      fs.readFileSync(path.join(__dirname, `./config/${item}`), (err, data) => {
        if (err) throw err;
        const tmpData = JSON.parse(data);
        dataList.push(...tmpData);
      });
    });
  });
}

/**
 * 获取wxss的代码块映射组
 */
async function complier(fullPath) {
  const snippets = [];
  const cssAst = await getCssAst(
    path.join(__dirname, `${fullPath}/${fileName}.wxss`)
  );
  const jsonConfig = await getJSON();

  jsonConfig.forEach((item, key) => {
    const data = fs.readFileSync(
      path.join(__dirname, `./config/${item}`),
      "utf8"
    );
    const tmpData = JSON.parse(data);
    snippets.push(...tmpData);
  });

  cssAst.nodes = cssWeightSort(cssAst.nodes);
  const cssMap = {};

  _.each(cssAst.nodes, (item) => {
    const { selector, nodes } = item;
    _.each(nodes, (el) => {
      if (el.type == "decl") {
        const key =
          el.parent.selector && el.parent.selector.replaceAll(".", "");
        if (cssMap[key]) {
          cssMap[key].push({ prop: el.prop, value: el.value });
        } else {
          cssMap[key] = [{ prop: el.prop, value: el.value }];
        }
      }
    });
  });

  for (const key in cssMap) {
    if (Object.hasOwnProperty.call(cssMap, key)) {
      const element = cssMap[key];
      const arr = [];
      element.forEach((item) => {
        const newCss = replaceCss(snippets, item);
        if (newCss) {
          arr.push(newCss);
        }
      });
      cssMap[key] = arr;
    }
  }
  // console.log("cssmap2222323", cssMap);

  return cssMap;
}

/**
 * 样式层级排序
 * @param {*} nodes
 * @returns
 */
function cssWeightSort(nodes) {
  if (Array.isArray(nodes)) {
    nodes = nodes.sort((a, b) => {
      if (
        a.type === "rule" &&
        b.type === "rule" &&
        a.selector.indexOf(",") === -1 &&
        b.selector.indexOf(",") === -1
      ) {
        return compare(a.selector, b.selector);
      }
      return 0;
    });
  }
  return nodes;
}
// complier(fullpath);
/**
 * 将wxss的样式替换成snippets代码提示块
 */
function replaceCss(snippets, cssProps) {
  let left = 0,
    right = snippets.length - 1;
  const { prop, value } = cssProps;
  while (left < right) {
    if (snippets[left].prop === prop && snippets[left].value === value) {
      return snippets[left];
    } else if (
      snippets[right].prop === prop &&
      snippets[right].value === value
    ) {
      return snippets[right];
    }
    left++;
    right--;
  }
  if (snippets[left].prop === prop && snippets[left].value === value) {
    return snippets[left];
  }
  return "";
}

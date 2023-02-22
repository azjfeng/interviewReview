const cheerio = require("cheerio");
const fs = require("fs");
const portCss = require("postcss");
const path = require("path");
const autoprefixer = require("autoprefixer");
const portCssTool = portCss([autoprefixer]);
// const { getJSON } = require("./index");

function getDom() {
    const html = fs.readFileSync(
        path.join(__dirname, "../index/index.wxml"),
        "utf8"
    );
    const newHtml = html.replace(/\r|\n/g, " ");
    return newHtml;
}
function getCssAst(fullPath) {
    const css = fs.readFileSync(fullPath, "utf8");
    return portCssTool
        .process(css, { from: undefined })
        .then((result) => result.root);
}

const dom = cheerio.load(getDom(), {
    xmlMode: true,
    decodeEntities: true, // Decode HTML entities.
});
console.log(dom.html())
// console.log(dom('body').children())
// console.log(dom('scroll-view').children())
// console.log('dom', dom('scroll-view').attr('class'))

//
function getJSON() {
    return fs.readdirSync("./config", (err, files) => {
        if (err) return;
        files.forEach((item, key) => {
            fs.readFileSync(`./config/${item}`, (err, data) => {
                if (err) throw err;
                const tmpData = JSON.parse(data);
                dataList.push(...tmpData);
            });
        });
    });
}

async function complier() {
    let dataList = []
    const data = await getCssAst(path.join(__dirname, "../index/index.wxss"))
    const jsonConfig = await getJSON()
    // console.log('dom', jsonConfig)

    jsonConfig.forEach((item, key) => {
        const data = fs.readFileSync(`./config/${item}`, 'utf8');
        const tmpData = JSON.parse(data);
        dataList.push(...tmpData);
        // console.log(dataList)
    });

    let obj = {};
    data.nodes.forEach((el) => {
        el.nodes.forEach((item) => {
            if (item.type == "decl") {
                const key =
                    item.parent.selector && item.parent.selector.split(".")[1];
                if (obj[key]) {
                    obj[key].push({ prop: item.prop, value: item.value });
                } else {
                    obj[key] = [{ prop: item.prop, value: item.value }];
                }
            }
            // console.log(item.type, item.prop, item.value, item.parent.selector)
        });
        // console.log(el.nodes)
    });
    // console.log('data222', obj)
    // console.log(datalist)
}
complier()

// // 将css转成对象格式
// const cssAst = getCssAst(path.join(__dirname, "../index/index.wxss")).then(
//     (res) => {
//         let obj = {};
//         res.nodes.forEach((el) => {
//             el.nodes.forEach((item) => {
//                 if (item.type == "decl") {
//                     const key =
//                         item.parent.selector && item.parent.selector.split(".")[1];
//                     if (obj[key]) {
//                         obj[key].push({ prop: item.prop, value: item.value });
//                     } else {
//                         obj[key] = [{ prop: item.prop, value: item.value }];
//                     }
//                 }
//                 // console.log(item.type, item.prop, item.value, item.parent.selector)
//             });
//             // console.log(el.nodes)
//         });
//         // console.log(obj)
//         return obj
//     }
// );

// console.log(cssAst.then((res)=>{
//     console.log(res)
// }))
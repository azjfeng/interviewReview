const fs = require("fs");
const path = require("path")

function uniqueFunc(arr, uniId) {
    const res = new Map();
    return arr.filter((item) => !res.has(item[uniId]) && res.set(item[uniId], 1));
}

function initCss() {
    fs.readdir('./config', (err, files) => {
        if (err) return
        let dataList = [];
        console.log(files)
        files.forEach((item, key) => {
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
                    });

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
                }
            });
        })

    })
}



function getJSON() {
    let dataList = [];
    return new Promise((reslove, reject) => {
        fs.readdirSync('./config', (err, files) => {
            if (err) return
            files.forEach((item, key) => {
                fs.readFileSync(`./config/${item}`, (err, data) => {
                    if (err) throw err;
                    const tmpData = JSON.parse(data)
                    dataList.push(...tmpData)
                    if (key === files.length - 1) {
                        reslove(dataList)
                    }
                });
            })
        })
    })
    return dataList
}

module.exports = {
    getJSON: getJSON
}
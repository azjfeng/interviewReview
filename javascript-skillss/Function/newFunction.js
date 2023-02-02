
/**
 * 使用new Function 方法向模板语法中插入数据
*/

String.prototype.interpolate = function (params) {
    const names = Object.keys(params);
    const vals = Object.values(params); return new Function(...names, `return \`${this}\`;`)(...vals);
};


const html = template.innerHTML.interpolate({
    data: [{
        article: 'Article title one',
        author: 'y'
    }, {
        article: 'Article title two',
        author: 'h'
    }]
});

document.querySelector('.content').innerHTML = html;
console.log(html);
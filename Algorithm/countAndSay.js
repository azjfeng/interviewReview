/**
 * 外观数列
 * @param {number} n
 * @return {string}
 */
var countAndSay = function (n) {
    if (n == 1) return '1';
    if (n == 2) return '11';
    let str = '11'
    for (var i = 3; i <= n; i++) {
        let tmp = '';
        let index = 0
        for (var j = 1; j < str.length; j++) {
            if (str[j - 1] != str[j]) {
                tmp += (index + 1) + str[j - 1]
                index = 0
            } else {
                index++
            }
        }
        tmp += (index + 1) + str[j - 1]
        str = tmp;
    }
    return str
};

const n = 5
console.log(countAndSay(n))
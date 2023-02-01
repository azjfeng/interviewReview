/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
/**
 * 题解
 * 循环将每个位置得数相乘，并且判断是否大于十，如果大于进一位，最后再反转数组
*/
var multiply = function (num1, num2) {
    let result = [];
    let len1 = num1.length, len2 = num2.length;
    for (var i = len1 - 1; i >= 0; i--) {
        let pre = 0;
        for (var j = len2 - 1; j >= 0; j--) {
            let idx = (len1 - i - 1) + (len2 - j - 1)   //当前相乘得数组在数组中得位置
            let count = num1[i] * num2[j] + (result[idx] || 0) + pre
            pre = Math.floor(count / 10);
            result[idx] = count % 10
        }
        if (pre > 0) {                            // 如果循环一遍之后又进位就push到数组末尾
            result.push(pre)
        }
    }
    result = result.reverse();
    let left = 0
    while (left < result.length) {
        if (result[left] == '0') {
            left++
        } else {
            return result.slice(left).join('')

        }
    }
    return '0'
};

var num1 = "123", num2 = "456";

console.log(multiply(num1, num2))
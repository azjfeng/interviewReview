/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var multiply = function (num1, num2) {
    const len1 = num1.length;
    const len2 = num2.length;
    const pos = new Array(len1 + len2).fill(0);

    for (let i = len1 - 1; i >= 0; i--) {
        const n1 = +num1[i];
        for (let j = len2 - 1; j >= 0; j--) {
            const n2 = +num2[j];
            const multi = n1 * n2;            //每组数往后移动一位和前一个数相加，避免第一个数十位的时候没有地方存
            console.log(pos)
            const sum = pos[i + j + 1] + multi; //每组数往后移动一位和前一个数相加

            pos[i + j + 1] = sum % 10;         //判断相加之后的值是否是大于十
            pos[i + j] += sum / 10 | 0;
        }
    }
    while (pos[0] == 0) {
        pos.shift();
    }
    console.log(pos)
    return pos.length ? pos.join('') : '0';
};

console.log(multiply('99', '99'))
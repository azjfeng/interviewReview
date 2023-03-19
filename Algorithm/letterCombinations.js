/**
 * @param {string} digits
 * @return {string[]}
 * 电话号码的字母组合
 */
var letterCombinations = function (digits) {
    const obj = {
        2: 'abc',
        3: 'def',
        4: 'ghi',
        5: 'jkf',
        6: 'mno',
        7: 'pqrs',
        8: 'tuv',
        9: 'wxyz',
    }
    if(!digits){
        return []
    }
    const result = []
    const dfs = (cur, arr) => {
        if (cur.length === digits.length) {
            result.push(cur)
            return
        }
        /*
        * 每次取digites的第一个值进行循环。
        */
        let str = obj[arr[0]]
        for (let i = 0; i < str.length; i++) {
            /**
             * 每一次循环截取第一位循环之后，字符串就往后截一位
            */
            dfs(cur + str[i], arr.slice(1))
        }
    }
    dfs('', digits)
    return result;
};

console.log(letterCombinations('23'))
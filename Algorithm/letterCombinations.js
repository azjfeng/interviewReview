/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function (digits) {
    const map = {
        "2": "abc",
        "3": "def",
        "4": "ghi",
        "5": "jkl",
        "6": "mno",
        "7": "pqrs",
        "8": "tuv",
        "9": "wxyz",
    }
    if (digits == '') {
        return []
    }
    let res = []
    function dfs(cur, arr){
        if(cur.length == digits.length){
            res.push(cur)
            return
        }
        let str = map[arr[0]];//每次取第一个数字
        for(let i = 0; i < str.length; i++) {//遍历当前按键的所有字母，遍历完后面的按键会回溯到当前按键的下一个字母
            dfs(cur + str[i],arr.slice(1));//带着当前字母组合去找下一个按键对应的字母
        }
    }
    dfs('', digits)
    console.log(res)
    return res

    // console.log(arr)
};




letterCombinations('234')

/**字母异位词分组
 * @param {string[]} strs
 * @return {string[][]}
 */
/**
 * 将每个字符串转为数组排序，同时将值存在map表中
*/
var groupAnagrams = function (strs) {
    const len = strs.length, ans = new Map()
    for (let i = 0; i < len; i++) {
        let asc = strs[i].split('').map(c => c.charCodeAt()).sort().join()
        if (ans.has(asc)) {
            ans.get(asc).push(strs[i])
        } else {
            ans.set(asc, [strs[i]])
        }
    }
    return Array.from(ans.values())
};
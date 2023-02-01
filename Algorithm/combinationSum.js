/** 组合总和
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
/**
 * 解析
 * 通过递归，每次判断是否取当前值
*/
var combinationSum = function (candidates, target) {
    let ans = [], len = candidates.length

    const dfs = (target, combins, idx) => {
        if (idx == len) return;
        if (target == 0) {
            ans.push(combins)
            return;
        }
        dfs(target, [...combins], idx + 1) //不使用当前值
        if (target - candidates[idx] >= 0) {    // 使用当前值
            dfs(target - candidates[idx], [...combins, candidates[idx]], idx)
        }
    }
    dfs(target, [], 0)
    console.log(ans)
};

var candidates = [2, 3, 6, 7], target = 7
combinationSum(candidates, target)
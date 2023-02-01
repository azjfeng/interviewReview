/** 组合总和2
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function (candidates, target) {
    let ans = [], len = candidates.length;
    if (len == 0) return []
    candidates.sort((a, b) => a - b)
    const dfs = (target, combins, idx) => {
        if (target == 0) {
            ans.push(combins);
            return
        }
        for (var i = idx; i < len; i++) {
            if (candidates[idx] > target) break;
            if (i > idx && candidates[i] == candidates[i - 1]) continue;
            if (combins.length !== 0) {
                if (combins[combins.length - 1] <= candidates[i]) {
                    //判断该次选择是否会导致路径重复
                    combins.push(candidates[i]);
                    dfs(target - candidates[i], [...combins], i + 1);
                    combins.pop();
                } else {
                    continue;
                }
            } else {
                combins.push(candidates[i])
                dfs(target - candidates[i], [...combins], i + 1)
                combins.pop()
            }
        }
    }
    dfs(target, [], 0)
    console.log(ans)
};

var candidates = [10, 1, 2, 7, 6, 1, 5], target = 8;
combinationSum2(candidates, target)
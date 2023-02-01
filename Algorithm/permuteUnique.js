/**
 * 全排列二
 * @param {number[]} nums
 * @return {number[][]}
 */
var permuteUnique = function (nums) {
    nums.sort((a, b) => a - b);
    var ans = [];
    var tmp = []
    const dfs = (used) => {
        if (tmp.length == nums.length) {
            ans.push(tmp.slice())
            return
        }

        for (var i = 0; i < nums.length; i++) {
            if (i > 0 && nums[i] == nums[i - 1] && !used[i - 1]) continue
            if (!used[i]) {
                tmp.push(nums[i])
                used[i] = true
                dfs(used)
                tmp.pop()
                used[i] = false
            }
        }
    }
    dfs([])
    return ans
};

var nums = [1, 1, 2];
console.log(permuteUnique(nums))
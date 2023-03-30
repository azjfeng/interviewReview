/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permuteUnique = function (nums) {
  var ans = []
  nums = nums.sort((a, b) => a - b)
  var path = []
  const dfs = (used) => {             //  used 使用一个空数组存储已经用过的值
    if (path.length == nums.length) {
      ans.push(path.slice())
      return
    }
    for (let i = 0; i < nums.length; i++) {
      if (i > 0 && nums[i] == nums[i - 1] && !used[i - 1]) continue;   // 如果值用过了直接退出
      if (!used[i]) {                                             //用过没有用过就push进去
        path.push(nums[i])
        used[i] = true;
        dfs(used)                                                 // 继续递归
        path.pop();
        used[i] = false

      }

    }
  }
  dfs([])
  return ans;
};

console.log(permuteUnique([1, 1, 2]))
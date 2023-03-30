/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permuteUnique = function(nums) {
    var ans = []
    var path = []
    nums = nums.sort((a, b) => a - b)
    const dfs = (used)=>{
        if(path.length === nums.length){
            ans.push(path.slice())
            return
        }
        // used[i - 1] == true，说明同⼀树⽀nums[i - 1]使⽤过
        // used[i - 1] == false，说明同⼀树层nums[i - 1]使⽤过
        // 如果同⼀树层nums[i - 1]使⽤过则直接跳过

        for (let i = 0; i < nums.length; i++) {
            if(i > 0 && nums[i] == nums[i-1] && !used[i-1]) continue
            if(!used[i]){
                path.push(nums[i])
                used[i] = true
                dfs(used)
                path.pop()
                used[i] = false
            }
        }
    }
    dfs([])
    return ans
};
console.log(permuteUnique([1,1,2]))
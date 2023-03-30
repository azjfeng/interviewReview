/**
 * @param {number[]} nums
 * @return {number}
 */
var jump = function (nums) {
    let count = 0;
    let len = nums.length;
    let max = 0;
    let end = 0
    for (var i = 0; i < len-1; i++) {
        max = Math.max(max, i+nums[i])
        if(i == end){
            end = max;
            count++
        }
    }
    return count
};

var nums = [2, 3, 1, 1, 4];

console.log(jump(nums));
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumClosest = function (nums, target) {
    nums.sort((a, b) => a - b);

    let result = Number.MIN_SAFE_INTEGER;
    let len = nums.length;
    for (var i = 0; i < len; i++) {
        let left = i + 1
        let right = len - 1
        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];
            // console.log(Math.abs(result - target) , Math.abs(sum - target) )
            result = Math.abs(result - target) > Math.abs(sum - target) ? sum: result
            if (sum == target) {
                left++
                right --
            } else if (sum > target) {
                right--
            } else {
                left++
            }
        }
    }
    console.log(result)
    return result
};

const nums = [4,0,5,-5,3,3,0,-4,-5], target = -2

console.log(threeSumClosest(nums, target))
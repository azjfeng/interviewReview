/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
    if(nums.length<3) return [];
    nums = nums.sort((a, b) => a - b)
    console.log(nums)
    let ans = []
    let left = 0, right = nums.length-1
    let i = 1
    while(left < right){
        if((nums[left] + nums[right] + nums[i] === 0) && i != right){
            ans.push([nums[left],nums[right],nums[i]])
            left++
            right --
        }else if(nums[left] + nums[right] + nums[i] > 0){
            i--
        }else if(nums[left] + nums[right] + nums[i] < 0){
            i++
        }
    }
    console.log(ans);
};

const nums = [-1,0,1,2,-1,-4]

threeSum(nums);
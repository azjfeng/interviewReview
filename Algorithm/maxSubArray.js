/**
 * @param {number[]} nums
 * @return {number}
 */
/**
 * @param {number} pre 每个数累加之后值和当前元素对比取最大值，就做到了节点移动
*/
var maxSubArray = function (nums) {
    let pre = 0, maxAns = nums[0];
    nums.forEach((x) => {
        pre = Math.max(pre + x, x);
        maxAns = Math.max(maxAns, pre);
    });
    return maxAns;
};

const nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
console.log(maxSubArray(nums))
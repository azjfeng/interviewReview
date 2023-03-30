/**
 * @param {number[]} nums
 * @return {boolean}
 */
/**
 *  给定一个非负整数数组 nums ，你最初位于数组的 第一个下标 。
    数组中的每个元素代表你在该位置可以跳跃的最大长度。
    判断你是否能够到达最后一个下标。
*/
var canJump = function (nums) {      //只需要判断当前位置能否跳到最后即可.每走一步就判断这一步的范围中的值能否到达最后
    if (nums.length === 1) return true
    let cover = 0
    for (let i = 0; i <= cover; i++) {
        if (i <= cover) {
            cover = Math.max(cover, i + nums[i])
            if (cover >= nums.length - 1) {
                return true
            }
        } else {
            return false
        }
    }
    return false
};
console.log(canJump([0, 2, 3]))
var height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1];
/**
 * @param {number[]} height
 * @return {number}
 */
/**
 * 接雨水
 * 算法解析
 * 左右指针移动，同时比较左右最大值，当有差值得时候就计算差值
*/
var trap = function (height) {
    var left = 0, right = height.length - 1
    var leftMax = 0, rightMax = 0;
    var res = 0
    while (left < right) {
        var leftVal = height[left], rightVal = height[right];
        if (leftVal <= rightVal) {
            left++
            if (leftVal > leftMax) {
                leftMax = leftVal
            } else {
                res += leftMax - leftVal
            }
        } else {
            right--
            if (rightVal > rightMax) {
                rightMax = rightVal
            } else {
                res += rightMax - rightVal
            }
        }
    }
    return res
};

console.log(trap(height))
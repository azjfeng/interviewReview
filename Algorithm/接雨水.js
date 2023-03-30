/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function(height) {
let left = 0, right = height.length - 1; //左右指针
let leftMax = 0, rightMax = 0;       //左右最大高度
let res = 0;
while (left < right) {
    ////左右值
    const leftVal = height[left];
    const rightVal = height[right];
    //左值小 让左指针右移； 否则右值小 右指针左移；
    if (leftVal <= rightVal) {
        left++;
        // 如果左值大于左边最大值； 更新左边最大值； 
        if (leftVal > leftMax) {
            leftMax = leftVal;
        } else if (leftVal < leftMax) { //否则如果左值小于左边最大值； 结果res加上 左边最大值减去左值；
            res += leftMax - leftVal;
        }
    } else {
        right--;
        // // 如果右值大于右边最大值； 更新右边最大值； 
        if (rightVal > rightMax) {
            rightMax = rightVal;
        } else if (rightVal < rightMax) { //否则如果右值小于右边最大值； 结果res加上 右边最大值减去右值；
            res += rightMax - rightVal;
        }
    }
}
return res;
}
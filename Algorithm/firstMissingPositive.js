/**
 * 缺失得第一个正数
 * @param {number[]} nums
 * @return {number}
 */
/**
 * 解析
 * 通过一次循环加while把位置上得值与实际值不相同得两两交换，类似下表为1 ，但是值为3 就将nums[2] 与nums[1]进行交换,然后将所有正值
 * 移动到前面然后排序
*/
var firstMissingPositive = function (nums) {
    for (var i = 0; i < nums.length; i++) {
        while (nums[i] > 0 && nums[i] <= nums.length && nums[nums[i] - 1] != nums[i]) {
            const tmp = nums[nums[i] - 1];
            nums[nums[i] - 1] = nums[i];
            nums[i] = tmp
        }
    }
    console.log(nums)
    for (var i = 0; i < nums.length; i++) {
        if (nums[i] != i + 1) {
            return i + 1
        }
    }
    return nums.length + 1
};

var nums = [7,3,1];
console.log(firstMissingPositive(nums))
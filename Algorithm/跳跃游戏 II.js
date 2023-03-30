/**
 * @param {number[]} nums
 * @return {number}  贪心算法，假设每一步都走全
 */
var jump = function(nums) {
    var curIndex = 0;
    var nextIndex = 0;
    var steps = 0
    for (let i = 0; i < nums.length -1; i++) {
        nextIndex = Math.max(nums[i]+i,nextIndex)      //计算最每一步的落点
        if(i === curIndex){                            //当走到了最后一步步数就加一
            curIndex = nextIndex
            steps ++
        }
    }
    return steps
};
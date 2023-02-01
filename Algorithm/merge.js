/**
 *题目：合并区间
 * @param {number[][]} intervals
 * @return {number[][]}
 */
// 先将数组排序，在判断判断当前元素是否在前一个元素的区间，如果在就合并，不在就直接插入，并且替换pre
var merge = function (intervals) {
    if (intervals.length === 1) return intervals;
    intervals.sort((a,b)=>a[0]-b[0])
    // console.log(intervals);
    let ans = [], pre = intervals[0];
    var left, right;
    for (var i = 1; i < intervals.length; i++) {
        let tmp = intervals[i]
        if (tmp[0] >= pre[0] && tmp[0] <= pre[1]){
            left = Math.min(tmp[0], pre[0])
            right= Math.max(tmp[1], pre[1])
            pre = [left, right];
        }else{
            ans.push(pre);
            pre = intervals[i];
        }
    }
    ans.push(pre);
    return ans;
};

// var intervals = [[1, 3], [2, 6], [8, 10], [15, 18]];
var intervals = [[1,4],[4,5]]
// var intervals = [[1,4],[0,4]]
// var intervals = [[1,4],[0,1]]
// var intervals = [[1,4],[2,3]]
console.log(merge(intervals));
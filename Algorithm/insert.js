/**
 * 题目： 插入区间
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
// 更合并一样，插入之后进行排序，然后在合并
var insert = function (intervals, newInterval) {
    if (intervals.length === 0) return [newInterval];
    intervals.push(newInterval);
    intervals.sort((a,b)=>a[0]-b[0])
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

var intervals = [[1, 3], [6, 9]], newInterval = [2, 5];
// var intervals = [[1, 2], [3, 5], [6, 7], [8, 10], [12, 16]], newInterval = [4, 8]
console.log(insert(intervals, newInterval));

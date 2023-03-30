/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */

//  无范围
// 数只能使用一次
var combinationSum2 = function (candidates, target) {
    let res = [];
    let len = candidates.length;

    if (len <= 0) return res;

    candidates.sort((a, b) => a - b);
    backTrack([], target, 0);
    return res;

    function backTrack(track, target, startIndex) {
        if (target === 0) {
            //终止条件
            res.push(track.slice());
            return;
        }

        for (let i = startIndex; i < candidates.length; i++) {
            if (candidates[i] > target) {
                //target决定取值范围
                break;
            }

            //增加的代码
            if (i > startIndex && candidates[i] == candidates[i - 1]) continue;
            //使得该次选择，在【合法范围】内，
            //1.相同的值只能选唯一一个【去重】
            //2.且是第一个【不影响该路径后续backTrack选择值相同的数】

            if (track.length !== 0) {
                if (track[track.length - 1] <= candidates[i]) {
                    //判断该次选择是否会导致路径重复
                    track.push(candidates[i]);
                    backTrack(track, target - candidates[i], i + 1);
                    track.pop();
                } else {
                    continue;
                }
            } else {
                track.push(candidates[i]);
                backTrack(track, target - candidates[i], i + 1);
                track.pop();
            }
        }
    }
};

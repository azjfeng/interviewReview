var combinationSum = function (candidates, target) {  //每一次递归必须同时判断是否继续使用当前数
  var ans = [], len = candidates.length;      //设置存储数组和原数组长度
  var dfs = (target, combins, idx) => {       //设置递归函数（目标值， 目标数组， 元素组开始下标）
    // console.log(idx)
    if (idx == len) return;                   //如果已经到了最后一个值还没满足就退出递归
    if (target == 0) {                        //如果目标值为空了，判断当前数组符合要求
      ans.push(combins)
      return;
    }
    dfs(target, combins, idx + 1)             //选择不继续使用第idx这个数
    if (target - candidates[idx] >= 0) {      //当前剩余值减去数组下标值不为空时，将两数相减继续递归
      dfs(target - candidates[idx], [...combins, candidates[idx]], idx)   //选择继续使用第idx这个数
    }
  }
  dfs(target, [], 0)
  return ans
}

console.log(combinationSum([2, 3, 6, 7], 7))

//剪枝写法
const combinationSum = (candidates, target) => {
  const res = [];
  const dfs = (start, temp, sum) => { // start是当前选择的起点索引 temp是当前的集合 sum是当前求和
    if (sum >= target) {
      if (sum == target) {
        res.push(temp.slice()); // temp的拷贝 加入解集
      }
      return;   // 结束当前递归
    }
    for (let i = start; i < candidates.length; i++) { // 枚举当前可选的数，从start开始
      temp.push(candidates[i]);          // 选这个数
      dfs(i, temp, sum + candidates[i]); // 基于此继续选择，传i，下一次就不会选到i左边的数
      temp.pop();   // 撤销选择，回到选择candidates[i]之前的状态，继续尝试选同层右边的数
    }
  };
  dfs(0, [], 0); // 最开始可选的数是从第0项开始的，传入一个空集合，sum也为0
  return res;
};


//去重
/*
* @param {number[]} candidates
* @param {number} target
* @return {number[][]}
*/
//  数字可重复，全为正整数
var combinationSum = function (candidates, target) {
  let res = []
  let len = candidates.length
  if (len <= 0) return res

  candidates.sort((a, b) => a - b)//从小到大排序

  if (candidates[0] > target) return res //特殊，arr[0]>target

  backTrack([], target)
  return res

  function backTrack(track, target) {
    if (target === 0) {//终止条件
      res.push(track.slice())
      return
    }

    for (let num of candidates) {
      if (num > target) {//target决定取值范围
        break
      }

      //注意去重，【2,2,3】【2,3,2】不难发现,这一位>=上一位
      if (track.length !== 0) {
        if (num >= track[track.length - 1]) {//判断该选择是否导致路径重复
          track.push(num)
          backTrack(track, target - num)
          track.pop()
        } else {//continue
          continue
        }
      } else {//track无元素
        track.push(num)
        backTrack(track, target - num)
        track.pop()
      }

    }

  }
};

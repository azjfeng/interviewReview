/** 
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 * 三数之和最接近目标值的和
*/

function threeSumClosest(nums,target){
    let len = nums.length;
    if(len === 3){
        return getNums(nums)
    }
    nums.sort((a,b)=>a-b);
    let res ;
    let min = Infinity;
    for (let i = 0; i <= nums.length -3; i++) {
        let basic = nums[i];
        let left = i + 1;
        let right = len - 1;

        while (left < right) {
            let sum = basic + nums[left] + nums[right];
            let diff = Math.abs(sum - target);
            if(diff < min){
                min = diff
                res = sum
            }
            if(sum < target){
                left++
            }else if(sum > target){
                right--
            }else{
                return sum
            }
        }
    }
    return res
}
console.log(threeSumClosest([-1,2,1,-4],1))
function getNums(nums){
    return nums.reduce((total,cur)=>total+cur,0)
}
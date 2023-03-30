/**
 * @param {number[]} nums
 * @return {number}
 */
 var firstMissingPositive = function(nums) {
    for(let i = 0; i < nums.length; i++){
        // 每循环一次就递归一次
      	//循环nums，当前元素在(0,nums.lenght]之间，并且nums[nums[i]-1] != nums[i]，则交换位置 ，将负数交换到最后将其他的非负数进行排序
        while(nums[i] > 0 && nums[i] <= nums.length && nums[nums[i]-1] != nums[i] ){
            const temp = nums[nums[i]-1];
            nums[nums[i]-1] = nums[i];
            nums[i] = temp;
        }
    }
    console.log(nums)
    for(let i = 0; i < nums.length; i++){//循环交换位置之后的数组，判断第一个缺失的正数
        if(nums[i] != i+1){
            return i+1;
        }
    }
		// [1,2,3]
    return nums.length + 1;

};
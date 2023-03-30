
/**
 * 成功
*/
var maxArea = function (height) {
    var left = 0, right = height.length - 1;
    var max = Number.MIN_SAFE_INTEGER;

    while (left < right) {
        console.log(height[left], height[right])
        let mHeight = Math.min(height[left], height[right]);
        max = Math.max(max, mHeight * (right - left))

        if (height[left] > height[right]) {
            right--
        }else if(height[left] < height[right]){
            left++
        }else{
            left ++
            right--
        }
    }
    console.log(max)
};

maxArea([1, 2, 4, 3])
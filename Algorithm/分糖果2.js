/**
 * @param {number} candies
 * @param {number} num_people
 * @return {number[]}
 */
var distributeCandies = function(candies, num_people) {
    var t = 1,num = num_people;
    var arr = new Array(num).fill(0)
    while(candies !== 0){
        for(var i = 1 ;i<= num; i++){
            var count = num * (t - 1) + i;
            var j = (i- 1) % num;
            console.log(count , j)
            // console.log(count, 'count', candies)
            if(candies >= count){
                arr[j] += count
                candies -= (count)
            }else{
                arr[j] += candies
                candies = 0
            }
            if(i == num) {
                t++
            }
        }
    }
    return arr
};
console.log(distributeCandies(10 ,3))
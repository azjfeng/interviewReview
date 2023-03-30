/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function(matrix) {
    if(matrix.length == 0) return []
    let left = 0, top = 0;
    let right = matrix[0].length - 1, bottom = matrix.length-1;
    let res = []
    while(top < bottom && left < right){
        for(var i = left; i< right ;i++){
            res.push(matrix[top][i])
        }
        for(var i = top; i< bottom ;i++){
            res.push(matrix[i][right])
        }
        for(var i = right; i> left;i--){
            res.push(matrix[bottom][i])
        }
        for(var i = bottom; i> top;i--){
            res.push(matrix[i][left])
        }
        left++
        right--
        top++
        bottom--
    }
    if(top == bottom){
        for(var i = left;i<=right;i++){
            res.push(matrix[top][i])
        }
    }else{
        for(var i = top;i<=bottom;i++){
            res.push(matrix[i][left])
        }
    }
    console.log(res)
};

var matrix = [[1,2,3],[4,5,6],[7,8,9]]
spiralOrder(matrix)
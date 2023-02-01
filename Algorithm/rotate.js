/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function (matrix) {
    var len = matrix.length;
    for (var i = 0; i < Math.floor(len / 2); i++) {
        for (var j = 0; j < Math.floor((len+1)/2); j++) {
            const tmp = matrix[i][j]
            matrix[i][j] = matrix[len-j-1][i];
            matrix[len-j-1][i] = matrix[len-i-1][len-j-1];
            matrix[len-i-1][len-j-1] = matrix[j][len-i-1];
            matrix[j][len-i-1] = tmp
        }
    }
    console.log(matrix)
};

var matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];

rotate(matrix)
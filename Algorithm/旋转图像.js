/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
/**
 * 给定一个 n × n 的二维矩阵 matrix 表示一个图像。请你将图像顺时针旋转 90 度。
 * 你必须在 原地 旋转图像，这意味着你需要直接修改输入的二维矩阵。请不要 使用另一个矩阵来旋转图像。
 * 
*/

// 旋转之后[row][col]->[col][len - row - 1]

var rotate = function(matrix) {
    /**
     * 辅助数组写法
    */
    // var len1 = matrix.length
    // var arr = JSON.parse(JSON.stringify(matrix))
    // for (let i = 0; i < len1; i++) {
    //     for (let j = 0; j < len1; j++) {
    //         matrix[j][len1 -i -1] = arr[i][j]           //旋转90度，相当于将二维数组得Y赋值X，x等于数组长度-i-1
    //     }

    // }

    /**
     * 无辅助数组写法
    */
    const n = matrix.length;
    for (let i = 0; i < Math.floor(n / 2); ++i) {
        for (let j = 0; j < Math.floor((n + 1) / 2); ++j) {
            const temp = matrix[i][j];
            matrix[i][j] = matrix[n - j - 1][i];
            matrix[n - j - 1][i] = matrix[n - i - 1][n - j - 1];
            matrix[n - i - 1][n - j - 1] = matrix[j][n - i - 1];
            matrix[j][n - i - 1] = temp;
        }
    }


    return matrix
};

console.log(rotate([[1,2,3],[4,5,6],[7,8,9]]))
// console.log(rotate([[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]))
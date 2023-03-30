/**
 * 螺旋矩阵
 * 
 * 题目: 给你一个 m 行 n 列的矩阵 matrix ，请按照 顺时针螺旋顺序 ，返回矩阵中的所有元素。
*/

// 输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]
// 输出：[1,2,3,6,9,8,7,4,5]
/**
 * @param {number[][]} matrix
 * @return {number[]}
 */

/**
 * 解题思路： 先算出四个顶角得位置循环push数据
*/
var spiralOrder = function (matrix) {
    if (matrix.length == 0) return [];
    var left = 0, top = 0;
    var right = matrix[0].length - 1
    var bottom = matrix.length - 1
    var res = []
    while (left < right && top < bottom) {
        for (let i = left; i < right; i++) {
            res.push(matrix[top][i])
        }
        for (let i = top; i < bottom; i++) {
            res.push(matrix[i][right])
        }
        for (let i = right; i > left; i--) {
            res.push(matrix[bottom][i])
        }
        for (let i = bottom; i > top; i--) {
            res.push(matrix[i][left])
        }
        left++
        right--
        top++
        bottom--
    }
    if (top == bottom) {
        // 剩下一行，从左到右依次添加
        for (let i = left; i <= right; i++) {
            res.push(matrix[top][i]);
        }
    } else if (left == right) {
        // 剩下一列，从上到下依次添加
        for (let i = top; i <= bottom; i++) {
            res.push(matrix[i][left]);
        }
    }
    console.log(res)
    return res

    // if (matrix.length == 0) return [];
    // const res = [];
    // // 分别代表上下左右
    // let top = 0;
    // let bottom = matrix.length - 1;
    // let left = 0;
    // let right = matrix[0].length - 1;

    // while (top < bottom && left < right) {
    //     for (let i = left; i < right; i++) res.push(matrix[top][i]); // 上行  注意这里是<right 而不是<=right
    //     for (let i = top; i < bottom; i++) res.push(matrix[i][right]); // 右列  注意这里是<bottom 而不是<=bottom
    //     for (let i = right; i > left; i--) res.push(matrix[bottom][i]); // 下行  注意这里是<left 而不是<=left
    //     for (let i = bottom; i > top; i--) res.push(matrix[i][left]); // 左列  注意这里是<top 而不是<=top
    //     right--;
    //     top++;
    //     bottom--;
    //     left++;
    // }
    // if (top == bottom) {
    //     // 剩下一行，从左到右依次添加
    //     for (let i = left; i <= right; i++) {
    //         res.push(matrix[top][i]);
    //     }
    // } else if (left == right) {
    //     // 剩下一列，从上到下依次添加
    //     for (let i = top; i <= bottom; i++) {
    //         res.push(matrix[i][left]);
    //     }
    // }
    // return res;

};
console.log(spiralOrder([[1, 2, 3], [4, 5, 6], [7, 8, 9]]))
/**
 * @param {number} numRows
 * @return {number[][]}
 * 杨辉三角1
 */
var generate = function (numRows) {
    var dp = []
    if(numRows == 1){
        return [[1]]
    }
    for (var i = 0; i < numRows; i++) {
        dp[i] = []
        for (var j = 0; j <= i; j++) {
            if (i == 0 || j == 0) {
                dp[i][j] = 1
            }else{
                console.log(i, j)
                dp[i][j] = (dp[i - 1][j - 1] || 0) + (dp[i - 1][j] || 0)
            }

        }
    }
    return dp
};

console.log(generate(5))
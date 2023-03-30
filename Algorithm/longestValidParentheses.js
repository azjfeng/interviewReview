/**
 * @param {string} s
 * @return {number}
 */
var longestValidParentheses = function (s) {
    let stack = [-1];
    let maxans = 0;
    for (let i = 0; i < s.length; i++) {
        if (s.charAt(i) == '(') {
            stack.push(i);
        } else {
            stack.pop();
            if (stack.length == 0) {
                stack.push(i);
            } else {
                const curMaxLen = i - stack[stack.length - 1];
                maxans = Math.max(maxans, curMaxLen);
            }
        }
    }
    console.log(maxans)
    return maxans;
};


let s = "()";
longestValidParentheses(s);

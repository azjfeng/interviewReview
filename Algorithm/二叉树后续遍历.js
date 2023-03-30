/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var postorderTraversal = function(root) {
    var arr = []
    const tree = (root, arr)=>{
        if(root == null) return ;
        tree(root.right,arr)
        tree(root.left, arr)
        arr.push(root.val)
    }
    tree(root,arr)
    return arr
};
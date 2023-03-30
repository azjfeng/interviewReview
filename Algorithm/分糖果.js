/**
 * @param {number[]} candyType
 * @return {number}
 */
var distributeCandies = function (candyType) {
    const res = new Set(candyType)
    return Math.min(res.size, candyType.length / 2)
};
console.log(distributeCandies([[1, 1, 2, 2, 3, 3]]))
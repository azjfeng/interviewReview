
function quickSort(arr, startIndex = 0) {
    if (arr.length <= 1) return arr;
    const right = [],
        left = [],
        startNum = arr.splice(startIndex, 1)[0];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < startNum) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    return [...quickSort(left), startNum, ...quickSort(right)];
}


console.log(quickSort([1, 3, 4, 56, 2, 34, 566]));

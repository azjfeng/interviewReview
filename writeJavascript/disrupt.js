// function disrupt(arr) {
//     return arr.sort((a, b) => { return Math.random() - 0.5 })
// }


function disrupt(a) {
    let tmp = 0;

    for (let i = 0; i < a.length; i++) {
        for (let j = 0; j < a.length; j++) {
            tmp = Math.random() * 10;
            tmp = Math.floor(tmp);
            if (j + tmp < a.length) {
                [a[j], a[j + tmp]] = [a[j + tmp], a[j]];
            }
        }
    }
    return a
}

console.log(disrupt([2, 3, 1, 4, 5, 6]))
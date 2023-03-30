const arr1 = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2']
const arr2 = ['A', 'B', 'C', 'D']

function myConcat(arr1, arr2){
    let index = 0
    let arr = []
    for (let i = 0; i < arr1.length; i++) {
        if(i % 2 == 1){
            arr.push(arr1[i])
            arr.push(arr2[index])
            index++
        }else{
            arr.push(arr1[i])
        }
    }
    return arr
}
console.log(myConcat(arr1, arr2))
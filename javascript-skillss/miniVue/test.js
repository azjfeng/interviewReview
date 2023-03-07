
function pkg(arr){
   for(var i = 0; i< arr.length ; i++){
        if(i < arr.length - 1){
            if(Object.keys(arr[i].dependencies)[0] !== arr[i+1].name){
                return false
            }else if(Object.keys(arr[i+1].dependencies)[0] = arr[i].name ){
                return true
            }
        }else{
            if(Object.keys(arr[i].dependencies)[0]!== arr[0].name ){
                return false
            }
        }
   }
   return true
}

const arr = [
    {
      "name": "a",
      "dependencies": {
        "b": "^1.0.0"
      }
    },
    {
      "name": "b",
      "dependencies": {
        "c": "^1.0.0"
      }
    },
    {
      "name": "c",
      "dependencies": {
        "b": "^1.0.0"
      }
    }
  ]

console.log(pkg(arr))
const fs  = require("fs");
const path = require("path");

const dirpath = path.join(__dirname, '../page')

function reduceDir(root, parse){
    const info = fs.statSync(root)
    if(!info.isDirectory()){
        if(root.indexOf('wxml') != -1){
            parse(root)
        }
        return
    }
    fs.readdir(root, (err, files)=>{
        if(err) throw err;
        // console.log(files);
        files.forEach(element => {
            reduceDir(`${root}/${element}`, parse)
        });
        // const info = fs.statSync(root+'/'+files[0])
        // console.log("info", info.isDirectory())
    });
    
}
// reduceDir(dirpath)

module.exports = {
    reduceDir
}
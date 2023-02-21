/**
 * vite 插件格式
*/
import fs from 'fs';
import path from 'path';

export default function viteCleanHtml(): any {
    return {
        // 插件名称
        name: 'vite-clean-html',

        // pre 会较于 post 先执行
        enforce: 'pre', // post

        // 指明它们仅在 'build' 或 'serve' 模式时调用
        apply: 'build', // apply 亦可以是一个函数

        config(config, { command }) {
        },

        configResolved(resolvedConfig) {
            console.log('这里是configResolved钩子');
        },

        configureServer(server) {
            console.log('这里是configureServer钩子');
        },

        transformIndexHtml(html) {
            console.log('这里是transformIndexHtml钩子');
            function emptyDir(path){
                const files = fs.readdirSync(path);
                files.forEach(file=>{
                    const filepath = `${path}/${file}`;
                    const stats = fs.statSync(filepath);
                    if(stats.isDirectory()){
                        emptyDir(filepath)
                    }else{
                        fs.unlinkSync(filepath)
                    }
                })
            }
            emptyDir(path.join(__dirname,'../dist'))
        },
    }
}
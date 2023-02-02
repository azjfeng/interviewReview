// worker.js
console.log('WORKER TASK: ', 'running');
// 监听事件
onmessage = function (e) {
    console.log('WORKER TASK: ', 'RECEIVE', e.data);
    // 发送数据事件
    postMessage('Hello, I am Worker');
}
// 或者使用 addEventListener 来监听事件
//addEventListener('message', function (e) {
//  console.log('WORKER TASK: ', 'RECEIVE', e.data);
//  ...
//});
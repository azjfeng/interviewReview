var audio = document.querySelector("audio");
var canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
function initCanvas() {
    //初始化canvas
    canvas.width = window.innerWidth * devicePixelRatio;
    canvas.height = (window.innerHeight / 2) * devicePixelRatio;
}
initCanvas();
let analyser, dataArray, isInit;
audio.onplay = function () {
    //创建一个音频上下文实例
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    //添加一个音频源节点
    const source = audioCtx.createMediaElementSource(audio);
    //分析器节点
    analyser = audioCtx.createAnalyser();
    //fft分析器  越大 分析越细
    analyser.fftSize = 512;
    //创建一个无符号字节的数组
    dataArray = new Uint8Array(analyser.frequencyBinCount);
    //音频源节点 链接分析器
    source.connect(analyser);
    //分析器链接输出设备
    analyser.connect(audioCtx.destination);
    isInit = true;
};

function draw() {
    requestAnimationFrame(draw);
    if (!isInit) {
        return;
    }
    const { width, height } = canvas;
    ctx.clearRect(0, 0, width, height);
    //分析器节点分析出的数据到数组中
    ctx.fillStyle = "#78C5F7";
    ctx.lineWidth = 2;
    ctx.beginPath();
    //getByteFrequencyData，分析当前音频源的数据 装到dataArray数组中去
    //获取实时数据
    analyser.getByteFrequencyData(dataArray);
    console.log(dataArray);
    const len = dataArray.length;
    const barWidth = width / len;
    let x = 0;
    for (let i = 0; i < len; i++) {
        const data = dataArray[i];
        const barHeight = (data / 255) * height;

        ctx.fillRect(x, height - barHeight, barWidth, height)

        // let v = dataArray[i] / 128.0;
        // let y = (v * height) / 2;

        // if (i === 0) {
        //     ctx.moveTo(x, y);
        // } else {
        //     ctx.lineTo(x, y);
        // }

        x += barWidth;
    }
    // ctx.lineTo(canvas.width, canvas.height/2);
    ctx.stroke();
}
draw();

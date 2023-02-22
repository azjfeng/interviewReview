const app = getApp()
let pageX = 0;
let pageY = 0
Page({
  data: {
    arr: [],
    triggered: false,
    slide: 0
  },
  onReady: function () {
    const arr = []
    for (let i = 0; i < 100; i++) arr.push(i)
    this.setData({
      arr
    })

    setTimeout(() => {
      this.setData({
        triggered: true,
      })
    }, 1000)
  },

  onPulling(e) {
    console.log('onPulling:', e)
  },

  onRefresh() {
    if (this._freshing) return
    this._freshing = true
    setTimeout(() => {
      this.setData({
        triggered: false,
      })
      this._freshing = false
    }, 3000)
  },

  onRestore(e) {
    console.log('onRestore:', e)
  },

  onAbort(e) {
    console.log('onAbort', e)
  },
  touchStart(e){
    console.log(e.currentTarget.dataset.index)
    pageX = e.touches[0].pageX
    pageY = e.touches[0].pageY
    this.setData({
      pageX,
      pageY
    })
    console.log(e.touches)
  },
  touchmove(e){
    console.log(e.touches)
  }
})

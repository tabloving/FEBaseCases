const audio = document.getElementById('audio')
const control = document.getElementsByClassName('audio_icon')[0]
const img = document.getElementsByClassName('icon_trigger')[0]

window.onload = function () {
  // 初始化音量
  if(audio) {
    audio.volume = 0.6;
  }

  // 以下逻辑为toTop控件处理
  let timer = null;
  let isTop = true;

  let obtn = document.getElementsByClassName('to_top')[0];
  obtn.onclick = function () {
    timer = setInterval(function () {
      let osTop = document.documentElement.scrollTop || document.body.scrollTop;
      let isSpeed = Math.floor(-osTop / 6);
      document.documentElement.scrollTop = document.body.scrollTop = osTop + isSpeed;
      if (osTop == 0) {
        clearInterval(timer);
      }
      isTop = true;   
    }, 30);
  };   

  // 监听滚动事件
  window.onscroll = function () {
    let osTop = document.documentElement.scrollTop || document.body.scrollTop;
    if (osTop >= 200) {
      obtn.style.opacity = '1';
    } else {
      obtn.style.opacity = '0';
    }
    if (!isTop) {
      clearInterval(timer);
    }
    isTop = false;
  };
}

// 音频控制
if(control){
  control.addEventListener('click', function (e) {
    e.preventDefault()
    if (audio.paused) {
      img.src = './assets/img/pause.svg'
      audio.play()
    } else {
      img.src = './assets/img/play.svg'
      audio.pause()
    }
  })
}

// 监听是否播放结束，状态重置
if(audio){
  audio.addEventListener('ended', function () {
    img.src = './assets/img/play.svg'
  })
}
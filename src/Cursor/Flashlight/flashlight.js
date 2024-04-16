let X = 0, Y = 0;
const Light = document.getElementById('flashlight')
document.addEventListener('mousemove', (e) => {
  X = e.clientX
  Y = e.clientY
  Light.style.setProperty('--x', `${X}px`)
  Light.style.setProperty('--y', `${Y}px`)
})

const [min, max] = [5, 20]
let on = true;
document.addEventListener('keyup', (e) => {
  let R = Light.style.getPropertyValue('--r').replace(/\D/g, '')
  if (e.key === '[' && R > min) {
    Light.style.setProperty('--r', `${--R}em`)
  }

  if (e.key === ']' && R < max) {
    on = true
    Light.style.setProperty('--r', `${++R}em`)
  }

  if (e.key === 'l') {
    Light.style.setProperty('--r', `-${min - 1}em`)
    on = false
  }
})


// 显示面板
let status = () => on ? '已打开' : '已关闭'
let pos = () => [X, Y]
let getR = () => Light.style.getPropertyValue('--r')
let panel = document.createElement('div')
panel.classList.add('panel')
document.body.appendChild(panel)

let timer = setInterval(() => {
  if (on) {
    panel.classList.remove('close')
  } else {
    panel.classList.add('close')
  }

  panel.innerHTML = `
    <p>横坐标轴：${pos()[0]}
    <p>纵坐标轴：${pos()[1]}
    <p>手电状态：${status()}
    <p>范围半径：${min} ~ ${max}
    <p>当前半径：${getR()} 
    `
});

window.onbeforeunload = () => {
  clearInterval(timer)
}
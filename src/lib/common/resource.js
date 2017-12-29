var baseUrl = __dirname
var plain = new Image()
plain.src = baseUrl + '/image/player.png'

var shot = new Image()
shot.src = baseUrl + '/image/shot.png'

var eshot = new Image()
eshot.src = baseUrl + '/image/eshot.png'

var bg1 = new Image()
bg1.src = baseUrl + '/image/bg1.jpg'

var bg2 = new Image()
bg2.src = baseUrl + '/image/bg2.png'

var bg3 = new Image()
bg3.src = baseUrl + '/image/bg3.jpg'

var head = new Image()
head.src = baseUrl + '/image/head.png'

var hp = new Image()
hp.src = baseUrl + '/image/hp.png'

var ene1 = new Image()
ene1.src = baseUrl + '/image/ene1.png'
var ene2 = new Image()
ene2.src = baseUrl + '/image/ene2.png'
var ene3 = new Image()
ene3.src = baseUrl + '/image/ene3.png'
var ene4 = new Image()
ene4.src = baseUrl + '/image/ene4.png'

var bullet = new Image()
bullet.src = baseUrl + '/image/bullet.png'

var button = new Image()
button.src = baseUrl + '/image/button.png'

var gz = new Image()
gz.src = baseUrl + '/image/gz.png'

var u = new Image()
u.src = baseUrl + '/image/u.png'

var g = new Image()
g.src = baseUrl + '/image/g.png'

var setting = new Image()
setting.src = baseUrl + '/image/setting.png'

var resource = {
  shot: shot,
  bullet: bullet,
  bg: {
    bg1: bg1,
    bg2: bg2,
    bg3: bg3
  },
  hp: hp,
  eshot: eshot,
  plainImg: plain,
  head: head,
  enes: [ene1, ene2, ene3, ene4],
  button: button,
  gz: gz,
  g: g,
  u: u,
  setting: setting
}
export default resource
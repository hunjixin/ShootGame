
var baseUrl =''
var plain = new Image()
plain.src = baseUrl  + require( '../../image/2332.png')

var shot = new Image()
shot.src = baseUrl  + require( '../../image/shot.png')

var eshot = new Image()
eshot.src = baseUrl  + require( '../../image/eshot.png')

var bg1 = new Image()
bg1.src = baseUrl  + require( '../../image/bg1.jpg')

var bg2 = new Image()
bg2.src = baseUrl  + require( '../../image/bg2.png')

var bg3 = new Image()
bg3.src = baseUrl  + require( '../../image/bg3.jpg')

var head = new Image()
head.src = baseUrl  + require( '../../image/head.png')

var hp = new Image()
hp.src = baseUrl  + require( '../../image/hp.png')

var ene1 = new Image()
ene1.src = baseUrl  + require( '../../image/ene1.png')
var ene2 = new Image()
ene2.src = baseUrl  + require( '../../image/ene2.png')
var ene3 = new Image()
ene3.src = baseUrl  + require( '../../image/ene3.png')
var ene4 = new Image()
ene4.src = baseUrl  + require( '../../image/ene4.png')

var bullet = new Image()
bullet.src = baseUrl  + require( '../../image/bullet.png')

var button = new Image()
button.src = baseUrl  + require( '../../image/button.png')

var gz = new Image()
gz.src = baseUrl  + require( '../../image/gz.png')

var u = new Image()
u.src = baseUrl  + require( '../../image/u.png')

var g = new Image()
g.src = baseUrl  + require( '../../image/g.png')

var setting = new Image()
setting.src = baseUrl  + require( '../../image/setting.png')

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

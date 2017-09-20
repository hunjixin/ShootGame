define(['util'], function (util) {
  var plain = new Image()
  plain.src = 'img/2332.png'

  var shot = new Image()
  shot.src = 'img/shot.png'

  var eshot = new Image()
  eshot.src = 'img/eshot.png'

  var bg1 = new Image()
  bg1.src = 'img/bg1.jpg'

  var bg2 = new Image()
  bg2.src = 'img/bg2.png'

  var bg3 = new Image()
  bg3.src = 'img/bg3.jpg'

  var head = new Image()
  head.src = 'img/head.png'

  var hp = new Image()
  hp.src = 'img/hp.png'

  var ene1 = new Image()
  ene1.src = 'img/ene1.png'
  var ene2 = new Image()
  ene2.src = 'img/ene2.png'
  var ene3 = new Image()
  ene3.src = 'img/ene3.png'
  var ene4 = new Image()
  ene4.src = 'img/ene4.png'

  var bullet = new Image()
  bullet.src = 'img/bullet.png'

  var button = new Image()
  button.src = 'img/button.png'

  var gz = new Image()
  gz.src = 'img/gz.png'

  var u = new Image()
  u.src = 'img/u.png'

  var g = new Image()
  g.src = 'img/g.png'

  var setting=new Image()
  setting.src='img/setting.png'

  var resource = {
    shot: shot,
    bullet: bullet,
    bg: {
        bg1:bg1,
        bg2:bg2,
        bg3:bg3
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
    setting:setting
  }
  return resource
})

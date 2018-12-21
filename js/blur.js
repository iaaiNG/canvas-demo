$(() => {
  var canvas = document.getElementById("canvas")
  var ctx = canvas.getContext("2d")
  ctx.lineWidth = 1
  var pic = new Image();
  var r = 80  //1:创建图片对象
  var paint = false
  var data = { x: fn(60, 517), y: fn(60, 300), rot: fn(0, 360) }
  pic.src = "99.jpg";  //2:发送请求并且下载图片
  pic.onload = function () {  //3:图片下载完成，触发事件onload
    resetSet()
  }

  function clipPic(data) {
    ctx.clearRect(0, 0, 577, 360)
    ctx.save()
    // ctx.arc(data.x, data.y, r, 0, 2 * Math.PI)
    drawStar(ctx, (r - 20) / 2, r, data.x, data.y, data.rot)

    ctx.drawImage(pic, 0, 0);
    ctx.restore()
  }
  function clipPic2(data) {

    ctx.save()
    // ctx.arc(data.x, data.y, r, 0, 2 * Math.PI)
    drawStar(ctx, (r - 20) / 2, r, data.x, data.y, data.rot)
    ctx.drawImage(pic, 0, 0);
    ctx.restore()
  }
  function drawStar(cxt, r, R, x, y, rot, borderWidth = 1, borderStyle, fillStyle) {
    cxt.beginPath();
    for (var i = 0; i < 5; i++) {
      cxt.lineTo(Math.cos((18 + 72 * i - rot) / 180 * Math.PI) * R + x, - Math.sin((18 + 72 * i - rot) / 180 * Math.PI) * R + y);
      cxt.lineTo(Math.cos((54 + 72 * i - rot) / 180 * Math.PI) * r + x, - Math.sin((54 + 72 * i - rot) / 180 * Math.PI) * r + y);
    }
    cxt.closePath();
    ctx.clip();
  }
  function fn(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
  }
  function resetSet() {
    r = 596
    data = { x: fn(80, 497), y: fn(80, 280), rot: fn(0, 360) }
    var timer = setInterval(() => {
      r -= 6
      data.rot += 3
      clipPic(data)
      if (r == 80) {
        clearInterval(timer)
      }
    }, 10);
  }
  $('#reset').click(resetSet)
  $('#showPic').click(() => {

    var timer = setInterval(() => {
      r += 10
      data.rot += 3
      clipPic(data)
      if (r / 2 > 577) {
        clearInterval(timer)
      }
    }, 10);
  })
  $('#canvas').mousedown(function (e) {
    paint = true;
  });
  $('#canvas').mouseup(function (e) {
    // paint = false;
  });
  $('#canvas').mousemove(function (e) {
    var mouseX = e.offsetX;
    var mouseY = e.offsetY;

    data = { x: mouseX, y: mouseY, rot: 0 }


    if (paint) {
      clipPic2(data)
    } else {
      clipPic(data)
    }
  });

  $("#canvas").on("touchmove", function (e) {
    e.preventDefault();
    
    var _touch = e.originalEvent.targetTouches[0];
    var x = _touch.pageX;
    var y = _touch.pageY-150;
   
    data = { x, y, rot: 0 }
    console.log(data)
    clipPic2(data)
  });
})
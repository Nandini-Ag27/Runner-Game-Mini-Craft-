sc = 0;
let load = 0;
cross = true;
audio = new Audio("music.mp3");
gameover = new Audio("gameover.mp3");

document.onkeydown = function (e) {
  console.log("key code is :", e.keyCode);
  if (e.keyCode == 38) {
    pl = document.querySelector(".player");
    pl.classList.add("playerani");
    setTimeout(() => {
      pl.classList.remove("playerani");
    }, 700);
  }

  if (e.keyCode == 39) {
    pl = document.querySelector(".player");
    plX = parseInt(window.getComputedStyle(pl, null).getPropertyValue("left"));
    pl.style.left = plX + 120 + "px";
  }
  if (e.keyCode == 37) {
    pl = document.querySelector(".player");
    plX = parseInt(window.getComputedStyle(pl, null).getPropertyValue("left"));
    pl.style.left = plX - 120 + "px";
  }
};

setInterval(() => {
  pl = document.querySelector(".player");
  px = parseInt(window.getComputedStyle(pl, null).getPropertyValue("left"));
  py = parseInt(window.getComputedStyle(pl, null).getPropertyValue("bottom"));

  ob = document.querySelector(".obstacle");
  ox = parseInt(window.getComputedStyle(ob, null).getPropertyValue("left"));
  oy = parseInt(window.getComputedStyle(ob, null).getPropertyValue("bottom"));

  offsetX = Math.abs(px - ox);
  offsetY = Math.abs(py - oy);
  console.log(offsetY);
  if (offsetX < 120 && offsetY < 29) {
    gameover = document.querySelector(".gameover");
    ob = document.querySelector(".obstacle");
    gameover.style.visibility = "visible";
    ob.classList.remove("animateobs");
    audio.pause();
  } else if (cross && offsetX < 120) {
    sc += 1;
    cross = false;
    updatescore(sc);
    setInterval(() => {
      cross = true;
    }, 1000);

    setTimeout(() => {
      anidur = parseFloat(
        window.getComputedStyle(ob, null).getPropertyValue("animation-duration")
      );
      newdur = anidur - 0.1;
      ob.style.animationDuration = newdur + "s";
    }, 600);
  }
}, 100);

function updatescore(sc) {
  score.innerHTML = "Your Score:" + sc;
}

document.addEventListener("DOMContentLoaded", function () {
  play = document.getElementById("play");
  play.addEventListener("click", () => {
    start = document.getElementById("start");
    start.style.visibility = "hidden";
    ob.classList.add("animateobs");
    setTimeout(() => {
      audio.play();
    }, 100);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  btn = document.getElementById("replay");
  start = document.getElementById("start");
  btn.addEventListener("click", () => {
    btn.style.display = "none";
    window.location.reload();
    window.onload=function () {
      start.style.visibility = "hidden";
    }
  });
});

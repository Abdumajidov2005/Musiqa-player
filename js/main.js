const music_list = document.querySelector(".music_list");
const exit_list = document.querySelector(".exit_list");
const qadash = document.querySelector(".qadash");
const body = document.querySelector("body");
const audio = document.querySelector("audio");
const cover = document.querySelector(".cover");
const title = document.querySelector(".title");
const play_btn = document.querySelector(".play_btn");
const next_right = document.querySelector(".next_right");
const next_left = document.querySelector(".next_left");
const music_siljish = document.querySelector(".music_siljish");
const music_siljish_rangi = document.querySelector(".music_siljish_rangi");
const startTime = document.querySelector(".startTime");
const endTime = document.querySelector(".endTime");
const voice = document.querySelector(".voice");
const shuffle = document.querySelector(".shuffle");
const repeat = document.querySelector(".repeat");
const select = document.querySelector(".select");

var index = 0;
var isAgain = false;
var isShuffle = false;

const changeMusic = [
  "May_ichsam",
  "Setoram",
  "Shunday_ketmasmiz",
  "Sog_indim",
  "Xoqon_yagona",
];

const modalMusic = () => {
  music_list.innerHTML = "";
  changeMusic.forEach((item, i) => {
    music_list.innerHTML += `
        <li onclick="listBox(${i})">${item}</li>
        `;
  });
};

modalMusic();

const listBox = (id) => {
  index = id;
  musicPlay();
  audio.play();
  body.classList.add("done");
};

qadash.addEventListener("click", () => {
  body.classList.add("active");
});

exit_list.addEventListener("click", () => {
  body.classList.remove("active");
});

const musicPlay = () => {
  cover.setAttribute("src", `./imgs/${changeMusic[index]}.jpg`);
  audio.setAttribute("src", `./music/${changeMusic[index]}.mp3`);
  title.textContent = changeMusic[index];
  select.textContent = `${index+1}/${changeMusic.length}`
};

musicPlay();

repeat.addEventListener("click", () => {
  isAgain = !isAgain;
  repeat.classList.toggle("done");
});

shuffle.addEventListener("click", () => {
  isShuffle = !isShuffle
  shuffle.classList.toggle("done");
});

audio.addEventListener("ended", () => {
  if (isAgain) {
    musicPlay();
    audio.play();
  } else {
    level();
  }
});

const play = () => {
  if (body.classList.contains("done")) {
    audio.play();
  } else {
    audio.pause();
  }
};

play_btn.addEventListener("click", () => {
  if (body.classList.contains("done")) {
    body.classList.remove("done");
    audio.pause();
  } else {
    5;
    body.classList.add("done");
    audio.play();
  }
});

const level = () => {
  if (isShuffle) {
    index = Math.floor(Math.random() * changeMusic.length);
    musicPlay();
    play();
  } else {
    if (index < changeMusic.length - 1) {
      index++;
    } else {
      index = 0;
    }
    musicPlay();
    play();
  }
}

next_right.addEventListener("click", level);

next_left.addEventListener("click", () => {
  if (index > 0) {
    index--;
  } else {
    index = changeMusic.length - 1;
  }
  musicPlay();
  play();
});

const changeTime = (time) => {
  var minut =
    Math.floor(time / 60) < 10
      ? "0" + Math.floor(time / 60)
      : Math.floor(time / 60);
  var secund =
    Math.floor(time % 60) < 10
      ? "0" + Math.floor(time % 60)
      : Math.floor(time % 60);
  if (isNaN(minut)) {
    return "00:00";
  } else {
    return `${minut}:${secund}`;
  }
};

const timed = (e) => {
  var times = e.srcElement.currentTime;
  var times2 = e.srcElement.duration;
  startTime.textContent = changeTime(times);
  endTime.textContent = changeTime(times2);
  var a = (times * 100) / times2;
  music_siljish_rangi.style.width = `${a}%`;
};

music_siljish.addEventListener("click", (e) => {
  audio.currentTime = (e.offsetX * audio.duration) / music_siljish.clientWidth;
});

voice.addEventListener("input", () => {
  audio.volume = voice.value / 100;
});

audio.addEventListener("timeupdate", timed);

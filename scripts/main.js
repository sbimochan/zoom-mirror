let streaming = false;
let video = null;
let mirrorCamera = null;
let flipVideo = false;

const compliments = [
  "You're an awesome friend.",
  "You're a gift to those around you.",
  "You're a smart cookie.",
  "You are awesome!",
  "I like your style.",
  "You have the best laugh.",
  "I appreciate you.",
  "You are enough.",
  "You're strong.",
  "Your perspective is refreshing.",
  "You light up the room.",
  "You deserve a hug right now.",
  "You should be proud of yourself.",
  "You're more helpful than you realize.",
  "You are really courageous.",
  "Your kindness is a balm to all who encounter it.",
  "You're all that and a super-size bag of chips.",
  "On a scale from 1 to 10, you're an 11.",
  "You are strong.",
  "You're even more beautiful on the inside than you are on the outside.",
  "You have the courage of your convictions.",
  "We are inspired by you.",
  "You are like a ray of sunshine on a really dreary day.",
  "You are making a difference.",
  "You bring out the best in other people.",
];
const subtitle = document.querySelector("#subtitle");
subtitle.innerText =
  "You need to allow webcam access first. We assure you that we don't capture or store any webcam images.";
(function () {
  window.addEventListener("load", startup, false);
})();

function swapSpinnerWithVideo() {
  document.querySelector(".spinner").classList.add("spinner--hidden");
  document
    .querySelector(".gradient-border")
    .classList.remove("gradient-border--hidden");
}

function startup() {
  camArrow = document.getElementsByClassName("camera_arrow")[0];
  video = document.getElementById("video");
  canvas = document.getElementById("canvas");
  mirrorCamera = document.querySelector(".mirror-camera");
  mirrorCamera.addEventListener("click", checkMirrorCamera);

  navigator.mediaDevices
    .getUserMedia({ video: true, audio: false })
    .then(function (stream) {
      video.srcObject = stream;
      video.play();
    })
    .catch(function (err) {
      console.log("An error occurred: " + err);
    });

  video.addEventListener(
    "canplay",
    function (ev) {
      if (!streaming) {
        camArrow.style.display = "none";
        swapSpinnerWithVideo();
        const width = 1024;
        const height = 768;
        let resultHeight = video.videoHeight / (video.videoWidth / width);

        // Firefox currently has a bug where the height can't be read from
        // the video, so we will make assumptions if this happens.

        if (isNaN(resultHeight)) {
          resultHeight = width / (4 / 3);
        } else {
          mirrorCamera.style.display = "block";
          subtitle.innerText = "";
          setTimeout(() => {
            const random = Math.floor(Math.random() * compliments.length);
            subtitle.innerHTML += `<h3>${compliments[random]}</h3> <p><span>&#128076;&#127996;</span>`;
          }, 2500);
        }

        video.setAttribute("width", width);
        video.setAttribute("height", resultHeight);
        streaming = true;
      }
    },
    false
  );
}

function checkMirrorCamera() {
  if (!flipVideo) {
    video.classList.add("flip-video");
    mirrorCamera.style.opacity = "0.8";
    flipVideo = true;
  } else {
    video.classList.remove("flip-video");
    mirrorCamera.style.opacity = "0.4";
    flipVideo = false;
  }
}

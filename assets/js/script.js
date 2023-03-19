"use strict";

/*---------------------------
  ## All Sounds Information
-----------------------------*/

const soundsData = [
  {
    backgroundImage: "./assets/images/poster-1.jpg",
    posterUrl: "./assets/images/poster-1.jpg",
    title: "Happy Moments (Master)",
    album: "No Spirit",
    year: 2022,
    artist: "No Spirit x Tonion",
    soundPath: "./assets/sounds/sound-1.mp3",
  },
  {
    backgroundImage: "./assets/images/poster-2.jpg",
    posterUrl: "./assets/images/poster-2.jpg",
    title: "We Are Going To Be Ok (Master)",
    album: "No Spirit",
    year: 2022,
    artist: "No Spirit x Jhove",
    soundPath: "./assets/sounds/sound-2.mp3",
  },
  {
    backgroundImage: "./assets/images/poster-3.jpg",
    posterUrl: "./assets/images/poster-3.jpg",
    title: "Winter Meadow",
    album: "No Spirit",
    year: 2022,
    artist: "No Spirit x  juniorodeo",
    soundPath: "./assets/sounds/sound-3.mp3",
  },
  {
    backgroundImage: "./assets/images/poster-4.jpg",
    posterUrl: "./assets/images/poster-4.jpg",
    title: "From Where We Started",
    album: "No Spirit",
    year: 2022,
    artist: "No Spirit",
    soundPath: "./assets/sounds/sound-4.mp3",
  },
  {
    backgroundImage: "./assets/images/poster-5.jpg",
    posterUrl: "./assets/images/poster-5.jpg",
    title: "Where I Found You",
    album: "No Spirit",
    year: 2022,
    artist: "No Spirit",
    soundPath: "./assets/sounds/sound-5.mp3",
  },
];

/*--------------------------------------------------------
  ## Add Elements To Sounds List  From JSon OPJECt
----------------------------------------------------------*/

const soundsList = document.querySelector(".sounds-list");

for (let i = 0, leng = soundsData.length; i < leng; i++) {
  soundsList.innerHTML += `<li>
    <button class="sound-item ${
      i === 0 ? "active" : ""
    }"  data-num = ${i}  data-toggle-playlist > 
      <figure class="figure ${i === 0 ? "on" : ""}">
        <img
          src="${soundsData[i].posterUrl}"
          alt="${soundsData[i].title}"
          class="img"
          width="800"
          height="800"
        />
      </figure>
      <div class="sound-item__icon d-flex">
        <span class="material-symbols-rounded">equalizer</span>
      </div>
    </button>
    </li>`;
}

/*---------------------------------------------------------------------------------------------
## varible  + FUNCTION  ===> When Click On Button Or Other Element Show And Hide PlayList  
----------------------------------------------------------------------------------------------- */

//  functions like ===addEventListener=== But It Is Can Add Event For One Element Or More

const addEventOnElement = (elements, event, methode) => {
  elements.forEach((element) => element.addEventListener(event, methode));
};

/*---------------------------------------------------------------------------------------------
  ## varible  + FUNCTION  ===> When Click On Button Or Other Element Show And Hide PlayList  
----------------------------------------------------------------------------------------------- */

const playList = document.querySelector(".playlist"),
  eleRelatedWithList = document.querySelectorAll("[data-toggle-playlist]"),
  overlay = document.querySelector(".overlay");

const OpenListSounds = () => {
  toggleElements(playList, overlay, document.body);
};

addEventOnElement(eleRelatedWithList, "click", OpenListSounds);

/*------------------------------------------------------------------------------------------------------------
  ## varible  + FUNCTION  ===> Add Class Active For item  From playList And Remove Them From Onther ELements  
-------------------------------------------------------------------------------------------------------------*/

const playListItems = document.querySelectorAll("[data-num]");

let lastItemActive = 0,
  currentSound = 0;

const addAndRemoveActive = () => {
  playListItems[lastItemActive].classList.remove("active");
  playListItems[currentSound].classList.add("active");
};

addEventOnElement(playListItems, "click", (event) => {
  lastItemActive = currentSound;
  currentSound = event.target.parentElement.dataset.num;
  addAndRemoveActive();
});

/*------------------------------------------------------------------------------------------------------------
  ## varible  + FUNCTION  ===> CHANGE ALL INFORMATION  AND CURRENT SOUNDS 
-------------------------------------------------------------------------------------------------------------*/

const playerCover = document.querySelector(".sound__cover > .img"),
  playerTitle = document.querySelector(".content > .headline-sm"),
  playerAlbum = document.querySelector(".info > .album"),
  playerYear = document.querySelector(".info > .year"),
  playerArtiste = document.querySelector(".content > .artist");

const audioSource = new Audio(soundsData[currentSound].soundPath);

const changeAllInfo = () => {
  playerCover.src = soundsData[currentSound].posterUrl;
  playerCover.setAttribute(
    "alt",
    `${soundsData[currentSound].title} Album Poster`
  );
  document.body.style.backgroundImage = `url('${soundsData[currentSound].backgroundImage}')`;
  playerTitle.textContent = soundsData[currentSound].title;
  playerAlbum.textContent = soundsData[currentSound].album;
  playerYear.textContent = soundsData[currentSound].year;
  playerArtiste.textContent = soundsData[currentSound].artist;

  audioSource.src = soundsData[currentSound].soundPath;

  playSound();

  playBtn.addEventListener("click", playSound);
};

addEventOnElement(playListItems, "click", changeAllInfo);

/*------------------------------------------------------------------------------------------------------------
  ## varible  + FUNCTION  ===> UPDATA PLAYER DURATION 
-------------------------------------------------------------------------------------------------------------*/

const playerDuration = document.querySelector(".duration > .sound__long"),
  playerRangeControl = document.querySelector(".range__control > .range");

const updataDuration = () => {
  playerRangeControl.max = Math.ceil(audioSource.duration);
  playerDuration.textContent = getTimeLikeText(Number(audioSource.duration));
};

audioSource.addEventListener("loadeddata", updataDuration);

/*------------------------------------------------------------------------------------------------------------
  ## varible  + FUNCTION  ===> PlAY AND PAUSE WHEN Click ON PLAY BUTTON 
-------------------------------------------------------------------------------------------------------------*/

const playBtn = document.querySelector(".advance__control > .btn.play");

let intervalForSet;
const playSound = () => {
  if (audioSource.paused) {
    audioSource.play();
    playBtn.classList.add("active");
    intervalForSet = setInterval(changTimeRunning, 500);
  } else {
    audioSource.pause();
    playBtn.classList.remove("active");
    clearInterval(intervalForSet);
  }
};

playBtn.addEventListener("click", playSound);

/*------------------------------------------------------------------------------------------------------------
  ## varible  + FUNCTION  ===> PlAY AND PAUSE WHEN Click ON PLAY BUTTON 
-------------------------------------------------------------------------------------------------------------*/

const timeRunning = document.querySelector("[data-time]");

const changTimeRunning = () => {
  playerRangeControl.value = audioSource.currentTime;
  timeRunning.textContent = getTimeLikeText(audioSource.currentTime);

  fillingRanges();
  isSoundsEnd();
};

/*------------------------------------------------------------------------------------------------------------
  ## varible  + FUNCTION  ===> PlAY AND PAUSE WHEN Click ON PLAY BUTTON 
-------------------------------------------------------------------------------------------------------------*/

const rangesInput = document.querySelectorAll("[data-range]");
const fillingRanges = (e) => {
  rangesInput.forEach(
    (input) =>
      (input.nextElementSibling.style.width = `${
        (input.value / input.max) * 100
      }%`)
  );
};

addEventOnElement(rangesInput, "input", fillingRanges);

/*------------------------------------------------------------------------------------------------------------------------
  ##  FUNCTION  ===> Change timeRunning and Change width range  When You changing slider/== playerRangeControl 
-------------------------------------------------------------------------------------------------------------------------*/

const request = () => {
  audioSource.currentTime = playerRangeControl.value;
  timeRunning.textContent = getTimeLikeText(audioSource.currentTime);
};

playerRangeControl.addEventListener("input", request);

/*------------------------------------------------------------------------------------------------------------------------
  ##  FUNCTION  ===> When The Sound ENd 
-------------------------------------------------------------------------------------------------------------------------*/

const isSoundsEnd = () => {
  if (audioSource.ended) {
    playBtn.classList.remove("active");
    audioSource.currentTime = 0;
    playerRangeControl.value = audioSource.currentTime;
    timeRunning.textContent = getTimeLikeText(playerRangeControl.value);
  }
};

/*------------------------------------------------------------------------------------------------------------------------
  ## varible  + FUNCTION  ===> When Cilck Btn previous Sound
-------------------------------------------------------------------------------------------------------------------------*/

const prevBtn = document.querySelector("[data-skip-prev]");

const prevSound = () => {
  lastItemActive = currentSound;

  if (isShuffled) currentSound = getRandomIndex();
  else
    currentSound == 0 ? (currentSound = soundsData.length - 1) : currentSound--;

  addAndRemoveActive();
  changeAllInfo();
};

prevBtn.addEventListener("click", prevSound);

/*------------------------------------------------------------------------------------------------------------------------
  ## varible  + FUNCTION  ===> When Cilck Btn Next Sound
-------------------------------------------------------------------------------------------------------------------------*/

const nextBtn = document.querySelector("[data-skip-next]");

const nextSound = () => {
  lastItemActive = currentSound;

  if (isShuffled) currentSound = getRandomIndex();
  else
    currentSound == soundsData.length - 1 ? (currentSound = 0) : currentSound++;

  addAndRemoveActive();
  changeAllInfo();
};

nextBtn.addEventListener("click", nextSound);

/*------------------------------------------------------------------------------------------------------------------------
  ## varible  + FUNCTION  ===> When Cilck Btn Shuffling
-------------------------------------------------------------------------------------------------------------------------*/

const btnShuffle = document.querySelector("[data-shuffle]");

const getRandomIndex = () => Math.trunc(Math.random() * soundsData.length);

let isShuffled = false;

const playWithShuffle = () => {
  toggleElements(btnShuffle);
  isShuffled ? (isShuffled = false) : (isShuffled = true);
};

btnShuffle.addEventListener("click", playWithShuffle);

/*------------------------------------------------------------------------------------------------------------------------
  ## varible  + FUNCTION  ===> Repeat Sounds
-------------------------------------------------------------------------------------------------------------------------*/

const btnRepeat = document.querySelector("[data-repeat]");

const repeatEvent = () => {
  if (!audioSource.loop) {
    audioSource.loop = true;
    btnRepeat.classList.add("active");
  } else {
    audioSource.loop = false;
    btnRepeat.classList.remove("active");
  }
};

btnRepeat.addEventListener("click", repeatEvent);

/*------------------------------------------------------------------------------------------------------------------------
  ##  FUNCTION  ===>SOunds VOLUME
-------------------------------------------------------------------------------------------------------------------------*/

const volumeInput = document.querySelector(".volume  .range"),
  volumeIcone = document.querySelector(".volume > .btn > span");

console.log(volumeInput);
console.log(volumeIcone);

console.log();
const changeVolume = () => {
  audioSource.volume = volumeInput.value;

  if (audioSource.volume < 0.1) volumeIcone.textContent = "volume_mute";
  else if (audioSource.volume < 0.5) volumeIcone.textContent = "volume_down";
  else volumeIcone.textContent = "volume_up";
};

volumeInput.addEventListener("input", changeVolume);

/*
  *
  **
  ***
  *****
      ##############  HELPERS
  *****
  ***
  **
  *
*/
// Function Can Toggle Class Active For One Or More Element

function toggleElements(...eles) {
  eles.forEach((ele) => ele.classList.toggle("active"));
}

// Function Make Time Like Value You Can Shar

function getTimeLikeText(value) {
  const minutes = Math.trunc(value / 60);
  const seconds = Math.ceil(value - minutes * 60);
  const durationLikeText = `${minutes}:${
    seconds < 10 ? "0" + seconds : seconds
  }`;
  return durationLikeText;
}

// --------------------------END FUNCTIONS----------------------------------------------------------

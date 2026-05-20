const songImage = document.getElementById("song-image");
const songName = document.getElementById("song-name");
const songArtist = document.getElementById("song-artist");

const songSlider = document.getElementById("slider-song");

const playButton = document.getElementById("play-song");
const pauseButton = document.getElementById("pause-song");
const prevSongButton = document.getElementById("prev-song");
const nextSongButton = document.getElementById("next-song");
const repeatButton = document.getElementById("repeat-song");
const shuffleButton = document.getElementById("shuffle-song");

const songs = [
    {
        image: "album_art/album-art1.jpg",
        name: "Overdose",
        artist: "Natori",
        audio: "audio/overdose.mp3"
    },
    {
        image: "album_art/album-art2.jpg",
        name: "Cherry Pop",
        artist: "DECO27",
        audio: "audio/cherry-pop.mp3"
    },
    {
        image: "album_art/album-art3.jpg",
        name: "Looping The Rooms",
        artist: "Rusino",
        audio: "audio/looping-the-rooms.mp3",
    },
    {
        image: "album_art/album-art4.jpg",
        name: "Monitoring (BF Remix)",
        artist: "DECO27",
        audio: "audio/monitoring-best-friend.mp3",
    },
    {
        image: "album_art/album-art5.jpg",
        name: "Dreamflux Reef",
        artist: "HoyoMix",
        audio: "audio/dreamflux-reef.mp3",
    },
    {
        image: "album_art/album-art6.jpg",
        name: "Retry Now",
        artist: "Nakiso",
        audio: "audio/retrynow.mp3",
    },
];

const audio = document.createElement("audio");
let isShuffle = false;
let currentSongIndex = 0;

// Initially hide the pause button
pauseButton.style.display = "none";

updateSong();

prevSongButton.addEventListener("click", function() {
    if (currentSongIndex == 0) {
        return;
    }
    currentSongIndex--;
    updateSong();
    audio.play();
    playButton.style.display = "none";
    pauseButton.style.display = "inline";
});

nextSongButton.addEventListener("click", function() {
    if (isShuffle) {
        currentSongIndex = Math.floor(Math.random() * songs.length);
    } else {
        if (currentSongIndex == songs.length - 1) {
            currentSongIndex = 0;
        } else {
            currentSongIndex++;
        }
    }
    updateSong();
    audio.play();
    playButton.style.display = "none";
    pauseButton.style.display = "inline";
});

playButton.addEventListener("click", function() {
    audio.play();
    playButton.style.display = "none";
    pauseButton.style.display = "inline";
});

pauseButton.addEventListener("click", function() {
    audio.pause();
    pauseButton.style.display = "none";
    playButton.style.display = "inline";
});

function updateSong() {
    const song = songs[currentSongIndex];
    songImage.src = song.image;
    songName.innerText = song.name;
    songArtist.innerText = song.artist;

    audio.src = song.audio;
    audio.onloadedmetadata = function() {
        songSlider.value = 0;
        songSlider.max = audio.duration;
    };
}

function toggleRepeat() {
    if (audio.loop) {
        audio.loop = false;
        repeatButton.style.color = "rgb(147, 183, 194)";
    } else {
        audio.loop = true;
        repeatButton.style.color = "rgb(0, 0, 0)";
    }
}

function toggleShuffle() {
    isShuffle = !isShuffle;
    if (isShuffle) {
        shuffleButton.style.color = "rgb(0, 0, 0)";
    } else {
        shuffleButton.style.color = "rgb(147, 183, 194)";
    }
}

repeatButton.addEventListener("click", toggleRepeat);
shuffleButton.addEventListener("click", toggleShuffle);

songSlider.addEventListener("change", function() {
    audio.currentTime = songSlider.value;
});

function moveSlider() {
    songSlider.value = audio.currentTime;
}

setInterval(moveSlider, 1000);

audio.addEventListener("ended", function() {
    if (!audio.loop) {
        if (isShuffle) {
            currentSongIndex = Math.floor(Math.random() * songs.length);
        } else {
            if (currentSongIndex === songs.length - 1) {
                currentSongIndex = 0;
            } else {
                currentSongIndex++;
            }
        }
        updateSong();
        audio.play();
    }
});



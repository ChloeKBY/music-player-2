const songImage = document.getElementById("song-image");
const songName = document.getElementById("song-name");
const songArtist = document.getElementById("song-artist");

const songSlider = document.getElementById("slider-song");

const playButton = document.getElementById("play-song");
const pauseButton = document.getElementById("pause-song");
const prevSongButton = document.getElementById("prev-song");
const nextSongButton = document.getElementById("next-song");

const songs = [
    {
        image: "./album-art1.jpg",
        name: "Overdose",
        artist: "Natori",
        audio: "audio/overdose.mp3"
    },
    {
        image: "./album-art2.jpg",
        name: "Cherry Pop",
        artist: "DECO27",
        audio: "audio/cherry-pop.mp3"
    },
    {
        image: "./album-art3.jpg",
        name: "Looping The Rooms",
        artist: "Rusino",
        audio: "audio/looping-the-rooms.mp3",
    },
    {
        image: "./album-art4.jpg",
        name: "Monitoring (BF Remix)",
        artist: "DECO27",
        audio: "audio/monitoring-best-friend.mp3",
    },
    {
        image: "./album-art5.jpg",
        name: "Dreamflux Reef",
        artist: "HoyoMix",
        audio: "audio/dreamflux-reef.mp3",
    },
    {
        image: "./album-art6.jpg",
        name: "Retry Now",
        artist: "Nakiso",
        audio: "audio/retrynow.mp3",
    },
];

const audio = document.createElement("audio");
let currentSongIndex = 0;

updateSong();

prevSongButton.addEventListener("click", function() {
    if (currentSongIndex == 0) {
        return;
    }
    currentSongIndex--;
    updateSong();
});

nextSongButton.addEventListener("click", function() {
    if (currentSongIndex == songs.length - 1) {
        currentSongIndex = 0;
    } else {
        currentSongIndex++;
    }
    updateSong();
});

playButton.addEventListener("click", function() {
    audio.play();
});

pauseButton.addEventListener("click", function() {
    audio.pause();
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

songSlider.addEventListener("change", function() {
    audio.currentTime = songSlider.value;
})

function moveSlider() {
    songSlider.value = audio.currentTime;
};

setInterval(moveSlider, 1000);



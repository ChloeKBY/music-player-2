const songImage = document.getElementById("song-image");
const songName = document.getElementById("song-name");
const songArtist = document.getElementById("song-artist");
const songTime = document.getElementById("song-time");

const songSlider = document.getElementById("slider-song");

const playButton = document.getElementById("play-song");
const pauseButton = document.getElementById("pause-song");
const prevSongButton = document.getElementById("prev-song");
const nextSongButton = document.getElementById("next-song");
const repeatButton = document.getElementById("repeat-song");
const shuffleButton = document.getElementById("shuffle-song");

const songs = [
    {
        //overdose by Natori
        image: "album_art/album-art1.jpg",
        name: "Overdose",
        artist: "Natori",
        audio: "audio/overdose.mp3"
    },
    {
        //Cherry pop deco27
        image: "album_art/album-art2.jpg",
        name: "Cherry Pop",
        artist: "DECO27",
        audio: "audio/cherry-pop.mp3"
    },
    {
        // rusino looping the rooms
        image: "album_art/album-art3.jpg",
        name: "Looping The Rooms",
        artist: "Rusino",
        audio: "audio/looping-the-rooms.mp3",
    },
    {
        //Montitoring best friend remix
        image: "album_art/album-art4.jpg",
        name: "Monitoring (BF Remix)",
        artist: "DECO27",
        audio: "audio/monitoring-best-friend.mp3",
    },
    {
        // DREAMFLUS REEEEFFF
        image: "album_art/album-art5.jpg",
        name: "Dreamflux Reef",
        artist: "HoyoMix",
        audio: "audio/dreamflux-reef.mp3",
    },
    {
        //Retry Now by Nakiso
        image: "album_art/album-art6.jpg",
        name: "Retry Now",
        artist: "Nakiso",
        audio: "audio/retrynow.mp3",
    },
    {
        //Sleepwalk by Natori
        image: "album_art/album-art7.jpg",
        name: "Sleepwalk",
        artist: "Natori",
        audio: "audio/sleepwalk.mp3",
    },
    {
        //Sunflower Spider-Man into the Spider-Verse
        image: "album_art/album-art8.jpg",
        name: "Sunflower",
        artist: "Spider-Man",
        audio: "audio/sunflower.mp3",
    },
    {
        //Coin Locker Baby by Maretu
        image: "album_art/album-art9.jpg",
        name: "Coin Locker Baby",
        artist: "Maretu",
        audio: "audio/coin-locker-baby.mp3",
    },
    {
        //Lost Umbrella by Inabakumori
        image: "album_art/album-art10.jpg",
        name: "Lost Umbrella",
        artist: "Inabakumori",
        audio: "audio/lost-umbrella.mp3",
    },
    {
        //Rob as my Witness by Lovejoy
        image: "album_art/album-art11.jpg",
        name: "Rob as My Witness",
        artist: "Lovejoy",
        audio: "audio/rob-as-my-witness.mp3",
    },
    {
        //Brain Revolution Girl by Maretu
        image: "album_art/album-art12.jpg",
        name: "Brain Revolution Girl",
        artist: "Maretu",
        audio: "audio/brain-revolution-girl.mp3",
    },
    {
        //Saline Solution by Wilbur Soot
        image: "album_art/album-art13.jpg",
        name: "Saline Solution",
        artist: "Wilbur Soot",
        audio: "audio/saline-solution.mp3",
    },
    {
        //Rainy Boots by Inabakumori
        image: "album_art/album-art14.jpg",
        name: "Rainy Boots",
        artist: "Inabakumori",
        audio: "audio/rainy-boots.mp3",
    },
    {
        //Cats by The Living Tombstone
        image: "album_art/album-art15.jpg",
        name: "Cats",
        artist: "The Living Tombstone",
        audio: "audio/cats.mp3",
    },
    {
        //Lagtrain by Inabakumori
        image: "album_art/album-art16.jpg",
        name: "Lagtrain",
        artist: "Inabakumori",
        audio: "audio/lagtrain.mp3",
    },
    {
        //3rd Planet by Wilbur
        image: "album_art/album-art17.jpg",
        name: "3rd Planet",
        artist: "Wilbur Soot",
        audio: "audio/3rd-planet.mp3",
    },
    {
        //Overdose english cover by Minorikyun
        image: "album_art/album-art18.jpg",
        name: "Overdose",
        artist: "Minorikyun",
        audio: "audio/overdose-minorikyun.mp3",
    },
    {
        //Kuru Kuru kuruin
        image: "album_art/album-art19.jpg",
        name: "Kuru Kuru kuruin",
        artist: "NA",
        audio: "audio/kuru-kuru.mp3",
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
        updateTimeDisplay();
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
    updateTimeDisplay();
});

function moveSlider() {
    songSlider.value = audio.currentTime;
    updateTimeDisplay();
}

function updateTimeDisplay() {
    const currentMinutes = Math.floor(audio.currentTime / 60);
    const currentSeconds = Math.floor(audio.currentTime % 60);
    const totalMinutes = Math.floor(audio.duration / 60);
    const totalSeconds = Math.floor(audio.duration % 60);
    
    const currentTimeStr = `${currentMinutes}:${currentSeconds.toString().padStart(2, '0')}`;
    const totalTimeStr = `${totalMinutes}:${totalSeconds.toString().padStart(2, '0')}`;
    
    songTime.innerText = `${currentTimeStr} / ${totalTimeStr}`;
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



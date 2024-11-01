const progress = document.getElementById("progress");
const podcast = document.getElementById("podcast");
const playPause = document.getElementById("playPause");
const rewindButton = document.getElementById("rewind");
const skipButton = document.getElementById("skip");
const currentTimeDisplay = document.getElementById("currentTime");
const totalTimeDisplay = document.getElementById("totalTime");
const nextTrack = document.getElementById("next");
const prevTrack = document.getElementById("prev");

const tracks = [
  "./assets/podcasts/Podcast_1.m4a",
  "./assets/podcasts/Podcast_2.m4a",
  "./assets/podcasts/Podcast_Federated_Learning.m4a",
];
const icards = [
  "./assets/Thumbnails/Ep-01.jpeg",
  "./assets/Thumbnails/Ep-02.jpeg",
  "./assets/Thumbnails/Ep-03.jpeg",
];
let currentTrackIndex = 0;

podcast.onloadedmetadata = function () {
  progress.max = podcast.duration; // Corrected from ondurationchange to duration
  progress.value = podcast.currentTime;
  totalTimeDisplay.textContent = formatTime(podcast.duration); // Display total time
};

function play_n_pause() {
  if (playPause.classList.contains("ri-pause-fill")) {
    podcast.pause();

    playPause.classList.remove("ri-pause-fill");
    playPause.classList.add("ri-play-fill");
  } else {
    podcast.play();

    playPause.classList.remove("ri-play-fill");
    playPause.classList.add("ri-pause-fill");
  }
}

// Removed the automatic play call
setInterval(() => {
  progress.value = podcast.currentTime;
  currentTimeDisplay.textContent = formatTime(podcast.currentTime); // Update current time
}, 500);

progress.onchange = function () {
  podcast.currentTime = progress.value;
  podcast.play(); // This will play the podcast when the progress is changed
};

// Rewind 10 seconds
rewindButton.onclick = function () {
  podcast.currentTime = Math.max(0, podcast.currentTime - 10);
};

// Skip 10 seconds
skipButton.onclick = function () {
  podcast.currentTime = Math.min(podcast.duration, podcast.currentTime + 10);
};

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
}

function loadTrack(index) {
  podcast.src = tracks[index];
  document.getElementById("podcast-img").src = icards[index];
  podcast.play();
}

nextTrack.onclick = function () {
  currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
  loadTrack(currentTrackIndex);
};

prevTrack.onclick = function () {
  currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
  loadTrack(currentTrackIndex);
};

// Select all podcast cards
const podcastCards = document.querySelectorAll(".podcast-card");

// Add click event listener to each card
podcastCards.forEach((card) => {
  card.addEventListener("click", function () {
    const index = this.getAttribute("data-index"); // Get the index from the data attribute
    loadTrack(index); // Load and play the podcast track
  });
});

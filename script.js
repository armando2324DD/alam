let currentAudio = null;
let currentButton = null;

// Generar corazones flotantes
function createFloatingHeart() {
  const container = document.getElementById('floatingHearts');
  const heart = document.createElement('div');
  heart.className = 'floating-heart';
  heart.style.left = (Math.random() * 90 + 5) + '%';
  heart.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>';
  container.appendChild(heart);
  
  setTimeout(() => {
    heart.remove();
  }, 10000);
}

setInterval(createFloatingHeart, 2000);

// Toggle playlist
function togglePlaylist(id) {
  const playlist = document.getElementById(id);
  const arrow = document.getElementById('arrow' + id.slice(-1));
  
  if (playlist.classList.contains('active')) {
    playlist.classList.remove('active');
    arrow.classList.remove('rotated');
  } else {
    playlist.classList.add('active');
    arrow.classList.add('rotated');
  }
}

// Toggle play/pause
function togglePlay(event, audioId) {
  event.stopPropagation();
  const audio = document.getElementById(audioId);
  const button = event.currentTarget;
  const playIcon = button.querySelector('.play-icon');
  const pauseIcon = button.querySelector('.pause-icon');

  if (currentAudio && currentAudio !== audio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    if (currentButton) {
      currentButton.classList.remove('playing');
      currentButton.querySelector('.play-icon').style.display = 'block';
      currentButton.querySelector('.pause-icon').style.display = 'none';
    }
  }

  if (audio.paused) {
    audio.play();
    button.classList.add('playing');
    playIcon.style.display = 'none';
    pauseIcon.style.display = 'block';
    currentAudio = audio;
    currentButton = button;
  } else {
    audio.pause();
    button.classList.remove('playing');
    playIcon.style.display = 'block';
    pauseIcon.style.display = 'none';
    currentAudio = null;
    currentButton = null;
  }
}

// Event listener para cuando termine una canción
document.addEventListener('DOMContentLoaded', function() {
  const audios = document.querySelectorAll('audio');
  audios.forEach(audio => {
    audio.addEventListener('ended', function() {
      if (currentButton) {
        currentButton.classList.remove('playing');
        currentButton.querySelector('.play-icon').style.display = 'block';
        currentButton.querySelector('.pause-icon').style.display = 'none';
      }
      currentAudio = null;
      currentButton = null;
    });
  });
});

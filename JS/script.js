// Navbar
const navbar = document.querySelector('.navbar');
const menuIcon = document.querySelector('.menu-icon');
const navItems = document.querySelectorAll('.nav-item');

// Função para atualizar a navbar no scroll
const updateNavbarOnScroll = () => {
  const isMobile = window.innerWidth <= 820;
  const isScrolled = window.scrollY > 0;

  if (isMobile && navbar.classList.contains('hamburger')) {
    navbar.classList.remove('sticky');
  } else {
    navbar.classList.toggle('sticky', isScrolled);
  }

  menuIcon.classList.toggle('position', isScrolled && !navbar.classList.contains('hamburger'));
};

// Função para alternar o menu hamburger
const toggleHamburgerMenu = () => {
  navbar.classList.toggle('hamburger');
  navbar.classList.toggle('sticky', !navbar.classList.contains('hamburger') && window.scrollY > 0);
  menuIcon.classList.toggle('position', !navbar.classList.contains('hamburger') && window.scrollY > 0);
};

// Event Listeners
window.addEventListener('scroll', updateNavbarOnScroll);
menuIcon.addEventListener('click', toggleHamburgerMenu);

navItems.forEach((navItem) => {
  navItem.addEventListener('click', () => {
    navItems.forEach((item) => item.classList.remove('show'));
    navItem.classList.add('show');
  });
});
// End of Navbar

// Projects
const filterLinks = document.querySelectorAll('.filter-nav-link');
const projects = document.querySelectorAll('.project');

filterLinks.forEach((filterLink) => {
  filterLink.addEventListener('click', (e) => {
    e.preventDefault();

    // Remove a classe 'active' do link atual e adiciona ao clicado
    document.querySelector('.filter-nav-link.active').classList.remove('active');
    filterLink.classList.add('active');

    // Filtra os projetos com base no tipo
    const filterType = filterLink.getAttribute('data-type');
    projects.forEach((project) => {
      const projectType = project.getAttribute('data-type');
      const shouldShow = filterType === 'all' || filterType === projectType;
      project.classList.toggle('hide', !shouldShow);
    });
  });
});
// End of Projects

// Video
const videoContainer = document.querySelector('.video-container');
const mainVideo = document.querySelector('video');
const playPauseBtn = document.querySelector('.play-pause i');
const progressBar = document.querySelector('.progress-bar');
const skipBackward = document.querySelector('.skip-backward i');
const skipForward = document.querySelector('.skip-forward i');
const volumeBtn = document.querySelector('.volume i');
const volumeSlider = document.querySelector('.left input');
const speedBtn = document.querySelector('.playback-speed span');
const speedOptions = document.querySelector('.speed-options');
const speedOptionsItems = document.querySelectorAll('.speed-options div');
const picInPicBtn = document.querySelector('.pic-in-pic span');
const fullscreenBtn = document.querySelector('.fullscreen i');
const videoTimeline = document.querySelector('.video-timeline');
const currentVidTime = document.querySelector('.current-time');
const videoDuration = document.querySelector('.video-duration');
const playButton = document.querySelector('.play-btn');
const xButton = document.querySelector('.x-btn i');

let timer;

// Função para formatar o tempo
const formatTime = (time) => {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = Math.floor(time % 60);

  return `${hours > 0 ? `${hours}:` : ''}${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

// Função para atualizar o progresso do vídeo
const updateProgress = () => {
  const percent = (mainVideo.currentTime / mainVideo.duration) * 100;
  progressBar.style.width = `${percent}%`;
  currentVidTime.innerText = formatTime(mainVideo.currentTime);
};

// Função para alternar play/pause
const togglePlayPause = () => {
  if (mainVideo.paused) {
    mainVideo.play();
  } else {
    mainVideo.pause();
  }
};

// Event Listeners
playButton.addEventListener('click', () => videoContainer.classList.add('show-video'));
xButton.addEventListener('click', () => {
  videoContainer.classList.remove('show-video');
  mainVideo.pause();
});

mainVideo.addEventListener('timeupdate', updateProgress);
mainVideo.addEventListener('loadeddata', () => {
  videoDuration.innerText = formatTime(mainVideo.duration);
});

playPauseBtn.addEventListener('click', togglePlayPause);
mainVideo.addEventListener('play', () => playPauseBtn.classList.replace('fa-play', 'fa-pause'));
mainVideo.addEventListener('pause', () => playPauseBtn.classList.replace('fa-pause', 'fa-play'));

skipBackward.addEventListener('click', () => (mainVideo.currentTime -= 5));
skipForward.addEventListener('click', () => (mainVideo.currentTime += 5));

volumeBtn.addEventListener('click', () => {
  mainVideo.volume = mainVideo.volume === 0 ? 0.5 : 0;
  volumeBtn.classList.toggle('fa-volume-high', mainVideo.volume !== 0);
  volumeBtn.classList.toggle('fa-volume-xmark', mainVideo.volume === 0);
  volumeSlider.value = mainVideo.volume;
});

volumeSlider.addEventListener('input', (e) => {
  mainVideo.volume = e.target.value;
  volumeBtn.classList.toggle('fa-volume-high', mainVideo.volume !== 0);
  volumeBtn.classList.toggle('fa-volume-xmark', mainVideo.volume === 0);
});

speedBtn.addEventListener('click', () => speedOptions.classList.toggle('show'));
speedOptionsItems.forEach((option) => {
  option.addEventListener('click', () => {
    mainVideo.playbackRate = option.dataset.speed;
    speedOptions.querySelector('.active-option').classList.remove('active-option');
    option.classList.add('active-option');
  });
});

picInPicBtn.addEventListener('click', () => mainVideo.requestPictureInPicture());
fullscreenBtn.addEventListener('click', () => mainVideo.requestFullscreen());

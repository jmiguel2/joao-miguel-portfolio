document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /*
    Vídeos:
    - nenhum toca sozinho (sem autoplay);
    - o último vídeo clicado é o único com áudio;
    - os outros continuam como estão (tocando ou pausados), mas sem som;
    - clicar no vídeo que está com áudio e tocando → pausa;
    - clicar em um vídeo pausado → toca e passa a ser o vídeo com áudio.
  */
  const wrappers = document.querySelectorAll(".video-wrapper");
  const videos = [];
  let audioVideo = null;

  const giveAudioTo = (video) => {
    audioVideo = video;
    videos.forEach((other) => {
      other.muted = other !== video;
    });
  };

  wrappers.forEach((wrapper) => {
    const video = wrapper.querySelector(".portfolio-video");
    const button = wrapper.querySelector(".video-play");

    if (!video) return;

    videos.push(video);

    const setRatio = () => {
      if (video.videoWidth && video.videoHeight) {
        wrapper.style.setProperty("--video-ratio", video.videoWidth / video.videoHeight);
      }
    };

    video.addEventListener("loadedmetadata", setRatio);
    setRatio();

    const handleClick = () => {
      if (!video.paused && video === audioVideo) {
        video.pause();
        return;
      }

      giveAudioTo(video);

      if (video.paused) {
        video.play().catch(() => wrapper.classList.remove("is-playing"));
      }
    };

    video.addEventListener("play", () => wrapper.classList.add("is-playing"));
    video.addEventListener("pause", () => wrapper.classList.remove("is-playing"));
    video.addEventListener("ended", () => wrapper.classList.remove("is-playing"));

    button?.addEventListener("click", handleClick);
    video.addEventListener("click", handleClick);
  });
});

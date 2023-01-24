const root = document.querySelector(".root");
// const videoCollection = document.querySelector(".videos");
// let activeSession = "";
let sessionsActivated = [];

const createIframe = (src) => {
  const div = document.createElement("div");
  div.className = "video-container-section";

  div.innerHTML = `
    <div class="video-container">
      <iframe
        src=${src}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
  
    `;

  return div;
};

const createVideoTag = (src, poster = "") => {
  const div = document.createElement("div");
  div.className = "video-container-section";

  div.innerHTML = `
      <div class="video-container">
      <video controls="controls" src=${src} class="videoTag" preload="none" poster=${poster}></video>
      </div>
    
      `;

  //   const div = document.createElement("span");
  //   div.className = "video-container-section";

  //   const video = document.createElement("video");
  //   video.setAttribute("controls", "controls");
  //   video.setAttribute("src", src);
  //   video.setAttribute("preload", "none");
  //   video.setAttribute("poster", poster);
  //   video.className = "videoTag";

  //   <video controls="controls" src=${src} class="videoTag" preload="none" poster=${poster}></video>

  //   div.innerHTML = `

  //   `;

  return div;
};

const getVideos = (videos) => {
  const div = document.createElement("div");
  div.className = "videos";

  videos.forEach((video) => {
    if (video.type === "iframe") {
      const videoDiv = createIframe(video.videoSrc);
      div.appendChild(videoDiv);
    } else if (video.type === "video") {
      const videoDiv = createVideoTag(video.videoSrc, video.thumbnailSrc);
      div.appendChild(videoDiv);
    }
  });

  return div;
};

const getVideo = (parentDiv) => {
  const h3 = parentDiv.querySelector("h3");
  let videos = [];
  videoDatabase.forEach((videoData) => {
    if (videoData.courseTopic === h3.innerText) {
      videos = [...videoData.videos];
      return;
    }
  });

  return videos;
};

const activate = (e) => {
  console.log("e", e);

  const parentDiv = e.parentElement;
  const section = parentDiv.querySelector(".section");
  console.log("parentDiv: ", parentDiv);
  console.log("section selected: ", section);

  if (sessionsActivated.includes(e.innerText)) {
    section.classList.toggle("active");
    return;
  }

  const videos = getVideo(parentDiv);

  section.appendChild(getVideos(videos));

  const sections = document.querySelectorAll(".section-container");
  sections.forEach((section) => {});

  sessionsActivated.push(e.innerText);

  //   const highlightSection=parentDiv.querySelector(".section")
  section.classList.add("active");
};

const createSection = ({ courseTopic, videos }) => {
  const div = document.createElement("div");
  div.className = "section-container";

  div.innerHTML = `
  <h3 onclick="activate(this)">${courseTopic}</h3>
  <section class="section">
  </section>
  `;

  return div;
};

const createSections = () => {
  videoDatabase.forEach((videoData) => {
    const section = createSection(videoData);
    root.appendChild(section);
  });
};

createSections();

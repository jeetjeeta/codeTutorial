let liked = false;
let disliked = false;
let disableCountLike = false;
let disableCountDislike = false;
let disableCounts = false;

const countViews = () => {
  const viewP = document.querySelector("#views");

  if (getCookie("viewed") !== "" && getCookie("viewed") === "true") {
    return;
  }

  fetch("/incrementView", { method: "post" })
    .then((res) => res.json())
    .then((data) => {
      console.log(data.message);
      fillStats();
      setCookies("viewed", true);
    });
};

const countLikes = () => {
  if (disableCounts === true) {
    // disableCounts=false
    return;
  }

  const like = document.querySelector(".like");
  const parentDiv = like.parentElement;

  const dislikeP = document.querySelector("#dislike");
  const dislikesNo = parseInt(dislikeP.innerText);

  const likeP = document.querySelector("#like");
  const number = parseInt(likeP.innerText);

  const dislike = document.querySelector(".dislike");

  if (liked === true) {
    likeP.innerText = (number - 1).toString();
    like.classList.toggle("liked");

    disableCounts = true;
    fetch("/decrementLike", { method: "post" })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message);
        fillStats();
        setCookies("liked", false);

        disableCounts = false;
      });

    liked = false;

    return;
  }

  if (disliked === true) {
    dislikeP.innerText = (dislikesNo - 1).toString();
    dislike.classList.remove("disliked");
    disliked = false;

    disableCounts = true;

    for (let i = 0; i < 100; i++) {}
    fetch("/decrementDislike", { method: "post" })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message);
        setCookies("disliked", false);
        fetch("/incrementLike", { method: "post" })
          .then((res) => res.json())
          .then((data) => {
            console.log(data.message);
            likeP.innerText = (number + 1).toString();
            like.classList.toggle("liked");
            liked = true;
            fillStats();
            setCookies("liked", true);

            disableCounts = false;
          });
      });

    return;
  }

  disableCounts = true;

  fetch("/incrementLike", { method: "post" })
    .then((res) => res.json())
    .then((data) => {
      console.log(data.message);
      likeP.innerText = (number + 1).toString();
      like.classList.toggle("liked");
      liked = true;
      fillStats();
      setCookies("liked", true);

      disableCounts = false;
    });

  //   likeP.innerText = (number + 1).toString();
  //   like.classList.toggle("liked");
  //   liked = true;
};

const countDislikes = () => {
  if (disableCounts === true) {
    // disableCounts=false
    return;
  }

  const dislike = document.querySelector(".dislike");

  const dislikeP = document.querySelector("#dislike");
  const dislikesNo = parseInt(dislikeP.innerText);

  const like = document.querySelector(".like");
  const likeP = document.querySelector("#like");
  const likeNo = parseInt(likeP.innerText);

  if (liked === true) {
    like.classList.toggle("liked");
    likeP.innerText = (likeNo - 1).toString();
    liked = false;

    disableCounts = true;
    fetch("/decrementLike", { method: "post" })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message);
        setCookies("liked", false);
        fetch("/incrementDislike", { method: "post" })
          .then((res) => res.json())
          .then((data) => {
            console.log(data.message);
            dislikeP.innerText = (dislikesNo + 1).toString();
            dislike.classList.add("disliked");

            disliked = true;
            fillStats();
            setCookies("disliked", true);

            disableCounts = false;
          });
      });

    return;
  }

  if (disliked === true) {
    dislikeP.innerText = (dislikesNo - 1).toString();
    dislike.classList.remove("disliked");
    disliked = false;

    disableCounts = true;
    fetch("/decrementDislike", { method: "post" })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message);
        fillStats();
        setCookies("disliked", false);

        disableCounts = false;
      });

    return;
  }

  disableCounts = true;
  fetch("/incrementDislike", { method: "post" })
    .then((res) => res.json())
    .then((data) => {
      console.log(data.message);
      dislikeP.innerText = (dislikesNo + 1).toString();
      dislike.classList.add("disliked");

      disliked = true;
      fillStats();
      setCookies("disliked", true);

      disableCounts = false;
    });

  //   dislikeP.innerText = (dislikesNo + 1).toString();
  //   dislike.classList.add("disliked");

  //   disliked = true;
};

const fillStats = (enableCheck = false) => {
  const viewP = document.querySelector("#views");
  const likeP = document.querySelector("#like");
  const dislikeP = document.querySelector("#dislike");

  const like = document.querySelector(".like");
  const dislike = document.querySelector(".dislike");

  console.log("enablecheck: ", enableCheck);
  console.log("getCookie liked", getCookie("liked"));
  console.log("getCookie disliked", getCookie("disliked"));

  if (
    enableCheck === true &&
    getCookie("liked") !== "" &&
    getCookie("liked") === "true"
  ) {
    console.log("getStats() checkLike");
    like.classList.add("liked");
    liked = true;
  }

  if (
    enableCheck === true &&
    getCookie("disliked") !== "" &&
    getCookie("disliked") === "true"
  ) {
    console.log("getStats() checkDisLike");
    disliked = true;
    dislike.classList.add("disliked");
  }

  fetch("/getStats")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const { views, likes, dislikes } = data;
      viewP.innerText = views.toString();
      likeP.innerText = likes.toString();
      dislikeP.innerText = dislikes.toString();
    });

  console.log("getStats()");
};

fillStats(true);
countViews();

// const { json } = require("express");

// const mainComment = () => {
(() => {
  const getTime = () => {
    const currentdate = new Date();
    const datetime =
      "Time: " +
      currentdate.getDay() +
      "/" +
      currentdate.getMonth() +
      "/" +
      currentdate.getFullYear() +
      " @ " +
      currentdate.getHours() +
      ":" +
      currentdate.getMinutes() +
      ":" +
      currentdate.getSeconds();

    return datetime;
  };

  const comment = document.querySelector(".comment");
  const commentP = document.querySelector("#commentP");

  const commentOverlay = document.querySelector(".comments-overlay");
  const actualComment = document.querySelector("#comment");
  const commentSubmit = document.querySelector("#commentSubmit");
  const commentCancel = document.querySelector("commentCancel");

  const fillCommentStats = (numberOfComments, commentCollection) => {
    commentP.innerText = numberOfComments.toString();

    const commentsList = document.querySelector(".commentsPosted_list");

    commentCollection.reverse();

    commentCollection.forEach((commentData) => {
      const li = document.createElement("li");

      li.innerHTML = `
      ${commentData.comment}<br>
      <span class="date">${commentData.time}</span>
  
      `;

      commentsList.appendChild(li);
    });
  };

  window.toggleComment = () => {
    comment.classList.toggle("enabled");
    commentOverlay.classList.toggle("enabled");
  };

  window.cancelComment = () => {
    comment.classList.remove("enabled");
    commentOverlay.classList.remove("enabled");
    actualComment.value = "";
  };

  window.submitComment = () => {
    const commentText = actualComment.value;

    if (commentText.trimStart() === "" && commentText.trimEnd() === "") {
      alert("Write something asshole");
      return;
    }

    fetch("/postComment", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        comment: commentText,
        time: getTime(),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        console.log(data.message);
        fillCommentStats(data.numberOfComments, data.commentCollection);
      });

    cancelComment();
  };

  fetch("/getComments")
    .then((res) => res.json())
    .then((data) => {
      fillCommentStats(data.numberOfComments, data.commentCollection);
    });
})();
// };

// mainComment();

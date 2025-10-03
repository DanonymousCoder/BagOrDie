const spinBtn = document.querySelector(".spin-btn");
const leaderboard = document.getElementById("leaderboard");
const circleCanvas = document.getElementById("myCanvas");
const userName = document.getElementById("username");
const exitBoard = document.getElementById("exit-board");
const container = document.getElementById("container");

leaderboard.addEventListener("click", () => {
    container.classList.add("leaderboard-active");
})

exitBoard.addEventListener("click", () => {
    container.classList.remove("leaderboard-active");
})

let circleCanvasX = circleCanvas.getContext("2d");
circleCanvasX.beginPath();
circleCanvasX.arc(100, 100, 100, 0, 2 * Math.PI);
circleCanvasX.stroke();
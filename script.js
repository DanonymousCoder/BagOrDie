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

const rotationValues = [
    {
        minAngle: 0,
        maxAngle: 30,
        value: 1
    },
    {
        minAngle: 31,
        maxAngle: 90,
        value: 2
    },
    {
        minAngle: 91,
        maxAngle: 150,
        value: 3
    },
    {
        minAngle: 151,
        maxAngle: 210,
        value: 4
    },
    {
        minAngle: 211,
        maxAngle: 270,
        value: 4
    },
    {
        minAngle: 271,
        maxAngle: 330,
        value: 5
    },
    {
        minAngle: 331,
        maxAngle: 360,
        value: 6
    }
];

const eachSize = [10, 10, 10, 10, 10, 10];

const wheelColors = [
    "#000000",
    "#000000",
    "#000000",
    "#000000",
    "#000000",
    "#000000"
]

let myChart = new Chart(circleCanvas, {
    plugins: [ChartDataLabels],
    type: "pie",
    data: {
        labels: [1, 2, 3, 4, 5, 6],
        datasets: [
            {
                backgroundcolor: wheelColors,
                data: eachSize
            }],
    },
    options: {
        responsive: true,
        animation: { duration: 0 },
        plugins: {
            tooltip: false,
            legend: { display: false },
            datalabels: {
                color: "#FFFFFF",
                formatter: (_, context) => context.chart.data.labels[context.dataIndex],
                font: { size: 24 },
            },
        },
    },
});
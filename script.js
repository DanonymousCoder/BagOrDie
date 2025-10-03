const spinBtn = document.querySelector(".spin-btn");
const leaderboard = document.getElementById("leaderboard");
const circleCanvas = document.getElementById("myCanvas");
const userName = document.getElementById("username");
const exitBoard = document.getElementById("exit-board");
const container = document.getElementById("container");
const finalVal = document.getElementById("final-value")

leaderboard.addEventListener("click", () => {
    container.classList.add("leaderboard-active");
})

exitBoard.addEventListener("click", () => {
    container.classList.remove("leaderboard-active");
})

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

const eachSize = [100, 100, 100, 100, 100, 100];

const wheelColors = [
    "#B21",
    "#B21",
    "#000000",
    "#000000",
    "#000000",
    "#000000"
]

let myChart = new Chart(circleCanvas, {
    plugins: [ChartDataLabels],
    type: "pie",
    data: {
        labels: ["DEATH", 2, 3, 4, 5, 6],
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
                font: { size: 20 },
            },
        },
    },
});


const getValue = (angVal) => {
    for (let i of rotationValues) {
        if (angVal <= i.maxAngle && angVal >= i.minAngle) {
            finalVal.innerHTML = `<p>You got + ${i.value}`;
            spinBtn.setAttribute("disabled", "false");
            break;
        }
    }
}


let count = 0;
let resultVal = 101;

spinBtn.addEventListener("click", () => {
    spinBtn.setAttribute("disabled", "true");
    finalVal.innerHTML = `<p>Pray for your butts</p>`;

    let randomAng = Math.floor(Math.random() * (355 - 0 + 1) + 0);

    let rotationInterval = window.setInterval(() => {
        myChart.options.rotation = myChart.options.rotation + resultVal;
        myChart.update();

        if (myChart.options.rotation >= 360) {
            count += 1;
            resultVal -= 5;
            myChart.options.rotation = 0;
        }

        else if (count > 15 && myChart.options.rotation == randomAng) {
            getValue(randomAng);
            clearInterval(rotationInterval);
            count = 0;
            resultVal = 101;
        }
    }, 10)
});
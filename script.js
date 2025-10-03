const spinBtn = document.querySelector(".spin-btn");
const leaderboard = document.getElementById("leaderboard");
const circleCanvas = document.getElementById("myCanvas");
const userName = document.getElementById("username");
const exitBoard = document.getElementById("exit-board");
const container = document.getElementById("container");
const finalVal = document.getElementById("final-value")
const box = document.getElementById("box");
const closeScore = document.getElementById("close");
const balance = document.getElementById("balance");

leaderboard.addEventListener("click", () => {
    container.classList.add("leaderboard-active");
})

exitBoard.addEventListener("click", () => {
    container.classList.remove("leaderboard-active");
})

closeScore.addEventListener("click", () => {
    box.style.display = "none"
})

const rotationValues = [
    {
        minAngle: 0,
        maxAngle: 30,
        value: "$10K"
    },
    {
        minAngle: 31,
        maxAngle: 90,
        value: "$10B"
    },
    {
        minAngle: 91,
        maxAngle: 150,
        value: "DEATH"
    },
    {
        minAngle: 151,
        maxAngle: 210,
        value: "$1"
    },
    {
        minAngle: 211,
        maxAngle: 270,
        value: "$500K"
    },
    {
        minAngle: 271,
        maxAngle: 330,
        value: "$10K"
    },
    {
        minAngle: 331,
        maxAngle: 360,
        value: "$1B"
    }
];

const eachSize = [80, 80, 80, 80, 80, 80];

const wheelColors = [
    "#000000",
    "#808080",
    "#808080",
    "#808080",
    "#808080",
    "#808080"
];

let myChart = new Chart(circleCanvas, {
    plugins: [ChartDataLabels],
    type: "pie",
    data: {
        labels: ["DEATH", "$10B", "$1K", "$1", "$500K", "$10K"],
        datasets: [
            {
                backgroundColor: wheelColors,
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


let moneyAddUp = 0;

const getValue = (angVal) => {
    for (let i of rotationValues) {
        if (angVal <= i.maxAngle && angVal >= i.minAngle) {
            finalVal.innerHTML = `+${i.value}`;
            box.style.display = "flex";
            spinBtn.setAttribute("disabled", "false");

            switch (i.value) {
                case "$1":
                    moneyAddUp += 1;
                    console.log(moneyAddUp);
                    balance.textContent = moneyAddUp.toLocaleString();
                    break;
                case "$1K":
                    moneyAddUp += 1000;
                    console.log(moneyAddUp);
                    balance.textContent = moneyAddUp.toLocaleString();
                    break;
                case "$10K":
                    moneyAddUp += 10000;
                    console.log(moneyAddUp);
                    balance.textContent = moneyAddUp.toLocaleString();
                    break;
                case "$500K":
                    moneyAddUp += 500000;
                    console.log(moneyAddUp);
                    balance.textContent = moneyAddUp.toLocaleString();
                    break;
                case "$10B":
                    moneyAddUp += 10000000000;
                    console.log(moneyAddUp);
                    balance.textContent = moneyAddUp.toLocaleString();
                    break;
                default:
                    moneyAddUp = 0.000;
                    console.log(moneyAddUp);
                    balance.textContent = moneyAddUp.toLocaleString();
            }
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
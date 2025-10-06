const spinBtn = document.querySelector(".spin-btn");
const leaderboard = document.getElementById("leaderboard");
const circleCanvas = document.getElementById("myCanvas");
let userName = document.getElementById("username");
const exitBoard = document.getElementById("exit-board");
const container = document.getElementById("container");
const finalVal = document.getElementById("final-value")
const box = document.getElementById("box");
const closeScore = document.getElementById("close");
const balance = document.getElementById("balance");
const spinArrow = document.getElementById("spin-arrow");
const board = document.querySelector(".board")

leaderboard.addEventListener("click", () => {
    board.style.display = "flex";
});

exitBoard.addEventListener("click", () => {
    board.style.display = "none";
});

closeScore.addEventListener("click", () => {
    box.style.display = "none"
});

const rotationValues = [
    {
        minAngle: 0,
        maxAngle: 60,
        value: "$10K"
    },
    {
        minAngle: 61,
        maxAngle: 120,
        value: "$10B"
    },
    {
        minAngle: 121,
        maxAngle: 180,
        value: "DEATH"
    },
    {
        minAngle: 181,
        maxAngle: 240,
        value: "$1"
    },
    {
        minAngle: 241,
        maxAngle: 300,
        value: "$500K"
    },
    {
        minAngle: 301,
        maxAngle: 360,
        value: "$10K"
    }
];

const eachSize = [80, 80, 80, 80, 80, 80];

const wheelColors = [
    "#bc1",
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
            // box.style.display = "flex";
            spinBtn.setAttribute("disabled", "false");
            console.log((i.value).toLocaleString())

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
                    moneyAddUp = 0;
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

    let randomAng = Math.floor(Math.random() * 354);


    let rotationInterval = window.setInterval(() => {
        myChart.options.rotation = myChart.options.rotation + resultVal;
        myChart.update();

        if (myChart.options.rotation >= 360) {
            count += 1;
            resultVal -= 5;
            myChart.options.rotation = 0;
        }

        else if (count > 15 && myChart.options.rotation == randomAng) {
            let adjustedAng = (360 - randomAng) % 360;
            getValue(adjustedAng);
            clearInterval(rotationInterval);
            count = 0;
            resultVal = 101;
        }
    }, 10)
});




userName.value = "D'anonymousCoder";
const STORAGE_KEYS = {
    CURRENT_BALANCE: "",
    PLAYER_NAME: "",
    GAME_SESSIONS: ""
}

function saveToLocal(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error("not saving local db:", error)
    }
}

function loadFromLocal(key, defVal = null) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defVal;
    } catch (error) {
        console.error("Error loading from local db");
        return defVal;
    }
}

function saveGameSession(score) {
    const sessions = loadFromLocal(STORAGE_KEYS.GAME_SESSIONS, []);
    const newSession = {
        mooney: moneyAddUp,
        spins: spins,
        playerName: userName.value || 'Anon',
        timestamp: new Date().toISOString(),
        date: new Date().toLocaleDateString()
    };

    sessions.unshift(newSession);

    if (sessions.length > 50) {
        sessions.splice(50);
    }

    saveToLocal(STORAGE_KEYS.GAME_SESSIONS, sessions)
}



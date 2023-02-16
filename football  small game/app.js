const football = document.querySelector(".football img");
const newGame = document.querySelector(".btn-new");
const keeper = document.querySelector(".keeper img");
const alretBox = document.querySelector(".alretBox");
const alretWord = document.querySelector(".alretBox h3");
const btnContainer = document.querySelector(".btn-container");
const penaltyCount1 = document.querySelector(".penalty-countOne");
const penaltyCountName1 = document.querySelector(".penalty-countOne h4");
const penaltyCount2 = document.querySelector(".penalty-countTwo");
const penaltyCountName2 = document.querySelector(".penalty-countTwo h4");
const btnKick = document.querySelectorAll(".btn-kick button");
const cirle = document.querySelectorAll(".cirle");
const gameOver = document.querySelector(".game-over");
const btnNext = document.querySelector(".btn-next");
const btnTeam = document.querySelector(".btn-team");
const teamImgContainer = document.querySelector(".teamImgContainer");
const allTeams = document.querySelectorAll(".teamImgContainer img");
const glory = document.getElementById("glory");
const messisong = document.getElementById("messisong");
const playerOne = document.querySelector(".playerOne img");
const playerTwo = document.querySelector(".playerTwo img");
const btnStart = document.createElement("button");
const youAndOppent = document.querySelector(".youAndOppent");
btnStart.classList.add("btn-start");
btnStart.append("Start");
let activePlayer = 0;
let teamLogo, teamPlayerName, teamPlayerImg, teamScore;
const gameInfor = document.querySelector(".gameInfor");
const teamContainer0 = document.querySelector(".team-container0");
const teamContainer1 = document.querySelector(".team-container1");
let footballCount = 1;
let circleCustom,
  circle,
  circleone,
  keeperOrShooter,
  keepOrShootDirection,
  goalAngle,
  teamNo,
  saveAngle,
  noforP2,
  btnS;
let paneltyshootCount = 1;
const score = [0, 0];

const teamArr = [
  {
    logo: `manu`,
    title: "Manchester United",
    player: [
      "Marcus Rashford",
      "Bruno Fernandes",
      "Antony",
      "Sancho",
      "Carsemiro",
    ],
    img: "goal",
  },
  {
    logo: "liver",
    title: "Liverpool",
    player: ["Van Dijk", "Andrew Robertson", "Salah", "Darwin Nunez", "Diaz"],
    img: "l",
  },
  {
    logo: "psg",
    title: "Paris Saint-Germain",
    player: [
      "Kylian Mbappe",
      "Neymar Jr",
      "Lionel Messi",
      "Marco Verratti",
      "Achraf Hakimi",
    ],
    img: "p",
  },
];

const saveArr = [
  "(230px,78px)",
  "(-250px,78px)",
  "(0,78px)",
  "(230px,-70px)",
  "(-260px,-70px)",
  "( 0,-70px)",
  "(0,0)",
  "(-250px,0)",
  "(240px,0)",
];
const goalArr = [
  "(250px,-400px)",
  "(-250px,-400px)",
  "(0px,-400px)",
  "(250px,-550px)",
  "(-250px,-550px)",
  "(0px,-550px)",
  "(0px,-480px)",
  "(-250px,-480px)",
  "(250px,-480px)",
];
const alretMessage = new Map([
  ["miss1", "Miss penalty"],
  ["goal1", "Goal! What a strike"],
  ["goal2", "Goal...Goal..."],
  ["save1", "Whata a Save  by GoalKeeper"],
  ["save2", "Unbelievable! Save by Goalkeeper"],
  [true, "This match is Draw"],
]);

//----changing original circle after match;

const changeOriginalCircle = () => {
  for (let i = 1; i <= 5; i++) {
    circle = document.querySelector(`.circle0${i}`);
    circleone = document.querySelector(`.circle1${i}`);
    circle.style.backgroundColor = "#fff";
    circleone.style.backgroundColor = "#fff";
    score[0] = 0;
    score[1] = 0;
    let score1 = document.querySelector(".p0");
    let score2 = document.querySelector(".p1");
    score1.textContent = `${score[0]}`;
    score2.textContent = `${score[1]}`;
  }
};
//New game--------------------------------------------------

newGame.addEventListener("click", () => {
  football.style.display = "none";
  football.style.transform = `none`;
  keeper.style.transform = `none`;
  alretBox.style.bottom = "-359px";
  gameOver.style.bottom = "-436px";
  paneltyshootCount = 1;
  activePlayer = 0;
  teamPlayerChange(teamNo, paneltyshootCount, 0);
  teamPlayerChange(noforP2, paneltyshootCount, 1);
  changeOriginalCircle();
  setTimeout(() => {
    football.style.display = "block";
  }, 600);
});

btnNext.addEventListener("click", () => {
  football.style.display = "none";
  football.style.transform = `none`;
  keeper.style.transform = `none`;
  alretBox.style.bottom = "-359px";
  if (paneltyshootCount < 6) {
    if (activePlayer === 0) {
      teamPlayerChange(teamNo, paneltyshootCount, activePlayer);
    } else {
      teamPlayerChange(noforP2, paneltyshootCount, activePlayer);
    }
  }
  setTimeout(() => {
    football.style.display = "block";
  }, 600);
});

//----------------team and player chnage-------------------------------

const teamPlayerChange = (team, p, activePlayer) => {
  teamLogo = document.querySelector(`.team-logo${activePlayer} img`);
  teamPlayerImg = document.querySelector(`.team-palyer${activePlayer} img`);
  teamPlayerName = document.querySelector(`.team-palyer${activePlayer} h5`);

  teamScore = document.querySelector(`.p${activePlayer}`);
  teamLogo.src = `img/${teamArr[team].logo}.png`;
  teamPlayerImg.src = `img/${teamArr[team].img}${p}.jpg`;
  teamPlayerName.textContent = `${teamArr[team].player[p - 1]}`;
};

//---------------------goal or save message--------------------------------
const alretBoxFun = (mess, goal1, goal2) => {
  setTimeout(() => {
    if (mess === "1" || mess === "3" || mess === "5" || mess === "7") {
      alretWord.textContent = alretMessage.get(goal1);
      alretBox.style.bottom = `250px`;
    } else {
      alretWord.textContent = alretMessage.get(goal2);
      alretBox.style.bottom = `250px`;
    }
  }, 200);
};
//shooting function-------------------------------------------

const goalorsave = (colorg, colorr) => {
  if (goalAngle !== saveAngle) {
    alretBoxFun(`${keepOrShootDirection}`, "goal1", "goal2");
    circleCustom.style.backgroundColor = colorg;
    score[activePlayer] = score[activePlayer] + 1;
    teamScore.textContent = `${score[activePlayer]}`;
    teamScore.style.display = "inline-block";
  } else {
    alretBoxFun(`${keepOrShootDirection}`, "save1", "save2");
    circleCustom.style.backgroundColor = colorr;
    score[activePlayer] = score[activePlayer];
    teamScore.textContent = `${score[activePlayer]}`;
    teamScore.style.display = "inline-block";
  }
};
const shooting = () => {
  btnKick.forEach((arrow) => {
    arrow.addEventListener("click", (e) => {
      if (paneltyshootCount <= 5) {
        circleCustom = document.querySelector(
          `.circle${activePlayer}${paneltyshootCount}`
        );

        keepOrShootDirection = Number(e.target.id);

        goalAngle = keepOrShootDirection;
        saveAngle = Math.trunc(Math.random() * 8);
        football.style.transform = `translate${goalArr[goalAngle]}`;
        keeper.style.transform = `translate${saveArr[saveAngle]}`;
        console.log(activePlayer);
        if (activePlayer === 0) {
          teamPlayerChange(teamNo, paneltyshootCount, activePlayer);
          goalorsave("#1d4ed8", "#d11212");
          teamContainer0.style.left = "0px";
          activePlayer = 1;
          paneltyshootCount -= 1;
        } else {
          teamPlayerChange(noforP2, paneltyshootCount, activePlayer);
          goalorsave("#1d4ed8", "#d11212", activePlayer);

          teamContainer1.style.right = "0px";
          activePlayer = 0;
        }
        paneltyshootCount++;
      } else {
        if (score[0] === score[1]) {
          gameInfor.textContent = "This match is Draw";
        } else if (score[0] > score[1]) {
          gameInfor.textContent = `${teamArr[teamNo].title} win this game`;
        } else {
          gameInfor.textContent = `${teamArr[noforP2].title} win this game`;
        }
        gameOver.style.bottom = "300px";
      }
    });
  });
};

//------------btn-Start--------------------------
const btnbegin = () => {
  btnS = document.querySelector(".btn-start");
  btnS.addEventListener("click", () => {
    youAndOppent.style.top = `-394px`;
    penaltyCount1.style.top = `30px`;
    penaltyCount2.style.top = `30px`;
    btnContainer.style.bottom = "70px";
    penaltyCountName1.textContent = `${teamArr[teamNo].title}`;
    penaltyCountName2.textContent = `${teamArr[noforP2].title}`;

    shooting();
  });
};

const teamchosing = () => {
  allTeams.forEach((team) => {
    team.addEventListener("click", (e) => {
      teamNo = Number(e.target.className.split("").at(-1));
      if (teamNo === 0) {
        noforP2 = Math.trunc(Math.random() * 2) + 1;
      } else if (teamNo === 1) {
        noforP2 = Math.trunc(Math.random() * 2) + 1;
        if (noforP2 === 1) {
          noforP2 = 0;
        }
      } else {
        noforP2 = Math.trunc(Math.random() * 2) + 1;
        if (noforP2 === 2) {
          noforP2 = 0;
        }
      }
      playerOne.src = `img/${teamArr[teamNo].logo}.png`;
      playerTwo.src = `img/${teamArr[noforP2].logo}.png`;
      youAndOppent.append(btnStart);
      btnbegin();
    });
  });
};
setTimeout(() => {
  youAndOppent.style.top = `100px`;
  teamchosing();
}, 1000);

//-----starting code-----------------------------------------------

//----------change footballl------------------
football.addEventListener("click", () => {
  footballCount += 1;
  if (footballCount === 8) {
    footballCount = 1;
  }
  if (footballCount <= 7) {
    football.src = `img/football${footballCount}.jpg`;
  }
});

/*
0rigth ground shoot translate(250px,-400px) 0
1left  ground shoot translate(-250px,-400px) 1
2center ground  shoot translate(0px,-400px) 2
-------------------------------------------
3right top shoot translate(250px,-550px) 5
4left top shoot translate(-250px,-550px) 6
5center top shoot translate(0px,-550px) 7
-----------------------------------------------
6center shoot translate(0px,-480px) 8
7center left shoot translate(-250px,-480px) 3
8center right shoot translate(250px,-480px) 4

---------------------------------keeper--------------------------------

0rigth ground save translate(230px,78px)
1letf ground save translate(-250px,78px)
2ground center save translate(0,78px)
3 left center save translate(-250px,0)
4 right center save translate(240px,0)

5 right top center save translate(230px,-70px)
6 let top center save translate(-260px,-70px)
7 cent top save translate( 0,-70px)
8 center save translate(0,0)
*/

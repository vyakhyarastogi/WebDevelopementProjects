const boxes = document.querySelectorAll(".box");
let gameInfo = document.querySelector(".game-info");
let newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid; // kya saare cells fill ho chuke hai ua ni

const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]

];

// lets create a funcruon to initialise the game

function initGame() {
    currentPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    // Ui pr b empty krna hoga boxes ko

    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        // remove green color 
        box.classList = `box box${index + 1}`;
    })

    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player-${currentPlayer}`;

}
initGame();

function swapTurn() {
    if (currentPlayer === "X") {
        currentPlayer = "0";
    }
    else {
        currentPlayer = "X";
    }

    // update in UI
    gameInfo.innerText = `Current Player-${currentPlayer}`;
}


function checkGameOver() {
    let answer = "";

    winningPositions.forEach((position) => {
        // all three boxes should be non empryt and must have same values
        if ((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "")
            && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])) {

            //check if winner is X
            if (gameGrid[position[0]] === "X")
                answer = "X";
            else {
                answer = "O";
            }

            // diable pointer event-> inorder to get single winner at a time
            boxes.forEach(box => {
                box.style.pointerEvents = "none";
            })

            // now we know X/0 is a winner
            // mark green color
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");



        }
    });

    //it menas we have a winner
    if (answer !== "") {
        gameInfo.innerText = `Winner Player-${answer}`;
        newGameBtn.classList.add("active");
        return; // when wegot winner
    }

    // when there is no winner then u reach here
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if (box !== "") {
            fillCount++;
        }
    });

    // borad is filled,game tied
    if (fillCount === 9) {
        gameInfo.innerText = "Game Tied !";
        newGameBtn.classList.add("active");
    }



}



function handleClick(index) {
    if (gameGrid[index] == "") {
        boxes[index].innerText = currentPlayer;  // reflect change in UI

        gameGrid[index] = currentPlayer; // MAKE change in gameHrid we have made

        boxes[index].style.pointerEvents = "none";

        // swap turn
        swapTurn();
        // koi jeet toh ni gya
        checkGameOver();


    }
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
});

newGameBtn.addEventListener("click", initGame);





/* handleClick() function-->
if box clicked is empty then:
1)make it unclickable
2)change box value to X or 0
3)player change
4)swap turn (takes care of players turn)
5)check kaun jeet
            


*/


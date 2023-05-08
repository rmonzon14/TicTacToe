const gameBoard = (() => {
    let gameBoardData = [];

    const setGameBoard = (i, data) => {
        gameBoardData[i] = data;
    }

    const getGameBoard = () => {
        return gameBoardData;
    }

    const resetGameBoard = () => {
        gameBoardData = [];
    }

    return {getGameBoard, setGameBoard, resetGameBoard}
})();

const Player = (sign) => {
    let score = 0;

    const getScore = () => score;

    const getSign = () => sign;

    const updateScore = () => score += 1;

    return {getScore, getSign, updateScore}
}

const game = (() => {
    let round = 1;

    const setRound = (round) => round = round;

    const getRound = () => round;

    const addRound = () => round++;

    const reduceRound = () => round--;

    const resetGame = () => location.reload();

    return {setRound, getRound, addRound, reduceRound, resetGame}
})();

const gameBoardController = (() => {
    const player1 = Player("X");
    const player2 = Player("O");
    
    const squares = document.querySelectorAll(".squares"); 

    const addSign = (() => {
        squares.forEach(data => {
            data.addEventListener("click", e  => {
                if (data.textContent == "") {
                    handleSquareClick(e.target);
                    if (gameBoard.getGameBoard().filter(String).length >= 5) {
                        checkWinner();
                    }      
                }
            })
        });

        const handleSquareClick = (e) => {
            if (gameBoard.getGameBoard().filter(String).length % 2 == 0) {
                e.textContent = player1.getSign();
                e.classList.add("cross");
                gameBoard.setGameBoard(e.getAttribute("data-square"), player1.getSign());
            } else {
                e.textContent = player2.getSign();
                e.classList.add("circle");
                gameBoard.setGameBoard(e.getAttribute("data-square"), player2.getSign());
            }       
        }
    })();

    const checkWinner = () => {

        let isTied = true;

        const winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 4, 8],
            [2, 4, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 3, 6]
        ]
        
        winConditions.forEach(array=> {
            const circleWins = array.every(i => squares[i].classList.contains("circle"));
            const crossWins = array.every(i => squares[i].classList.contains("cross"));

            if (circleWins) {
                isTied = false;

                setTimeout(() => {
                    showResult(`Player 2 won round ${game.getRound()}`);
                }, 900)

                setTimeout(resetGameBoard, 200);
                player2.updateScore();
                document.getElementById("circle-score").textContent = player2.getScore();
            }
            
            if (crossWins) {
                isTied = false;

                setTimeout(() => {
                    showResult(`Player 1 won round ${game.getRound()}`);
                }, 900) 

               setTimeout(resetGameBoard, 200);
               player1.updateScore();
               document.getElementById("cross-score").textContent = player1.getScore();
            } 
        });

        if (gameBoard.getGameBoard().filter(String).length == 9 && isTied) {
            setTimeout(() => {
                showResult("It's a tie!");
            }, 900) 

           setTimeout(resetGameBoard, 200);
           game.reduceRound();
        }
    };

    const showResult = (result) => {
        const winnerModal = document.getElementById("winner-modal");
        const roundResult = document.getElementsByClassName("round-result")[0];

        winnerModal.style.display = "block";

        if (player1.getScore() == 3 || player2.getScore() == 3) {
            document.getElementsByClassName("game-winner-modal")[0].setAttribute("style", "font-size: 2.4rem; display: flex; flex-direction: column; align-items: center; justify-content: center;");
            document.getElementsByClassName("round-winner-modal")[0].style.display = "none";

            if (player1.getScore() > player2.getScore()) {
                document.getElementsByClassName("game-result")[0].textContent = "Player 1 Won The Game";
            } else {
                document.getElementsByClassName("game-result")[0].textContent = "Player 2 Won The Game";
            }

        } else {
            winnerModal.classList.add("winner-modal-show");
            game.addRound();
            roundResult.textContent = result;
        }
    }

    const resetGameBoard = () => {
        const winnerModal = document.getElementById("winner-modal");
        const gameBoardDisplay = document.getElementById("game-board");

        squares.forEach(data => {
            data.textContent = "";
            data.classList.remove("cross", "circle");
        })

        gameBoardDisplay.classList.add("game-board-hidden");
        gameBoard.resetGameBoard();

        const next = document.getElementsByClassName("next")[0];
        next.addEventListener("click", () => {
            gameBoardDisplay.classList.remove("game-board-hidden");
            winnerModal.style.display = "none";
        })
    }

    const playAgain = document.getElementsByClassName("play-again")[0];
    playAgain.addEventListener("click", () => {
        game.resetGame();
    });
})();




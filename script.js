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

    const updateRound = () => round++;

    return {setRound, getRound, updateRound}
})();

const gameBoardController = (() => {
    const player1 = Player("X");
    const player2 = Player("O");
    
    const addSign = (() => {
        const squares = document.querySelectorAll(".squares");    

        squares.forEach(data => {
            data.addEventListener("click", e  => {
                if (data.textContent == "") {
                    handleSquareClick(e.target);
                    if (gameBoard.getGameBoard().filter(String).length >= 5) {
                        checkWInner();
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

    const checkWInner = () => {
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

        const squares = document.querySelectorAll(".squares");
        
        winConditions.forEach(array=> {
            const circleWins = array.every(i => squares[i].classList.contains("circle"));
            const crossWins = array.every(i => squares[i].classList.contains("cross"));

            if (circleWins) {
                setTimeout(() => {
                    showWinner("circle");
                }, 1000)
                setTimeout(resetGameBoard, 500);
                player1.updateScore();
            }

            if (crossWins) {
                setTimeout(() => {
                    showWinner("cross");
                }, 1000)         
               setTimeout(resetGameBoard, 500);
               player2.updateScore();
            }
        });
    };

    const showWinner = (player) => {
        const winnerModal = document.getElementById("winner-modal");
        const winnerName = document.getElementsByClassName("winner-name")[0];
        const roundNumber = document.getElementsByClassName("round-number")[0];

        winnerModal.classList.add("winner-modal-show");
        winnerModal.style.display = "block";
        winnerName.textContent = player;
        roundNumber.textContent = game.getRound();
        game.updateRound();
    }

    const resetGameBoard = () => {
        const winnerModal = document.getElementById("winner-modal");
        const squares = document.querySelectorAll(".squares");  
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
    
})();




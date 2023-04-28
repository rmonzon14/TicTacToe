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
                handleSquareClick(e.target);
                checkWInner();
            }, {once: true})
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

        const square = document.querySelectorAll(".squares");
        
        winConditions.forEach(array=> {
            const circleWins = array.every(i => square[i].classList.contains("circle"));
            const crossWins = array.every(i => square[i].classList.contains("cross"));

            if (circleWins) {
                showWinner("Circle");
            }

            if (crossWins) {
                showWinner("Cross");
            }
        });
    };

    const resetGameBoard = () => {
        const squares = document.querySelectorAll(".squares");  

        squares.forEach(data => {
            data.textContent = "";
        })

        gameBoard.resetGameBoard();
    }

    const showWinner = (player) => {
        const gameBoard = document.getElementById("game-board");
        const winnerModal = document.getElementById("winner-modal");
        const winnerName = document.getElementsByClassName("winner-name")[0];
        const roundNumber = document.getElementsByClassName("round-number")[0];

        gameBoard.classList.add("game-board-hidden");
        winnerModal.classList.add("winner-modal-show");
        winnerModal.style.display = "block";
        winnerName.textContent = player;
        roundNumber.textContent = game.getRound();

        console.log(winnerModal);

        const next = document.getElementsByClassName("next")[0];

        next.addEventListener("click", () => {
            resetGameBoard();
            gameBoard.classList.remove("game-board-hidden");
            gameBoard.classList.add("game-board-show");
            
        })
    }
})();




const gameBoard = (() => {
    let gameBoardData = [];

    const setGameBoard = (i, data) => {
        gameBoardData[i] = data;
    }

    const getGameBoard = () => {
        return gameBoardData;
    }

    return {getGameBoard, setGameBoard}
})();

const Player = (sign) => {
    let score = 0;

    const getScore = () => score;

    const getSign = () => sign;

    const updateScore = () => score += 1;

    return {getScore, getSign, updateScore}
}

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
            [2, 5, 8]
        ]

        const square = document.querySelectorAll(".squares");
        
        winConditions.forEach(array=> {
            const circleWins = array.every(i => square[i].classList.contains("circle"));
            const crossWins = array.every(i => square[i].classList.contains("cross"));

            if (circleWins) {
                console.log("Circle Wins");
            }

            if (crossWins) {
                console.log("Cross Wins");
            }
        });
    };
})();




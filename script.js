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

    const squaresDivs = document.getElementsByClassName("squares");    
    const squares = Array.from(squaresDivs);

    const addSign = (() => {
        squares.forEach(data => {
            data.addEventListener("click", e => {
                if (gameBoard.getGameBoard().filter(String).length % 2 == 0) {
                    e.target.textContent = player1.getSign();
                    gameBoard.setGameBoard(data.getAttribute("data-square"), player1.getSign());
                } else {
                    e.target.textContent = player2.getSign();
                    gameBoard.setGameBoard(data.getAttribute("data-square"), player2.getSign());
                }
            });
        });
    })();

    if (gameBoard.getGameBoard.length() == 9) {
        
    }

})();




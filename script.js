const gameBoard = (() => {
    let gameBoardData = ["X", "O", "X", "O", "X", "O", "X", "O", "X"];

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
    const squaresDivs = document.getElementsByClassName("squares");    
    const squares = Array.from(squaresDivs);

    squares.forEach((square, i) => {
        square.addEventListener("click", ()  => {
            square.textContent = gameBoard.getGameBoard()[i];
        });
    })

})();


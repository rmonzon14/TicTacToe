const gameBoard = () => {
    let gameBoardData = ["X", "O", "X", "O", "X", "O", "X", "O", "X"];

    const getGameboard = () => {
        return gameBoardData;
    }

    const setGameBoard = (i, data) => {
        gameBoardData[i] = data;
    }

    return {getGameboard, setGameBoard}
}
const GameBoard = (() => {
    let board = ["", "", "", "", "", "", "", "", ""];

    const winConditions = [
        [0, 1, 2],
        [0, 3, 6],
        [0, 4, 8],
        [1, 4, 7],
        [2, 5, 8],
        [3, 4, 5],
        [6, 7, 8],
        [2, 4, 6]
    ];

    const resetBoard = () => {
        for (let index = 0; index < board.length; index++) {
            board[index] = "";
        }
    };

    return { board, winConditions, resetBoard };
})();




const Controll = (() => {

    const Players = [{ name: 'Player X', marker: 'X', score: 0 }, { name: 'Player O', marker: 'O', score: 0 }];
    let active = Players[0];
    const gBoard = document.querySelector('#gameboard');
    const cells = gBoard.querySelectorAll('*');
    const score1 = document.querySelector('#score1');
    const score2 = document.querySelector('#score2');


    function refresh() {
        document.querySelector('#title').innerHTML = active.name + '`s turn';
        for (let index = 0; index < 9; index++) {
            cells[index].innerHTML = GameBoard.board[index];           
        }
        score1.innerHTML = Players[0].name + ' score: ' + Players[0].score;
        score2.innerHTML = Players[1].name + ' score: ' + Players[1].score;

    }

    function switchActive() {
        active = active === Players[0] ? Players[1] : Players[0];
    }

    function addMarker(index) {
        if (GameBoard.board[index] === "") {
            GameBoard.board[index] = active.marker;
            checkEnd();
            switchActive();
            refresh();
            document.querySelector('#new').hidden = false;
        }
    }

    function incrementScore(player) {
        player.score += 1;
    }

    function checkEnd() {
        const board = GameBoard.board;
        const winConditions = GameBoard.winConditions;
        const X = Players[0].marker;
        const O = Players[1].marker;

        for (let i = 0; i < winConditions.length; i++) {
            let [a, b, c] = winConditions[i];

            if (board[a] === X && board[b] === X && board[c] === X) {
                console.log(Players[0].name + ' Wins!');
                incrementScore(Players[0]);
                playAgain();
                return;
            } else if (board[a] === O && board[b] === O && board[c] === O) {
                console.log(Players[1].name + ' Wins!');
                incrementScore(Players[1]);
                playAgain();
                return;
            }
        }

        if (board.every(value => value !== "")) {
            console.log('Its a draw');
            playAgain();
        }
    }

    function playAgain() {
        GameBoard.resetBoard(); 
        refresh();     
    }

    function newGame() {
        GameBoard.resetBoard(); 
        active = Players[0];
        Players[0].score = 0;
        Players[1].score = 0;
        document.querySelector('#new').hidden = false;
        refresh();  
    }

    return { Players, switchActive, incrementScore, addMarker, checkEnd, playAgain, newGame };
})();


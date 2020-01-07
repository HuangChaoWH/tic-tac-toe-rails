/*
 * Tic Tac Toe
 */
var N_SIZE = 3,
    EMPTY = "&nbsp;",
    boxes = [],
    turn = "X",
    score,
    moves;

var board_login;
var winItems;
var board;

/*
 * Initializes the Tic Tac Toe board and starts the game.
 */
function init() {
    // ---- login board
    board_login = document.getElementById("board_login");
    board_login.setAttribute("class", "board_login" );

    // player 1
    var player1 = document.createElement('div');
    document.getElementById('board_login').appendChild(player1);
    player1.setAttribute("class", "player1" );
    player1.textContent = 'Player 1';

    var player1_input = document.createElement('div');
    document.getElementById('board_login').appendChild(player1_input);
    player1_input.setAttribute("class", "player1_input" );

    var player1_input_text = document.createElement('input');
    document.getElementById('board_login').appendChild(player1_input_text);
    player1_input_text.setAttribute("class", "player1_input_text" );
    player1_input_text.setAttribute("id", "player1_input_text" );

    player1_input_text.setAttribute("type", "text" );

    player1_input_text.setAttribute("minlength", "3" );
    player1_input_text.setAttribute("maxlength", "10" );

    //  player 2
    var player2 = document.createElement('div');
    document.getElementById('board_login').appendChild(player2);
    player2.setAttribute("class", "player2" );
    player2.textContent = 'Player 2';

    var player2_input = document.createElement('div');
    document.getElementById('board_login').appendChild(player2_input);
    player2_input.setAttribute("class", "player2_input" );

    var player2_input_text = document.createElement('input');
    document.getElementById('board_login').appendChild(player2_input_text);
    player2_input_text.setAttribute("class", "player2_input_text" );
    player2_input_text.setAttribute("id", "player2_input_text" );
    player2_input_text.setAttribute("type", "text" );

    player2_input_text.setAttribute("required", "");
    player2_input_text.setAttribute("minlength", "3" );
    player2_input_text.setAttribute("maxlength", "10" );

    // size board
    var size_board = document.createElement('div');
    document.getElementById('board_login').appendChild(size_board);
    size_board.setAttribute("class", "size_board" );
    size_board.textContent = 'Size board';
    
    var size_board_input = document.createElement('div');
    document.getElementById('board_login').appendChild(size_board_input);
    size_board_input.setAttribute("class", "size_board_input" );

    var size_board_input_text = document.createElement('input');
    document.getElementById('board_login').appendChild(size_board_input_text);
    size_board_input_text.setAttribute("class", "size_board_input_text" );
    size_board_input_text.setAttribute("id", "size_board_id" );
    size_board_input_text.setAttribute("type", "number" );
    size_board_input_text.setAttribute("value", "3" );
    size_board_input_text.setAttribute("min", "3" );
    size_board_input_text.setAttribute("max", "5" );
    
    // new game group
    var new_game_group = document.createElement('div');
    document.getElementById('board_login').appendChild(new_game_group);
    new_game_group.setAttribute("class", "new_game_group" );
    new_game_group.setAttribute("id", "new_game_group" );

    // new game button
    var new_game_button = document.createElement('input');
    document.getElementById('new_game_group').appendChild(new_game_button);
    new_game_button.setAttribute("class", "new_game_button" );
    new_game_button.setAttribute("type", "submit" );
    new_game_button.setAttribute("value", "New Game" );
    new_game_button.addEventListener("click", login_submit);

    // ---- board for tictactoe
    board = document.getElementById("board");
    board.setAttribute("class", "board" );
    board.style.border = 'solide';

    tictactoe_init();
}

function login_submit() {
    // Check two input text valid data
    var a = document.getElementById("player1_input_text").value;
    var b = document.getElementById("player2_input_text").value;
    if (a == null || a == "", b == null || b == "") {
        alert("Please Fill All Required Field");
        return false;
    }
  
    board_login.style.display = "none";
    N_SIZE = document.getElementById("size_board_id").value;

    tictactoe_init();
    startNewGame();
}

function tictactoe_init() {
    // remove all child element
    var node= document.getElementById("tictactoe");
    node.querySelectorAll('*').forEach(n => n.remove());
    boxes = [];

    let num1 = N_SIZE * 134 + ( N_SIZE - 1 ) * 15 + 28 + 143;
    let num2 = N_SIZE * 134 + ( N_SIZE - 1 ) * 15 + 28 + 164;
    board.style.width = num1.toString() + 'px';
    board.style.height = num2.toString() + 'px';

    // ---- tictactoe
    var tictactoe = document.getElementById("tictactoe");
    tictactoe.setAttribute("class", "tictactoe" );
    
    let num = N_SIZE * 134 + ( N_SIZE - 1 ) * 15 + 28;
    tictactoe.style.width = num.toString() + 'px';
    tictactoe.style.height = num.toString() + 'px';
    
    var identifier = 1;
    for (var i = 0; i < N_SIZE; i++) {
        for (var j = 0; j < N_SIZE; j++) {

            var cell = document.createElement('div');
            tictactoe.appendChild(cell);
            cell.setAttribute("class", "cell" );
        
            cell.style.top =  (14 + i * ( 16 + 134 ) ).toString() + 'px';
            cell.style.left = (14 + j * ( 16 + 134 ) ).toString() + 'px';
            
            cell.classList.add('col' + j,'row' + i);
            if (i == j) {
                cell.classList.add('diagonal0');
            }
            if (j == N_SIZE - i - 1) {
                cell.classList.add('diagonal1');
            }
            cell.identifier = identifier;
            cell.addEventListener("click", set);

            boxes.push(cell);
            identifier += identifier;
        }
    }

    boxes.forEach( square => {
        square.style.background = "rgba(238, 228, 218, 0.35)";
    })
}

function startNewGame() {
    score = {
        "X": 0,
        "O": 0
    };
    moves = 0;
    turn = "X";
    boxes.forEach(function (square) {
        square.innerHTML = EMPTY;
    });
}

/*
* Check if a win or not
*/
function win(clicked) {
    // Get all cell classes
    var memberOf = clicked.className.split(/\s+/);

    // ignore first className, 'cell'
    for (var i = 1; i < memberOf.length; i++) {
        var testClass = '.' + memberOf[i];
        var items = contains('#tictactoe ' + testClass, turn);
        
        // winning condition: turn == N_SIZE
        if (items.length == N_SIZE) {
            winItems = items;
            return true;
        }
    }
    return false;
}

function contains(selector, text) {
    var elements = document.querySelectorAll(selector);

    return [].filter.call(elements, function(element){
        return RegExp(text).test(element.textContent);
    });
}

/*
* Sets clicked square and also updates the turn.
*/
function set() {
    if (this.innerHTML !== EMPTY) {
        return;
    }
    this.innerHTML = turn;
    this.style.color = turn === "X" ? "#776E65" : "#F59563";

    moves += 1;
    score[turn] += this.identifier;

    if (win(this)) {
        boxes.forEach(item => {
            item.innerHTML = EMPTY;
        });
        winItems.forEach(item => {
            item.innerHTML = turn;
            item.style.background = "#F59563";
            item.style.color = "#FFFFFF";
        });
        board_login.style.display = "block";
    } else if (moves === N_SIZE * N_SIZE) {
        board_login.style.display = "block";
    } else {
        turn = turn === "X" ? "O" : "X";
    }
}

$(function() {
    init();
});
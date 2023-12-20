'use strict'

const playfieldColumns = 10;
const playfieldRows = 20;

const tetrominoNames = [
    'o'
];

const tetrominoes = {
    'o': [
        [1, 1],
        [1, 1]
    ]
};

let playField;
let tetromino;

function convertPositionToIndex(row, column){
    return row * playfieldColumns + column
}

function generatePlayField(){
  for (let i = 0; i < playfieldRows * playfieldColumns; i++){
    const div = document.createElement('div');
    document.querySelector('.tetris').append(div);
    
  }

  playField = new Array(playfieldRows).fill()
        .map(()=> new Array(playfieldColumns).fill(0))
        console.log(playField);
};


function generateTetromino() {
    const nameTetro = 'o';
    const matrixTetro = tetrominoes[nameTetro];

    const columnTetro = 4;
    const rowTetro    = 0;

    tetromino = {
        name: nameTetro,
        matrix: matrixTetro,
        row: rowTetro,
        column: columnTetro,
    }
}

generatePlayField();
generateTetromino();
const cells = document.querySelectorAll('.tetris div');

function drawPlayField(){

    for (let row = 0; row < playfieldRows; row++) {
        for(let column = 0; column < playfieldColumns; column++){
            
            const name = playField[row][column];
            const cellIndex = convertPositionToIndex(row, column);
            cells[cellIndex].classList.add(name);
        }
    }
}

function drawTetromino() {
    const name = tetromino.name;
    const tetrominoMatrixSize = tetromino.matrix.length;

    for(let row = 0; row < tetrominoMatrixSize; row++){
        for(let column = 0; column < tetrominoMatrixSize; column++){

            const cellIndex = convertPositionToIndex(tetromino.
            row + row, tetromino.column + column);
            cells[cellIndex].classList.add(name);
        }
    }
}

drawTetromino();

function draw(){
    cells.forEach(function(cell){ cell.removeAttribute('class')});
    drawPlayField();
    drawTetromino();

}

///////////////////////////Down Left Right ////////////////

document.addEventListener('keydown', onKeyDown)

function onKeyDown(event){
    console.log(event);
    switch(event.key){
        case 'ArrowDown':
            moveTetrominoDown();
            break;
        case 'ArrowLeft':
            moveTetrominoLeft();
                break;
        case 'ArrowRight':
            moveTetrominoRight();
                break;        
    }
    draw();
}
function moveTetrominoDown() {
    tetromino.row += 1;
    if(isOutsideOfGameBoard()){
        tetromino.row -= 1;
        placeTetromino();
    }
    
}

function moveTetrominoLeft() {
    tetromino.column -= 1
    if(isOutsideOfGameBoard()){
        tetromino.column += 1;
    }
}

function moveTetrominoRight() {
    tetromino.column += 1
    if(isOutsideOfGameBoard()){
        tetromino.column -= 1;
    }
}

function isOutsideOfGameBoard() {
    const matrixSize = tetromino.matrix.length;
    for(let row = 0; row < matrixSize; row++){
        for(let column = 0; column < matrixSize; column++){
            if(tetromino.column + column < 0 || 
               tetromino.column + column >= playfieldColumns ||
               tetromino.row + row >= playField.length) {
                return true;
            }
           
        }
    }
    return false;
    
}

function placeTetromino(){
    const matrixSize = tetromino.matrix.length;
    for(let row = 0; row < matrixSize; row++) {
        for(let column = 0; column < matrixSize; column++){
           if(!tetromino.matrix[row][column]) continue;

           playField[tetromino.row + row][tetromino.column + column] = tetrominoNames[0];
        }
    }

    generateTetromino();
}
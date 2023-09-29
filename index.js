var dem = 0;
let range;

// Define the function to generate a chessboard
function generateChessboard(boardId, Size) {
    const size = Size;
    const chessboard = document.createElement('div');
    chessboard.classList.add(boardId, 'chessboard');

    for (let row = 0; row < size; row++) {
        const rowDiv = document.createElement('div');
        rowDiv.classList.add(`row-${row}`);

        for (let col = 0; col < size; col++) {
            const button = document.createElement('button');
            button.classList.add('block');
            button.id = `${row}${col}`;
            rowDiv.appendChild(button);
        }

        chessboard.appendChild(rowDiv);
    }

    document.body.appendChild(chessboard);
}


function calculate(Size, X, Y) {
    // init some variable
    const size = Size;
    const MaxN = 1 + 1e5;
    const mark = new Array(3).fill(null).map(() => new Array(MaxN).fill(false));
    const res = [];
    const solutions = [];
    async function Try(row) {
        if (row === size) {
            const solution = [...res];
            solutions.push(solution);
            if(solution[X] == Y){
                await printChessboardAsync(solution);
            }
            return;
        }
        for (let col = 0; col < size; ++col) {
            const mainDiagonal = row - col + size;
            const subDiagonal = row + col;
            if (mark[0][col] || mark[1][mainDiagonal] || mark[2][subDiagonal]) continue;
            mark[0][col] = true;
            mark[1][mainDiagonal] = true;
            mark[2][subDiagonal] = true;
            res.push(col);
            await Try(row + 1);
            res.pop();
            mark[0][col] = false;
            mark[1][mainDiagonal] = false;
            mark[2][subDiagonal] = false;
        }
    }
    Try(0);
    //In ra tất cả các đáp án
    // if(solutions.length == 0){
    //     alert("Khong co ket qua nao hop le!!")
    //     resetCal();
    //     return;
    // }
    console.log(solutions.length);

    async function printChessboardAsync(solution) {
        return new Promise((resolve) => {
            setTimeout(() => {
                printChessboard(solution);
                resolve();
            }, 0);
        });
    }

    function printChessboard(solution){
        dem += 1;
        if (dem > 1) {
            generateChessboard(`chessboard-${dem}`, size);
        }
        const chessboardBlocks = document.querySelectorAll(`.chessboard-${dem} button`);
        for (let i = 0; i < size; i++) {
            const id = i.toString() + solution[i].toString();
            const clickedBlock = Array.from(chessboardBlocks).find(block => block.id == id);
            if (clickedBlock) {
                clickedBlock.style.backgroundImage = 'url(/images/queen.svg)';
            }
        }
    }
}

function submitSize(){
    var sizeInput = document.getElementById("size").value;
    range = parseInt(sizeInput);
    if(range >= 16 || range <=0){
        alert("Invalid inpue value!! 0r Can't caculate this number");
        resetCal();
        return;
    }
    generateChessboard(`chessboard-${1}`, parseInt(sizeInput));
    // Get all the button elements
    const buttons = document.querySelectorAll('.chessboard-1 button');
    // Add a click event listener to each button
    buttons.forEach(button => {
        button.addEventListener('click', function (event) {
            // Get the ID of the clicked button
            const buttonId = event.target.id;
            const x = parseInt(buttonId.charAt(0));
            const y = parseInt(buttonId.charAt(1));
            calculate(range, x, y);
            return;
        });
    }); 
}

function resetCal(){
    location.reload();
}




























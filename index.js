window.onload = async function () {
    let table = document.getElementById("board");
    let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    let numRows = table.rows.length;
    const restart = document.getElementById("button")
    let clickColor = "rgba(66, 36, 214, 0.453)"

    //figury
    const brook = "♜"
    const bbishop = "♝";
    const bknight = "♞"
    const bqueen = "♛"
    const bking = "♚"
    const bpawn = "♟";
    const wrook = "♖"
    const wpawn = "♙";
    const wbishop = "♗";
    const wknight = "♘"
    const wqueen = "♕"
    const wking = "♔"

    for (let i = 1, row; row = table.rows[i]; i++) {
        for (let j = 0, cell; cell = row.cells[j]; j++) {
            if (j == 8) {
                break;
            }
            cell.id = letters[j] + (numRows - i);
            if ((i + j) % 2 === 0) {
                cell.style.backgroundColor = "green";
            } else {
                cell.style.backgroundColor = "wheat";
                cell.style.color = "green";
            }

            //szachownica na start
            function start() {
                console.log("restart")
                let row2 = table.rows[2];
                let row0 = table.rows[0]
                let row7 = table.rows[7]

                for (let j = 0, cell; cell = row2.cells[j]; j++) {
                    if (j == 8) {
                        break;
                    }
                    cell.innerHTML = bpawn;
                }

                for (let j = 0, cell; cell = row7.cells[j]; j++) {
                    if (j == 8) {
                        break;
                    }
                    cell.innerHTML = wpawn;
                }
                for (let j = 0, cell; cell = row0.cells[j]; j++) {
                    if (j == 8) {
                        cell.style.backgroundColor = "blue"
                        cell.id = "restart"
                        break;
                    }
                    cell.innerHTML = j + 1;
                }

                //white pieces
                cell.id == ("a1") ? cell.innerHTML = wrook : " "
                cell.id == ("h1") ? cell.innerHTML = wrook : " "
                cell.id == ("b1") ? cell.innerHTML = wknight : " "
                cell.id == ("g1") ? cell.innerHTML = wknight : " "
                cell.id == ("c1") ? cell.innerHTML = wbishop : " "
                cell.id == ("f1") ? cell.innerHTML = wbishop : " "
                cell.id == ("d1") ? cell.innerHTML = wqueen : " "
                cell.id == ("e1") ? cell.innerHTML = wking : " "

                //black pieces
                cell.id == ("a8") ? cell.innerHTML = brook : " "
                cell.id == ("h8") ? cell.innerHTML = brook : " "
                cell.id == ("b8") ? cell.innerHTML = bknight : " "
                cell.id == ("g8") ? cell.innerHTML = bknight : " "
                cell.id == ("c8") ? cell.innerHTML = bbishop : " "
                cell.id == ("f8") ? cell.innerHTML = bbishop : " "
                cell.id == ("d8") ? cell.innerHTML = bqueen : " "
                cell.id == ("e8") ? cell.innerHTML = bking : " "
            }

            start();

            function addOnclickToCell(cell) {
                cell.onclick = function () {
                    console.log(cell.innerHTML + " cell.innerHTML")
                    console.log(cell.id + " cell.id")
                    // let choicedCell = document.getElementById(cell.id);

                    // pawns movement
                    let color = "";
                    if (cell.innerHTML.includes(bpawn) || cell.innerHTML.includes(wpawn)) {

                        //get Id of cell ahead
                        let cellsAvailable = []
                        if (cell.innerHTML.includes(bpawn)) {
                            let cellAheadId = parseFloat(cell.id[1]) - 1;
                            if (cell.id[1] == 7) {
                                let secondCellAheadId = parseFloat(cell.id[1]) - 2;
                                toString(secondCellAheadId)
                                secondCellAheadId = cell.id[0] + secondCellAheadId
                                cellsAvailable.push(secondCellAheadId)
                            }
                            toString(cellAheadId)
                            cellAheadId = cell.id[0] + cellAheadId

                            cellsAvailable.push(cellAheadId)
                            color = bpawn
                        } else if (cell.innerHTML.includes(wpawn)) {
                            let cellAheadId = parseFloat(cell.id[1]) + 1;
                            if (cell.id[1] == 2) {
                                let secondCellAheadId = parseFloat(cell.id[1]) + 2;
                                toString(secondCellAheadId)
                                secondCellAheadId = cell.id[0] + secondCellAheadId
                                cellsAvailable.push(secondCellAheadId)
                            }
                            toString(cellAheadId)
                            cellAheadId = cell.id[0] + cellAheadId

                            cellsAvailable.push(cellAheadId)
                            color = wpawn
                        }
                            console.log(cellsAvailable + " cellsAvailable")

                            cellsAvailable.forEach(function (cellId) {
                                let choice = document.getElementById(cellId);
                                if (choice && choice.innerHTML == "") {
                                    choice.onclick = function () {
                                        choice.innerHTML = color;
                                        cell.innerHTML = " ";
                                        addOnclickToCell(choice);  // Add onclick to the new cell
                                    }
                                }
                            });
                            console.log("_______________")
                        } else {
                           return;
                        }
                    }
                }
                // Add onclick to each cell
                addOnclickToCell(cell);
            }
        }
        restart.onclick = function () {
            window.location.reload();
        }
    }
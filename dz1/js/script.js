//
// Установка  игрового поля, Создание матрицы
//
function Matrix(containerId, rows, cols, widthitem) {
    this.containerId = document.getElementById(containerId);
    this.containerId.style.width = rows * widthitem + 'px';
    this.containerId.style.height = cols * widthitem + 'px';

    this.create = function () {
        colls = rows * cols;
        for (var i = 0; i < colls; i++) {
            var div = document.createElement('div');
            div.className = 'cell';
            div.style.width = widthitem-1 + 'px';
            div.style.height = widthitem-1 + 'px';
            this.containerId.appendChild(div);
        }

    }
}

//
// Чтение ячейки матрицы.
// Функция принимает координаты ячейки
// должна вернуть true, если она закрашена,
// false, если не закрашена.

function getCell(row, col) {

    return matrix.children [row * numrows + col].style.backgroundColor == targetcolor;
}

// функция принимает координаты ячейки
// если val==true, закрашивает ячейку,
// иначе убирает закраску.

function setCell(row, col, val) {
    var cell = matrix.children[row * numrows + col];
    cell.style.backgroundColor = val ? 'green' : 'transparent';
}

//
// Установка ячейки, до которой нужно добраться
//
function setTarget() {

    var cell = matrix.children[Math.floor(Math.random() * numcoll * numrows + 1)];
    cell.style.backgroundColor = targetcolor;
}

//
// Точка входа. Все параметры находятся в файле config.js
//
window.onload = function () {
    var m1 = new Matrix('matrix', numrows, numcoll, widthitem);
    m1.create();
    setTarget();
    setCell(1, 1, true);

    $(function () {
            $(window).on('keydown', function (e) {
                    var keycode = {LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40};
                    keyCode = e.keyCode || e.which;
                    setCell(vrow, vcol, false);

                    if ((keyCode == keycode.LEFT) && (0 != vcol)) vcol--;
                    else if ((keyCode == keycode.RIGHT) && (vcol != numrows - 1)) vcol++;
                    else if ((keyCode == keycode.UP) && (0 != vrow)) vrow--;
                    else if ((keyCode == keycode.DOWN) && (vrow != numrows - 1)) vrow++;

                    if (getCell(vrow, vcol)) {
                        alert('Game over');
                    }
                    else {
                        setCell(vrow, vcol, true);
                    }
                }
            )
        }
    )
};

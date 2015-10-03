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
            div.style.width = widthitem - 1 + 'px';
            div.style.height = widthitem - 1 + 'px';
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
    cell.style.backgroundColor = val ? usercolor : 'transparent';
}

//
// Проверка ячейки, может она уже занята Target или User?
//
function checkItem() {
    var num, int, residue;
    num = Math.floor(Math.random() * numcoll * numrows + 1);
    int = Math.floor(num / numrows);
    residue = num % numrows;
    if (int < 3 && residue < (numrows / 2)) {
        num = int * numrows + numrows;
    }
    if (num == numcoll * numrows) {
        --num;
    }
    return num;
}

//
// Установка ячейки, до которой нужно добраться
//
function setTarget() {

    var cell = matrix.children[checkItem()];
    cell.style.backgroundColor = targetcolor;
}

//
// Установка препятствий
//
function setWall(count) {

    var cell, i, num;
    for (i = 0; i < count; i++) {
        num = checkItem();
        cell = matrix.children[num];
        if (cell.style.backgroundColor == targetcolor && cell < numcoll * numrows) {
            cell = matrix.children[++num];
        } else {
            cell = matrix.children[--num];
        }
        cell.style.backgroundImage = targetimg;
    }
}

//
// Точка входа. Все параметры находятся в файле config.js
//
window.onload = function () {
    var m1 = new Matrix('matrix', numrows, numcoll, widthitem);
    m1.create();
    setCell(vrow, vcol, true);
    setTarget();
    setWall(countwall);

    $(function () {
            $(window).on('keydown', function (e) {
                    var keycodes = {LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40};
                    var keycode = e.keyCode || e.which;
                    setCell(vrow, vcol, false);

                    if ((keycode == keycodes.LEFT) && (0 != vcol)) vcol--;
                    else if ((keycode == keycodes.RIGHT) && (vcol != numrows - 1)) vcol++;
                    else if ((keycode == keycodes.UP) && (0 != vrow)) vrow--;
                    else if ((keycode == keycodes.DOWN) && (vrow != numcoll - 1)) vrow++;

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

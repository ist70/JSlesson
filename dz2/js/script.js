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

// функция очистки матрицы для новой игры
function clearCell() {
    var colls = numrows * numcoll;
    for (var i = 0; i < colls; i++) {
        matrix.children[i].style.backgroundColor = null;
        matrix.children[i].style.backgroundImage = null;
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
// Проверка ячейки, может она уже занята?
//
function checkItem() {
    var num, int, residue;
    num = Math.floor(Math.random() * numcoll * numrows);
    int = Math.floor(num / numrows);
    residue = num % numrows;
    if (int < 4 && residue < (numrows / 2)) {
        num = int * numrows + residue + 3;
    }
    return num;
}

//
// Установка ячейки, до которой нужно добраться
//
function setTarget() {
    var cell;
    cell = matrix.children[checkItem()];
    while (cell.style.backgroundImage) {
        cell = matrix.children[checkItem()];
    }
    cell.style.backgroundColor = targetcolor;
}

//
// Установка препятствий
//
function setWall(count) {

    var cell, i, num;
    var colls = numcoll * numrows;
    for (i = 0; i < count; i++) {
        num = checkItem();
        cell = matrix.children[num];
        cell.style.backgroundImage = targetimg;
    }
}

function controlCell(vrow, vcol) {
    if (getCell(vrow, vcol)) {
        alert('Game over');
        return true;
    }
    else {
        setCell(vrow, vcol, true);
        return false;
    }
}

function newStart() {
    clearCell();
    setCell(vrow, vcol, false);
    setTarget();
    setWall(countwall);
    vrow = 1;
    vcol = 1;
}

function driver(keycode, keycodes) {
    if ((keycode == keycodes.LEFT) && (0 != vcol)) vcol--;
    else if ((keycode == keycodes.RIGHT) && (vcol != numrows - 1)) vcol++;
    else if ((keycode == keycodes.UP) && (0 != vrow)) vrow--;
    else if ((keycode == keycodes.DOWN) && (vrow != numcoll - 1)) vrow++;
}

//
// Точка входа. Все параметры находятся в файле config.js
//
window.onload = function () {

    var m1 = new Matrix('matrix', numrows, numcoll, widthitem);
    m1.create();
    m1.focus;
    setCell(vrow, vcol, true);
    setWall(countwall);
    setTarget();
    var keycodes = {LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40};
    var keycode = 39;   // Начальное движение квадрата (вправо)

    intervId = setInterval(function () {
        setCell(vrow, vcol, false);
        driver(keycode, keycodes);
        if (controlCell(vrow, vcol)) {
            if (window.confirm('Начать заново?')) {
                keycode = 39;   // Начальное движение квадрата (вправо)
                newStart();
            }
            else {
                clearInterval(intervId);
            }
        }
        ;

        window.onkeydown = function (e) {
            keycode = e.keycode || e.which;
            setCell(vrow, vcol, false);
            driver(keycode, keycodes);
            if (controlCell(vrow, vcol)) {
                if (window.confirm('Начать заново?')) {
                    keycode = 39;   // Начальное движение квадрата (вправо)
                    newStart();
                }
                else {
                    clearInterval(intervId);
                }
            }
            ;
        }
    }, 500);

};
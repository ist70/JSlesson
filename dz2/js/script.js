"use strict"
//
// Установка  игрового поля, Создание матрицы
//
function Matrix(containerId, rows, cols, widthitem) {
    this.containerId = document.getElementById(containerId);
    this.containerId.style.width = rows * widthitem + 'px';
    this.containerId.style.height = cols * widthitem + 'px';

    this.create = function () {
        var colls = rows * cols;
        for (var i = 0; i < colls; i++) {
            var div = document.createElement('div');
            div.className = 'cell';
            div.style.width = widthitem - 1 + 'px';
            div.style.height = widthitem - 1 + 'px';
            this.containerId.appendChild(div);
        };
    };
// Проверка ячейки, может она уже занята?
    this.checkItem = function () {
        var num, int, residue;
        num = Math.floor(Math.random() * numcoll * numrows);
        int = Math.floor(num / numrows);
        residue = num % numrows;
        if (int < 4 && residue < (numrows / 2)) {
            num = int * numrows + residue + 3;
        };
        return num;
    };
// Установка препятствий
    this.setWall = function (count) {
        var cell, i, num;
        for (i = 0; i < count; i++) {
            num = this.checkItem();
            cell = this.containerId.children[num];
            cell.style.backgroundImage = wallimg;
        };
    };
// Установка ячейки, до которой нужно добраться
    this.setTarget = function () {
        var cell;
        cell = this.containerId.children[this.checkItem()];
        while (cell.style.backgroundImage) {
            cell = this.containerId.children[this.checkItem()];
        }
        cell.style.backgroundColor = targetcolor;
    };

// функция очистки матрицы для новой игры
    this.clearCell = function () {
        var colls = numrows * numcoll;
        for (var i = 0; i < colls; i++) {
            this.containerId.children[i].style.backgroundColor = null;
            this.containerId.children[i].style.backgroundImage = null;
        }
    };
};

function Runner(parent, row, coll) {
    this.parent = parent;
    this.nrows = row;
    this.ncols = coll;
    this.colls = numrows * numcoll;

// функция принимает координаты ячейки, если val==true, закрашивает ячейку,
// иначе убирает закраску.
    this.setSell = function (row, col, val) {
        var cell = this.parent.children[row * numrows + col];
        cell.style.backgroundColor = val ? usercolor : 'transparent';
    };

// Чтение ячейки матрицы.  Функция принимает координаты ячейки
// должна вернуть 1, если она закрашена, false, если не закрашена, 2 если у ячейки фон-картинка(стена)
    this.getSell = function (row, col) {
        if (this.parent.children [row * numrows + col].style.backgroundColor == targetcolor) {
            return 1
        }
        if (this.parent.children [row * numrows + col].style.backgroundImage) {
            return 2
        }
        return false;
    };
// Функция Бум! Удар об стену
    this.booom = function (row, col) {
        this.parent.children [row * numrows + col].style.backgroundImage = boomstyle;
        alert('Game dismission');
    };

// Контроль нахождения движущейся ячейки, если она попала на targetcolor, то вернёт true
// иначе false
//
    this.controlCell = function (vrow, vcol) {
        if (1 == this.getSell(vrow, vcol)) {
            alert('Game over');
            return 1;
        }
        if (2 == this.getSell(vrow, vcol)) {
            this.booom(vrow, vcol);
            return 1;
        }
        this.setSell(vrow, vcol, true);
        return false;
    };

// Функция движения квадрата
    this.driver = function (keycode, keycodes) {
        if ((keycode == keycodes.LEFT) && (0 != vcol)) vcol--;
        else if ((keycode == keycodes.RIGHT) && (vcol != numrows - 1)) vcol++;
        else if ((keycode == keycodes.UP) && (0 != vrow)) vrow--;
        else if ((keycode == keycodes.DOWN) && (vrow != numcoll - 1)) vrow++;
    }
};

//
// Точка входа. Все параметры находятся в файле config.js
//
window.onload = function () {

    var m1 = new Matrix('matrix', numrows, numcoll, widthitem);
    m1.create();
    m1.focus;
    var run1 = new Runner(m1.containerId, vrow, vcol);
    run1.setSell(vrow, vcol, true);
    m1.setWall(countwall);
    m1.setTarget();
    var keycodes = {LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40};
    var keycode = 39;   // Начальное движение квадрата (вправо)
    var level = 1;
    var plevel = document.getElementById('levelId');
    plevel.innerHTML = 'Level ' + level;
    document.getElementById('levelId').innerHTML = 'Level ' + level;

    var intervId = setInterval(function () {
        run1.setSell(vrow, vcol, false);
        run1.driver(keycode, keycodes);
        if (run1.controlCell(vrow, vcol)) {
            if (window.confirm('Начать заново?')) {
                newStart(m1, run1);
            }
            else {
                clearInterval(intervId);
            }
        };

        window.onkeydown = function (e) {
            keycode = e.keycode || e.which;
            run1.setSell(vrow, vcol, false);
            run1.driver(keycode, keycodes);
            if (run1.controlCell(vrow, vcol)) {
                if (window.confirm('Начать заново?')) {
                    newStart(m1, run1);
                }
                else {
                    clearInterval(intervId);
                }
            };
        }
    }, interval);
//
// функция начала новой игры
//
    function newStart(objM, objD) {
        vrow = 1;
        vcol = 1;
        keycode = 39;   // Начальное движение квадрата (вправо)
        m1.clearCell();
        run1.setSell(vrow, vcol, false);
        m1.setTarget();
        m1.setWall(countwall);
    }
};
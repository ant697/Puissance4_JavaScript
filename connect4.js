var numberCaseX = 7;
var numberCaseY = 6;
var paddingTop = 100;
var paddingLeft = 100;
var paddingRight = 100;
var winRed = 0;
var winYellow = 0;
var vsIA = true;
var colorIA = 'yellow';
color1 = null;
color2 = null;
collideOk = true;
const lannister = 'Lannister';
const stark = 'Stark';
const targaryan = 'Targaryen';
const martell = 'Martell';
const baelish = 'Baelish';
const baratheon = 'Baratheon';
const tyrell = 'Tyrell';
const greyjoy = 'Greyjoy';

(function ($) {
    $.fn.connect4 = function () {
        $(this).css({
            'background-image': 'url("assets/bgGameOfThrones.jpg")',
            'background-size': 'cover',
        });
        let mySelectList = '<ul id="mySelectList"><li>' + createSelectLine('ligne') +
                            '</li><li>' + createSelectLine('colonne') + '</li></ul>';
        $(this).append(mySelectList);
        let selectorSelectList = $('#mySelectList');
        selectorSelectList.css('list-style', 'none');
        selectorSelectList.append('<br><button id="showExample">Exemple</button>');
        $('#showExample').css('display', 'table');
        $('#showExample').css('margin', '0 auto');
        $('#showExample').click(function () {
            if ($('#tableContent').length <= 0) {
                createExempleGrid($('#showExample'));
            } else {
                $('#tableContent').remove();
            }
        });
        $('#ligne').change(function () {
            $('#tableContent').remove();
        });
        $('#colonne').change(function () {
            $('#tableContent').remove();
        });
        $(this).append();
        $(this).append('<br>');
        createColorSelect(this, 'color1');
        createColorSelect(this, 'color2');
        $('#ligne').css('display', 'table');
        $('#ligne').css('margin', '0 auto');
        $('#colonne').css('display', 'table');
        $('#colonne').css('margin', '0 auto');
        $('#color1').css('margin', '0 auto');
        $('#color2').css('margin', '0 auto');
        $(this).append('<br>');
        $(this).append('<button id="launch">Lancez le jeu</button>');
        $('#launch').click(function () {
            if (color1 !== color2 && color1 !== null && color2 !== null) {
                $("#launch").css('display', 'none');
                $("#color1").css('display', 'none');
                $("#color2").css('display', 'none');
                $("#ligne").css('display', 'none');
                $("#colonne").css('display', 'none');
                $('#showExample').css('display', 'none');
                numberCaseY = parseInt($('#ligne').val());
                numberCaseX = parseInt($('#colonne').val());
                if ((numberCaseX * 100) + paddingLeft + paddingRight > $(window).width()) {
                    alert('La taille de la grille à été réduite votre écran n\'est pas assez grand');
                    numberCaseX -= Math.ceil((((numberCaseX * 100) + paddingLeft + paddingRight) - $(window).width()) / 100);
                }
                game = new Phaser.Game((numberCaseX * 100) + paddingLeft + paddingRight, (numberCaseY * 100) + paddingTop, Phaser.AUTO, '', { preload: preload, create: create, update: update }, true);
                $(this).parent().append('<div id="win"></div>');
                $("#win").append('<h1 id="winnerText">Maison ' + color1 + ' : ' + winRed + ' | Maison ' + color2 + ' : ' + winRed + '</h1>');
                $('#win').css({
                    'display': 'table',
                    'margin': '0 auto',
                    'padding-left': 20,
                    'padding-right': 20,
                    'color': '#36261B',
                    'background-image': 'url("assets/panneauBar.png")',
                    'background-size': 'cover',
                });
                $("#win").append('<button id="reset">Nouveau Jeu</button>');
                $('#reset').css( {
                    'display': 'none',
                    'margin': '0 auto'
                });
                $("#reset").click(function () {
                    resetGame();
                });
            } else {
                alert('Vous devez choisir une maison');
            }
        });
    };
})(jQuery);

var myToken = [stark, lannister, martell, baelish, baratheon, targaryan, tyrell, greyjoy];

function createExempleGrid(myThis) {
    $('#tableContent').remove();
    let myGridtoAppend = '<div id="tableContent"><table cellpadding="0" cellspacing="0"' + ' id="exampleGrid"></table></div>';
    $(myThis).parent().append(myGridtoAppend);
    let myGrid = $('#exampleGrid');
    let myDiv = $('#tableContent');
    myGrid.css( {
        'display': 'table',
        'margin': '0 auto'
    });
    myDiv.css('margin', '0 auto');
    let exGrid = '';
    for (let y = 0; y < $('#ligne').val(); y++) {
        exGrid += '<tr>';
        for (let x = 0; x < $('#colonne').val(); x++) {
            exGrid += "<td><img src='assets/case.png' class='exampleCase'></td>";
        }
        exGrid += "</tr>";

    }
    myGrid.append(exGrid);
    $('.exampleCase').css('height', 55);
    myDiv.css('overflow', 'scroll');
    myDiv.css('height',  350);
    myDiv.css('width',  385);
}

function createColorSelect(myThis, id) {
    let str = "<fieldset  id='" + id + "' >";
    if (id === 'color1') {
        str += '<h2>Joueur 1</h2><br>';
    } else {
        str += '<h2>Joueur 2</h2><br>';
    }
    for (let i = 0; i < myToken.length; i++) {
        if (i === Math.floor(myToken.length / 2)) {
            str += '<br>';
        }
        str += "<button class='colorBtn" + i + " btnSelect" + i + id + "' value='" + myToken[i] +
            "'><img src='assets/" + myToken[i] + "Token.png'></button>";
    }
    str += "</fieldset>";
    $(myThis).append(str);
    let myFieldSet = $('#' + id);
    myFieldSet.css({
        'display': 'table',
        'margin': '0 auto',
        'border': 'none',
    });
    if (id === 'color1') {
        myFieldSet.css('padding-top', 140);
    }
    for (let i = 0; i < myToken.length; i++) {
        let myBtn = $('.btnSelect' + i + id);
        myBtn.click({i: i, myFieldSet: myFieldSet, id: id, myThis: myBtn}, chooseClick);
    }
}

function chooseClick(event) {
    event.data.myFieldSet.attr('disabled', 'disabled');
    event.data.myFieldSet.css('opacity', 0.5);
    if (event.data.id === 'color1') {
        color1 = $(event.data.myThis).val();
        $('.btnSelect' + event.data.i +'color2').attr('disabled', 'disabled');
        $('.btnSelect' + event.data.i +'color2').css('opacity', 0.5);
    } else {
        color2 = $(event.data.myThis).val();
        $('.btnSelect' + event.data.i +'color1').attr('disabled', 'disabled');
        $('.btnSelect' + event.data.i +'color1').css('opacity', 0.5);
    }
}

function createSelectLine(id) {
    let str = "<select id='" + id + "'>";
    for (let i = 4; i < 100; i++) {
        if (id === 'ligne' && i === 6) {
            str += "<option style=\"background-image:url('assets/panneauBar.png');\" selected value='" + i + "'>" + i + " " + id + "</option>";
        } else if (id === 'colonne' && i === 7) {
            str += "<option style=\"background-image:url('assets/panneauBar.png');\" selected value='" + i + "'>" + i + " " + id + "</option>";
        } else {
            str += "<option style=\"background-image:url('assets/panneauBar.png');\" value='" + i + "'>" + i + " " + id + "</option>";
        }
    }
    str += "</select>";
    return str;
}

function resetGame() {
    game.destroy();
    game = new Phaser.Game((numberCaseX * 100) + paddingLeft + paddingRight, (numberCaseY * 100) + paddingTop, Phaser.AUTO, '', { preload: preload, create: create, update: update }, true);
    $('#reset').css('display', 'none');
    $('#alertText').remove();
}

function preload() {
    game.load.image('grid', 'assets/case.png');
    game.load.image('goldWin', 'assets/caseWin.png');
    game.load.image('iceWin', 'assets/iceWin.png');
    game.load.image('fireWin', 'assets/fireWin.png');
    game.load.image('darkWin', 'assets/darkWin.png');
    game.load.image('greenWin', 'assets/greenWin.png');
    game.load.image('orangeWin', 'assets/orangeWin.png');
    game.load.image('seaWin', 'assets/seaWin.png');
    game.load.image('red', 'assets/red.png');
    game.load.image('yellow', 'assets/jetonPirate.png');
    for (let i = 0; i < myToken.length; i++) {
        game.load.image(myToken[i], 'assets/' + myToken[i] + 'Token.png');
    }
    game.load.image('undo', "assets/undo.png");
    game.load.image('redo', "assets/redo.png");
    game.load.audio('generic', ['assets/audio/gameOfThroneSound.ogg']);
    game.load.audio('sword', ['assets/audio/swordSound.ogg']);
}

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    player = [];
    color = color1;
    player = createNewPiece(player, color);
    grid = createGrid();
    undo = game.add.button(0, 0, 'undo', undoOnClick, this);
    undo.width = 100;
    undo.height = 100;
    redo = game.add.button((numberCaseX * 100) + paddingLeft, 0, 'redo', redoOnClick, this);
    redo.width = 100;
    redo.height = 100;
    this.scale.pageAlignHorizontally = true;
    music = game.add.audio('generic');
    swordSound = game.add.audio('sword');
    music.play();
    cursors = game.input.keyboard.createCursorKeys();
    cursors.enter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
}

var activKeyRight = true;
var activKeyLeft = true;
var activKeyEnter = true;
var activKeyDown = true;

function createNewPiece(player, color) {
    let newPiece = game.add.sprite(100, 0, color);
    newPiece.width = 100;
    newPiece.height = 100;
    game.physics.arcade.enable(newPiece);
    newPiece.body.immovable = false;
    player.push(newPiece);
    return player;
}

function update() {
    if (player.length > 1) {
        if (player[player.length - 2].body.velocity.y > 5000) {
            player[player.length - 2].body.velocity.y = 5000;
        }
    }
    if (music.currentTime >= music.durationMS) {
        music.currentTime = 0;
        music.play();
    }
    for (let i = 0; i < player.length; i++) {
        if (player[i].body.blocked.down === true) {
            if (player[i].body.gravity !== 0) {

                myCollide(player[i]);
            }
        }
        for (let j = 0; j < player.length; j++) {
            if (j !== i) {
                if (player[j].body.gravity !== 0 || player[i].body.gravity !== 0) {
                    game.physics.arcade.collide(player[j], player[i], myCollide);
                }
            }
        }
    }
    if (cursors.right.isDown) {
        if (collideOk && player[player.length - 1].position.y === 0) {
            let lastPlayer = player[player.length - 1];
            if (lastPlayer.position.x < (game.width - paddingLeft - paddingRight)) {
                lastPlayer.position.x += 10;
            }
            activKeyRight = false;
        }
    }
    if (cursors.right.isUp) {
        let lastPlayer = player[player.length - 1];
        let difference = lastPlayer.position.x % 100;
        if (difference !== 0 && lastPlayer.position.x + difference > paddingLeft &&
            lastPlayer.position.x + difference < (numberCaseX * 100) + paddingLeft &&
        activKeyRight === false) {
            if (lastPlayer.position.x + difference > paddingLeft &&
                lastPlayer.position.x + difference < (numberCaseX * 100) + paddingLeft) {
                difference = 100 - difference;
                lastPlayer.position.x += difference;
            }
        }
        activKeyRight = true;
    }
    if (cursors.left.isDown) {
        if (collideOk && player[player.length - 1].position.y === 0) {
            let lastPlayer = player[player.length - 1];
            if (lastPlayer.position.x > paddingLeft) {
                lastPlayer.position.x -= 10;
            }
            activKeyLeft = false;
        }
    }
    if (cursors.left.isUp) {
        let lastPlayer = player[player.length - 1];
        let difference = lastPlayer.position.x % 100;
        if (difference !== 0 && activKeyLeft === false) {
            lastPlayer.position.x -= difference;
        }
        activKeyLeft = true;
    }
    if (cursors.enter.isDown) {
        if (activKeyEnter && collideOk && checkColumn() && (player[player.length - 1].position.x % 100) === 0) {
            collideOk = false;
            if (color === color1) {
                color = color2;
            } else {
                color = color1;
            }
            removeGrid(grid);
            grid = createGrid();
            player[player.length - 1].body.collideWorldBounds = true;
            player[player.length - 1].body.gravity.y = 4000;
            for (let i = 0; i < player.length; i++) {
                player[i].body.enable = true;
                player[i].body.collideWorldBounds = true;
                player[i].body.bounce.y = 0;
                player[i].body.force = 0;
            }
            setTimeout(function () {
                player = createNewPiece(player, color);
                activKeyEnter = true;
            }, 500);
            activKeyEnter = false;
            enableUndo = true;
            enableRedo = false;
        }
    }
    if (cursors.down.isDown) {
        if (activKeyDown && collideOk && checkColumn() && (player[player.length - 1].position.x % 100) === 0) {
            collideOk = false;
            if (color === color1) {
                color = color2;
            } else {
                color = color1;
            }
            removeGrid(grid);
            grid = createGrid();
            player[player.length - 1].body.collideWorldBounds = true;
            player[player.length - 1].body.gravity.y = 4000;
            for (let i = 0; i < player.length; i++) {
                player[i].body.enable = true;
                player[i].body.collideWorldBounds = true;
                player[i].body.bounce.y = 0;
                player[i].body.force = 0;
            }
            setTimeout(function () {
                player = createNewPiece(player, color);
                activKeyDown = true;
            }, 500);
            activKeyDown = false;
            enableUndo = true;
            enableRedo = false;
        }
    }
}

function checkColumn() {
    for (let i = 0; i < (player.length - 1); i++) {
        if (Math.floor(player[i].position.x) === Math.floor(player[player.length - 1].position.x) && Math.floor(player[i].position.y) === Math.floor(player[player.length - 1].position.y + 100)) {
            return false;
        }
    }
    return true;
}

function myCollide(player) {
    player.body.gravity = 0;
    if (player.body.deltaAbsY() < 1) {
        player.body.moves = false;
    }
    player.body.force = 0;
    player.body.immovable = true;
    collideOk = true;
    swordSound.play();
    setTimeout(function () {
        checkVictory();
        if (vsIA && colorIA === color) {
            let myIAPlayer = filterPlayerByColor(color);
            artificialIntelligence(myIAPlayer);
        }
    }, 100);
}

function chooseHighlight(color) {
    switch (color) {
        case stark:
            return "iceWin";
        case baratheon:
        case lannister:
            return "goldWin";
        case martell:
            return "orangeWin";
        case baelish:
            return "darkWin";
        case targaryan:
            return 'fireWin';
        case tyrell:
            return 'greenWin';
        case greyjoy:
            return 'seaWin';
    }
}

function createGrid(highlight = false, color = false) {
    let grid = [];
    let noHighlight = false;
    for (let y = paddingTop; y < (numberCaseY * 100) + paddingTop; y += 100) {
        for (let x = paddingLeft; x < (numberCaseX * 100) + paddingLeft; x += 100) {
            if (highlight !== false) {
                for (let i = 0; i < highlight.length; i++) {
                    if (highlight[i][0] === x && highlight[i][1] === y) {
                        grid.push(game.add.sprite(x, y, chooseHighlight(color)));
                        noHighlight = true;
                        break;
                    }
                }
                if (!noHighlight) {
                    grid.push(game.add.sprite(x, y, 'grid'));
                }
                noHighlight = false;
            } else {
                grid.push(game.add.sprite(x, y, 'grid'));
            }
        }
    }
    return grid;
}

function removeGrid(grid) {
    for (let i = 0; i < grid.length; i++) {
        grid[i].kill();
    }
}

function filterByXY(myPlayer, y = false, x = false) {
    let list = [];
    for (let i = 0; i < myPlayer.length; i++) {
        list.push([Math.floor(myPlayer[i].position.x), Math.floor(myPlayer[i].position.y)]);
    }
    let newList = [];
    if (y === true) {
        for (let y = paddingTop; y < (numberCaseY * 100) + paddingTop; y += 100) {
            newList[y] = [];
            for (let i = 0; i < list.length; i++) {
                if (Math.floor(list[i][1]) === y) {
                    newList[y].push(list[i][0]);
                }
            }
        }
    }
    if (x === true) {
        for (let x = paddingLeft; x < (numberCaseX * 100) + paddingLeft; x += 100) {
            newList[x] = [];
            for (let i = 0; i < list.length; i++) {
                if (Math.floor(list[i][0]) === x) {
                    newList[x].push(Math.floor(list[i][1]));
                }
            }
        }
    }
    if (x !== false || y !== false) {
        return newList;
    } else {
        return list;
    }
}

function filterPlayerByColor(color) {
    let newPlayer = [];
    for (let i = 0; i < player.length; i++) {
        if (player[i].key === color && player[i].alive === true) {
            newPlayer.push(player[i]);
        }
    }
    return newPlayer;
}

function checkVictoryHorizontal(myPlayer) {
    myPlayer = filterByXY(myPlayer, true);
    let count = 1;
    let currentValue;
    let previousValue = false;
    let tokenWinner = [];
    for (let y = paddingTop; y < (numberCaseY * 100) + paddingTop; y += 100) {
        myPlayer[y] = myPlayer[y].sort();
        for (let i = 0; i < myPlayer[y].length; i++) {
            currentValue = myPlayer[y][i];
            tokenWinner.push([myPlayer[y][i], y]);
            if (previousValue !== false && currentValue === (previousValue + 100)) {
                tokenWinner.push([previousValue, y]);
                count++;
            } else {
                tokenWinner = [];
                count = 1;
            }
            previousValue = currentValue;
        }
        if (count >= 4) {
            removeGrid(grid);
            if (color === color1) {
                grid = createGrid(tokenWinner, color2);
            } else {
                grid = createGrid(tokenWinner, color1);
            }
            return true;
        } else {
            count = 1;
            previousValue = false;
        }
    }
    return false;
}

function checkVictoryVertical(myPlayer) {
    myPlayer = filterByXY(myPlayer, false, true);
    let count = 1;
    let currentValue;
    let tokenWinner = [];
    let previousValue = false;
    for (let x = paddingLeft; x < (numberCaseX * 100) + paddingLeft; x += 100) {
        myPlayer[x] = myPlayer[x].sort();
        for (let i = 0; i < myPlayer[x].length; i++) {
            currentValue = myPlayer[x][i];
            tokenWinner.push([x, currentValue]);
            if (previousValue !== false && currentValue === (previousValue + 100)) {
                count++;
                tokenWinner.push([x, previousValue]);
            } else {
                tokenWinner = [];
                count = 1;
            }
            previousValue = currentValue;
        }
        if (count >= 4) {
            removeGrid(grid);
            if (color === color1) {
                grid = createGrid(tokenWinner, color2);
            } else {
                grid = createGrid(tokenWinner, color1);
            }
            return true;
        } else {
            count = 1;
            previousValue = false;
        }
    }
    return false;
}

function checkVictoryDiagonal(myPlayer) {
    myPlayer = filterByXY(myPlayer);
    let count = 1;
    let tokenWinner = [];
    let reset = true;
    for (let i = 0; i < myPlayer.length; i++) {
        let x = myPlayer[i][0];
        let y = myPlayer[i][1];
        tokenWinner.push([x, y]);
        while (x <= (numberCaseX * 100) + paddingLeft && y <= (numberCaseY * 100) + paddingTop) {
            x += 100;
            y += 100;
            for (let j = 0; j < myPlayer.length; j++) {
                if (myPlayer[j][0] === x && myPlayer[j][1] === y) {
                    tokenWinner.push([x, y]);
                    count++;
                    reset = false;
                    break;
                } else {
                    reset = true;
                }
            }
            if (reset) {
                break;
            }
        }
        if (count >= 4) {
            removeGrid(grid);
            if (color === color1) {
                grid = createGrid(tokenWinner, color2);
            } else {
                grid = createGrid(tokenWinner, color1);
            }
            return true;
        }
        tokenWinner = [];
        count = 1;
    }
    count = 1;
    reset = true;
    for (let i = 0; i < myPlayer.length; i++) {
        let x = myPlayer[i][0];
        let y = myPlayer[i][1];
        tokenWinner.push([x, y]);
        while (x >= paddingLeft && y <= (numberCaseY * 100) + paddingTop) {
            x -= 100;
            y += 100;
            for (let j = 0; j < myPlayer.length; j++) {
                if (myPlayer[j][0] === x && myPlayer[j][1] === y) {
                    tokenWinner.push([x, y]);
                    count++;
                    reset = false;
                    break;
                } else {
                    reset = true;
                }
            }
            if (reset) {
                break;
            }
        }
        if (count >= 4) {
            removeGrid(grid);
            if (color === color1) {
                grid = createGrid(tokenWinner, color2);
            } else {
                grid = createGrid(tokenWinner, color1);
            }
            return true;
        }
        tokenWinner = [];
        count = 1;
    }
    return false;
}

function checkVictory() {
    let victory = false;
    let redPlayer = filterPlayerByColor(color1);
    if (checkVictoryHorizontal(redPlayer) || checkVictoryVertical(redPlayer) || checkVictoryDiagonal(redPlayer)) {
        game.paused = true;
        enableUndo = false;
        launchSound(color1);
        $('#alertText').remove();
        $('#win').append('<h1 id="alertText">Maison ' + color1 + ' a gagné</h1>');
        $('#reset').css('display', 'table');
        winRed++;
        victory = true;
    }
    let yellowPlayer = filterPlayerByColor(color2);
    if (checkVictoryHorizontal(yellowPlayer) || checkVictoryVertical(yellowPlayer) || checkVictoryDiagonal(yellowPlayer)) {
        game.paused = true;
        enableUndo = false;
        launchSound(color2);
        $('#alertText').remove();
        $('#win').append('<h1 id="alertText">Maison ' + color2 + ' a gagné</h1>');
        winYellow++;
        $('#reset').css('display', 'table');
        victory = true;
    }
    if (checkIfGridIsFull() && !victory) {
        game.paused = true;
        enableUndo = false;
        $('#win').append('<h1 id="alertText">Match Nul</h1>');
        $('#reset').css('display', 'table');
    }
    $("#winnerText").text('Maison ' + color1 + ' : ' + winRed + ' | Maison ' + color2 + ' : ' + winYellow);
}

enableRedo = false;
enableUndo = false;

function undoOnClick() {
    if (player.length > 1 && collideOk && enableUndo) {
        player[player.length - 2].kill();
        if (player[player.length - 1].key === color1) {
            color = color2;
        } else {
            color = color1;
        }
        let index = player.length - 1;
        player[index].kill();
        player.splice(index, 1);
        player = createNewPiece(player, color);
        enableRedo = true;
        enableUndo = false;
    }
}

function redoOnClick() {
    if (player.length > 1 && collideOk && enableRedo) {
        player[player.length - 2].revive();
        if (player[player.length - 1].key === color1) {
            color = color2;
        } else {
            color = color1;
        }
        let index = player.length - 1;
        player[index].kill();
        player.splice(index, 1);
        player = createNewPiece(player, color);
        enableUndo = true;
        enableRedo = false;
    }
}

function launchSound(player) {
    switch (player) {
        case lannister:
        case stark:
        case targaryan:
            let sound = new Audio("./assets/audio/" + player + "Sound.ogg");
            sound.play();
            break;
    }
}

function checkIfGridIsFull() {
    let redPlayer = filterPlayerByColor(color1);
    let yellowPlayer = filterPlayerByColor(color2);
    if ((redPlayer.length + yellowPlayer.length) >= numberCaseX * numberCaseY) {
        return true;
    }
}

$('body').connect4({numberColumn: 7, numberLine: 6});

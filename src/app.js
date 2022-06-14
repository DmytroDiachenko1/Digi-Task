var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var gravity = .8;
var app;
var figures = [];
var numberOfShapePerSec = 1;
window.onload = function () {
    app = new PIXI.Application({ width: 1024, height: 400, backgroundColor: 0x1099bb });
    document.querySelector('#world').appendChild(app.view);
    app.stage.interactive = true;
    document.querySelector('#world').addEventListener("click", createFigureHandler);
    document.querySelector('#gravity').innerHTML = gravity;
    initFigures();
    startTimer();
    //gravity logic
    app.ticker.add(worldLoop);
};
function worldLoop(delta) {
    updateFigures(delta);
}
function initFigures() {
    var randomNumberFigures = Math.floor(Math.random() * 10);
    for (var i = 0; i <= randomNumberFigures; i++) {
        var randomYCoordinat = Math.floor(Math.random() * 1000 + 30);
        var randomXCoordinat = Math.floor(Math.random() * 2024);
        var figure = createFigure(randomXCoordinat, -randomYCoordinat);
        figures.push(figure);
        document.querySelector('#number-of-shapes').innerHTML = figures.length;
    }
    document.querySelector('#number-of-shapes-per-sec').innerHTML = numberOfShapePerSec;
}
function startTimer() {
    setInterval(function () {
        for (var i = 0; i < numberOfShapePerSec; i++) {
            var randomYCoordinat = Math.floor(Math.random() * 1000 + 30);
            var randomXCoordinat = Math.floor(Math.random() * 1024);
            var figure = createFigure(randomXCoordinat, -randomYCoordinat);
            figures.push(figure);
            document.querySelector('#number-of-shapes').innerHTML = figures.length;
        }
    }, 1000);
}
function createFigureHandler(event) {
    var figure = createFigure(event.clientX, event.clientY);
    figures.push(figure);
    document.querySelector('#number-of-shapes').innerHTML = figures.length;
}
function createFigure(x, y) {
    if (x === void 0) { x = 0; }
    if (y === void 0) { y = 0; }
    var shapeVariants = [
        'square',
        'rect',
        'circle',
        'triangle',
        'ellipse',
    ];
    var randomNum = Math.floor(Math.random() * 5);
    var shape = createItem(shapeVariants[randomNum]);
    var figure = new PIXI.Sprite(); //.from(imageSources[randomNum]);
    figure.anchor.set(0.5);
    figure.x = x;
    figure.y = y;
    figure.speed = gravity;
    // Opt-in to interactivity
    figure.interactive = true;
    // Shows hand cursor
    figure.buttonMode = true;
    figure.on('pointerdown', destryHandler, this);
    figure.addChild(shape);
    app.stage.addChild(figure);
    return figure;
}
function faster() {
    gravity += .8;
    document.querySelector('#gravity').innerHTML = Number(gravity).toFixed(1);
}
function slower() {
    if (gravity > 0.8) {
        gravity -= .8;
    }
    document.querySelector('#gravity').innerHTML = Number(gravity).toFixed(1);
}
function updateFigures() {
    for (var i = 0; i < figures.length; i++) {
        figures[i].position.y += figures[i].speed;
        if (figures[i].position.y > 500) {
            figures[i].outOfFrame = true;
        }
    }
    for (var i = 0; i < figures.length; i++) {
        if (figures[i].outOfFrame) {
            app.stage.removeChild(figures[i]);
            figures.splice(i, 1);
            document.querySelector('#number-of-shapes').innerHTML = figures.length;
        }
    }
}
function destryHandler(_a) {
    var event = __rest(_a, []);
    console.log('args', event);
    // console.log('destr', event.data.originalEvent);
    // event.stopPropagation()
    // e.preventDefault();
    // e.stopPropagation().stopped;
}
function createItem(name) {
    var item = new PIXI.Graphics();
    var randomColor = Math.floor(Math.random() * 16777215).toString(16); // я взял вот от сюда https://css-tricks.com/snippets/javascript/random-hex-color/
    if (name === 'square') {
        item.beginFill("0x".concat(randomColor));
        item.drawRect(-30, -30, 30, 30);
        item.endFill();
    }
    else if (name === 'rect') {
        item.beginFill("0x".concat(randomColor));
        item.drawRect(-30, -30, 50, 50);
    }
    else if (name === 'circle') {
        item.lineStyle(0); // draw a circle, set the lineStyle to zero so the circle doesn't have an outline
        item.beginFill("0x".concat(randomColor), 1);
        item.drawCircle(-30, -30, 30);
        item.endFill();
    }
    else if (name === 'triangle') {
        item.beginFill("0x".concat(randomColor));
        item.lineStyle(4, "0x".concat(randomColor), 1);
        item.moveTo(-30, -30);
        item.lineTo(0, 0);
        item.lineTo(45, 45);
        item.lineTo(0, 90);
        item.closePath();
        item.endFill();
    }
    else if (name === 'ellipse') {
        item.lineStyle(2, "0x".concat(randomColor), 1);
        item.beginFill("0x".concat(randomColor), 1);
        item.drawEllipse(-30, -30, 80, 50);
        item.endFill();
    }
    return item;
}
function increment() {
    numberOfShapePerSec++;
    document.querySelector('#number-of-shapes-per-sec').innerHTML = numberOfShapePerSec;
}
function decrement() {
    if (numberOfShapePerSec > 1) {
        numberOfShapePerSec--;
    }
    document.querySelector('#number-of-shapes-per-sec').innerHTML = numberOfShapePerSec;
}

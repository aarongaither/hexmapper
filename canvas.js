const { 
    getXPos, getYPos, drawGridFromHash, genHash, drawHexagon,
 } = require('./hexFuncs');

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const hexAngle = 0.523598776; // 30 degrees in radians
const sideLength = 25;
const gridWidth = 10;
const gridHeight = 10;
const hexHeight = Math.sin(hexAngle) * sideLength;
const hexRadius = Math.cos(hexAngle) * sideLength;
const hexRectHeight = sideLength + 2 * hexHeight;
const hexRectWidth = 2 * hexRadius;

const hexProps = {
    sideLength,
    hexHeight,
    hexRadius,
    hexRectHeight,
    hexRectWidth
};

const colors = {
    strokeColor: "#CCCCCC",
    fillColor: "#000000",
};

const hexFunc = drawHexagon(colors)(hexProps)({ ctx });
const getX = getXPos(hexProps);
const getY = getYPos(hexProps);

const hash = genHash({ gridHeight, gridWidth, getX, getY });

canvas.addEventListener("click", ({ offsetX, offsetY }) => {
    gridY = Math.floor(offsetY / (hexHeight + sideLength));
    gridX = Math.floor((offsetX - (gridY % 2) * hexRadius) / hexRectWidth);
    const gridPos = `${gridX}-${gridY}`;
    hash[gridPos].fill = !hash[gridPos].fill; 
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGridFromHash({ hash, hexFunc });
    // console.log('gridPos: ', gridPos);
    // console.log(hash[gridPos]);
});

drawGridFromHash({ hash, hexFunc });
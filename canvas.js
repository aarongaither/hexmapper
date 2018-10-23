function genHash({ gridHeight, gridWidth, getX, getY }) {
    const hash = {};
    for (let i = 0; i < gridWidth; ++i) {
        for (let j = 0; j < gridHeight; ++j) {
            hash[`${i}-${j}`] = {
                x: getX({ i, j }),
                y: getY({ j }),
                fill: false,
            };
        }
    }
    return hash;
}

const getXPos = ({ hexRectWidth, hexRadius }) => ({ i, j }) => (i * hexRectWidth + ((j % 2) * hexRadius));
const getYPos = ({ sideLength, hexHeight }) => ({ j }) => (j * (sideLength + hexHeight));

function drawGridFromHash({ hash, hexFunc }) {
    Object.values(hash).forEach(({ x, y, fill }) => hexFunc({ x, y, fill }));
}

const drawHexagon = colors => hexProps => ({ ctx }) => ({ x, y, fill }) => {
    const {
        hexRadius, sideLength, hexHeight,
        hexRectHeight, hexRectWidth,
    } = hexProps;
    const { fillColor, strokeColor } = colors;

    const vectors = [
        [x + hexRadius, y],
        [x + hexRectWidth, y + hexHeight],
        [x + hexRectWidth, y + hexHeight + sideLength],
        [x + hexRadius, y + hexRectHeight],
        [x, y + sideLength + hexHeight],
        [x, y + hexHeight],
    ];

    ctx.beginPath();
    vectors.forEach((vector, i) => {
        if (i === 0) ctx.moveTo(...vector);
        else ctx.lineTo(...vector);
    })
    ctx.closePath();

    if (fill) {
        ctx.fillStyle = fillColor;
        ctx.fill();
    }
    else {
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = 1;
        ctx.stroke();
    }
}

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
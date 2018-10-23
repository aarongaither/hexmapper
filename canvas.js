function drawTestSquares(ctx) {
      ctx.fillStyle = 'rgb(200, 0, 0)';
      ctx.fillRect(10, 10, 50, 50);

      ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
      ctx.fillRect(30, 30, 50, 50);
}

const getXPos = ({ hexRectWidth, hexRadius }) => ({ i, j }) => (i * hexRectWidth + ((j % 2) * hexRadius));
const getYPos = ({ sideLength, hexHeight }) => ({ j }) => (j * (sideLength + hexHeight));

function drawGrid({ gridWidth, gridHeight, hexFunc, getX, getY }) {
    for (let i = 0; i < gridWidth; ++i) {
        for (let j = 0; j < gridHeight; ++j) {
            hexFunc({
                x: getX({ i, j }),
                y: getY({ j }),
            });
        }
    }
}

const drawHexagon = hexProps => ({ ctx, fill }) => ({ x, y }) => {
    const {
        hexRadius, sideLength, hexHeight,
        hexRectHeight, hexRectWidth,
    } = hexProps;
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
        ctx.fillStyle = 'rgb(200, 0, 0)';
        ctx.fill();
    }
    else {
        ctx.strokeStyle = "#CCCCCC";
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

const hexFunc = drawHexagon(hexProps)({ ctx });
const getX = getXPos(hexProps);
const getY = getYPos(hexProps);

drawGrid({ gridHeight, gridWidth, hexFunc, getX, getY });
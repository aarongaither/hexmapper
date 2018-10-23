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

module.exports = {
    drawHexagon,
    getXPos,
    getYPos,
    drawGridFromHash,
    genHash,
}
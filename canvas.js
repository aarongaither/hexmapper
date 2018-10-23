const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

function drawTestSquares(ctx) {
      ctx.fillStyle = 'rgb(200, 0, 0)';
      ctx.fillRect(10, 10, 50, 50);

      ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
      ctx.fillRect(30, 30, 50, 50);
}

const drawHexagon = hexProps => ({ ctx, x, y, fill }) => {
    const {
        hexRadius, sideLength, hexHeight,
        hexRectangleHeight, hexRectangleWidth,
    } = hexProps;

    ctx.beginPath();
    ctx.moveTo(x + hexRadius, y);
    ctx.lineTo(x + hexRectangleWidth, y + hexHeight);
    ctx.lineTo(x + hexRectangleWidth, y + hexHeight + sideLength);
    ctx.lineTo(x + hexRadius, y + hexRectangleHeight);
    ctx.lineTo(x, y + sideLength + hexHeight);
    ctx.lineTo(x, y + hexHeight);
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

const hexagonAngle = 0.523598776; // 30 degrees in radians
const sideLength = 36;
const boardWidth = 10;
const boardHeight = 10;
const hexHeight = Math.sin(hexagonAngle) * sideLength;
const hexRadius = Math.cos(hexagonAngle) * sideLength;
const hexRectangleHeight = sideLength + 2 * hexHeight;
const hexRectangleWidth = 2 * hexRadius;

const hexProps = {
    sideLength,
    hexHeight,
    hexRadius,
    hexRectangleHeight,
    hexRectangleWidth
};

const hexFunc = drawHexagon(hexProps);

hexFunc({ ctx, x: 10, y: 10 });
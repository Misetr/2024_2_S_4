function drawChart(labels, data1, data2) {
  const canvas = document.getElementById('comparisonChart');
  const ctx = canvas.getContext('2d');

  canvas.width = canvas.parentElement.clientWidth;
  canvas.height = 600; // Set a fixed height for better readability

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const maxData = Math.max(...data1, ...data2);
  const padding = 60;
  const chartHeight = canvas.height - padding * 2;
  const chartWidth = canvas.width - padding * 2;
  const xStep = chartWidth / (labels.length - 1);
  const yStep = chartHeight / maxData;

  function drawLine(data, color) {
    ctx.beginPath();
    ctx.moveTo(padding, canvas.height - padding - data[0] * yStep);
    for (let i = 1; i < data.length; i++) {
      ctx.lineTo(padding + i * xStep, canvas.height - padding - data[i] * yStep);
    }
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  // Draw grid
  ctx.strokeStyle = '#ddd';
  ctx.lineWidth = 1;
  for (let i = 0; i <= labels.length; i++) {
    ctx.beginPath();
    ctx.moveTo(padding + i * xStep, padding);
    ctx.lineTo(padding + i * xStep, canvas.height - padding);
    ctx.stroke();
  }
  for (let i = 0; i <= 10; i++) {
    ctx.beginPath();
    ctx.moveTo(padding, canvas.height - padding - i * (chartHeight / 10));
    ctx.lineTo(canvas.width - padding, canvas.height - padding - i * (chartHeight / 10));
    ctx.stroke();
  }

  // Draw axis
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#000';
  ctx.beginPath();
  ctx.moveTo(padding, padding);
  ctx.lineTo(padding, canvas.height - padding);
  ctx.lineTo(canvas.width - padding, canvas.height - padding);
  ctx.stroke();

  // Draw labels
  ctx.fillStyle = '#000';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = '12px Arial';
  for (let i = 0; i < labels.length; i++) {
    if (i % Math.ceil(labels.length / 20) === 0) { // Only show some labels to avoid clutter
      ctx.fillText(labels[i], padding + i * xStep, canvas.height - padding + 20);
    }
  }

  ctx.textAlign = 'right';
  for (let i = 0; i <= 10; i++) {
    ctx.fillText(Math.round(i * maxData / 10), padding - 10, canvas.height - padding - i * (chartHeight / 10));
  }

  // Draw data lines
  drawLine(data1, 'red');
  drawLine(data2, 'blue');

  // Draw legend
  const legendX = canvas.width - padding - 550;
  const legendY = padding;


}

// Ensure the canvas resizes with the window
window.addEventListener('resize', () => {
  const canvas = document.getElementById('comparisonChart');
  canvas.width = canvas.parentElement.clientWidth;
  canvas.height = 600; // Maintain the fixed height
  generateAndSort();
});

// Initialize canvas size
const canvas = document.getElementById('comparisonChart');
canvas.width = canvas.parentElement.clientWidth;
canvas.height = 600; // Set a fixed height

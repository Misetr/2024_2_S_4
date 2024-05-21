function generateArray(length) {
    const arr = [];
    for (let i = 0; i < length; i++) {
      arr.push(Math.floor(Math.random() * 1000) + 1);
    }
    return arr;
  }
  
  function bubbleSort(arr) {
    const n = arr.length;
    let operations = 0;
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        operations++;
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        }
      }
    }
    return operations;
  }
  
  function quickSort(arr, low = 0, high = arr.length - 1) {
    let operations = 0;
  
    function partition(arr, low, high) {
      const pivot = arr[high];
      let i = low - 1;
      for (let j = low; j < high; j++) {
        operations++;
        if (arr[j] < pivot) {
          i++;
          [arr[i], arr[j]] = [arr[j], arr[i]];
        }
      }
      [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
      return i + 1;
    }
  
    if (low < high) {
      const pi = partition(arr, low, high);
      operations += quickSort(arr, low, pi - 1);
      operations += quickSort(arr, pi + 1, high);
    }
  
    return operations;
  }
  
  function generateAndSort() {
    const maxLength = parseInt(document.getElementById('maxLength').value);
    if (isNaN(maxLength) || maxLength < 3) {
      alert('Please enter a valid number greater than or equal to 3');
      return;
    }
  
    const tableContainer = document.getElementById('tableContainer');
    tableContainer.innerHTML = '';
  
    const table = document.createElement('table');
    const headerRow = table.insertRow();
    ['Array Length', 'Bubble Sort Operations', 'Quick Sort Operations'].forEach(text => {
      const cell = headerRow.insertCell();
      cell.textContent = text;
    });
  
    const bubbleSortOps = [];
    const quickSortOps = [];
    const lengths = [];
  
    for (let length = 3; length <= maxLength; length++) {
      const arr = generateArray(length);
  
      const bubbleArr = [...arr];
      const quickArr = [...arr];
  
      const bubbleOps = bubbleSort(bubbleArr);
      const quickOps = quickSort(quickArr);
  
      const row = table.insertRow();
      row.insertCell().textContent = length;
      row.insertCell().textContent = bubbleOps;
      row.insertCell().textContent = quickOps;
  
      bubbleSortOps.push(bubbleOps);
      quickSortOps.push(quickOps);
      lengths.push(length);
    }
  
    tableContainer.appendChild(table);
  
    drawChart(lengths, bubbleSortOps, quickSortOps);
  
    // Show the chart text
    document.getElementById('chartText').style.display = 'block';
  }
  
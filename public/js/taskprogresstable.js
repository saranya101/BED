const taskProgress = responseData.taskProgress; // Assuming responseData is the object containing your response data

// Select the HTML element where you want to display the table
const tableContainer = document.getElementById('taskProgressTable');

// Create a table element
const table = document.createElement('table');

// Create a table header row
const headerRow = table.insertRow();
// Create table headers
const headers = ['Task ID', 'Completion Date', 'Notes', 'Points Earned'];
headers.forEach(headerText => {
  const th = document.createElement('th');
  th.textContent = headerText;
  headerRow.appendChild(th);
});

// Iterate over the task progress data and create table rows
taskProgress.forEach(progress => {
  const row = table.insertRow();
  // Add data cells to the row
  const cell1 = row.insertCell();
  cell1.textContent = progress.task_id;
  const cell2 = row.insertCell();
  cell2.textContent = progress.completion_date;
  const cell3 = row.insertCell();
  cell3.textContent = progress.notes;
  const cell4 = row.insertCell();
  cell4.textContent = progress.points;
});

// Append the table to the container element
tableContainer.appendChild(table);

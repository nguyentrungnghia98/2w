var n = 100000;
var m = 10;
var min = 1;
var max = 1000;
var datas;
const grid = document.querySelector("#grid");
const container = document.querySelector(".container")
var countRow = 0;
function loadData(){
  datas = Array(n).fill(0).map(() => Array(m).fill(0));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      const random = Math.floor(min + Math.random() * (max - min));
      datas[i][j] = random;
    }
  }
}

function renderTable(n, m, reloadData = false) {
  if(reloadData) loadData();
  countRow = 0;
  let gridHeader = "";
  gridHeader += "<th>STT</th>"
  for (let i = 1; i <= m; i++) {
    gridHeader += `<th onclick="sortIncrease(${i - 1})">${i}</th>`;
  }
  gridHeader = `<thead><tr>${gridHeader}</tr></thead>`;

  let htmlBody = "";
  
  const rows = n > 100? 100: n;
  for (let i = 0; i < rows; i++) {
    let row = `<td>${i+1}</td>`;
    for (let j = 0; j < m; j++) {
      row += `<td>${datas[i][j]}</td>`;
    }
    htmlBody += `<tr>${row}</tr>`;
  }
  htmlBody = `<tbody id="rows">${htmlBody}</tbody>`;

  grid.innerHTML = gridHeader + htmlBody;
}


function rerenderRowsSorted(n,m){
  const rows = document.querySelector("#rows");
  let htmlBody = "";

  const end = datas.length > (countRow+1)*100? (countRow+1)*100: datas.length;

  for (let i = 0; i < end; i++) {
    let row = `<td>${i+1}</td>`;
    for (let j = 0; j < m; j++) {
      row += `<td>${datas[i][j]}</td>`;
    }
    htmlBody += `<tr>${row}</tr>`;
  }
  rows.innerHTML = htmlBody;
}

function sortIncrease(column){
  datas.sort((a,b)=>{
      return a[column] - b[column]
  })
  rerenderRowsSorted(n, m);
}

function appendRow(countRow){ 
  const rows = document.querySelector("#rows");
  let htmlBody = "";
  const end = datas.length > (countRow+1)*100? (countRow+1)*100: datas.length;
  for (let i = countRow*100; i < end; i++) {
    let row = `<td>${i+1}</td>`;
    for (let j = 0; j < m; j++) {
      row += `<td>${datas[i][j]}</td>`;
    }
    htmlBody += `<tr>${row}</tr>`;
  }
  rows.innerHTML += htmlBody;
}

function onScroll(){
  if(n<=100 || (countRow + 1)*100 >= datas.length) return;
  
  const {scrollTop, scrollHeight, clientHeight} = this;
  const end = scrollHeight - (scrollTop + clientHeight);
  if(end === 0){
    countRow++;
    console.log("append", countRow)
    appendRow(countRow);
  }
}

function onChangeRow(e) {
  e.preventDefault();
  if (!isNaN(this.value)) {
    n = Number.parseInt(this.value);
    renderTable(n, m, true);
  }
}
function onChangeColumn(e) {
  e.preventDefault();
  if (!isNaN(this.value)) {
    m = Number.parseInt(this.value);
    renderTable(n, m, true);
  }
}

renderTable(n, m, true);
document.querySelector("#row").addEventListener("change", onChangeRow);
document.querySelector("#column").addEventListener("change", onChangeColumn);
container.addEventListener("scroll", onScroll)
var body = document.body;
var table = document.createElement('table');
var columns = []; // 줄들
var rows = []; // 칸들
var turn = 'X';
var result = document.createElement('div')

var clickEvent = function(event) { // 함수 실행
  console.log(event.target) // e.target 클릭 이벤트가 일어난 태그를 알려줌
  console.log(event.target.parentNode) // e.target.parentNode === 클릭 이벤트가 일어난 태그의 부모 태그

  var whatColumn = columns.indexOf(event.target.parentNode); 
  console.log('몇줄', whatColumn);
  var whatRow = rows[whatColumn].indexOf(event.target);
  console.log('몇칸', whatRow);

  if (rows[whatColumn][whatRow].textContent !== '') {
    console.log('빈칸이 아닙니다');
  } else {
    console.log('빈칸입니다')
    rows[whatColumn][whatRow].textContent = turn;
    // 세칸 다 채워졌나 ?
    var fully = false;
    // 가로선 검사
    if (
      rows[whatColumn][0].textContent === turn &&
      rows[whatColumn][1].textContent === turn &&
      rows[whatColumn][2].textContent === turn
    ) {
      fully = true;
    }
    // 세로줄 검사
    if (
      rows[0][whatRow].textContent === turn &&
      rows[1][whatRow].textContent === turn &&
      rows[2][whatRow].textContent === turn
    ) {
      fully = true;
    }
    // 대각선 검사
    if (whatColumn - whatRow === 0) { // 대각선 검사 필요한 경우
      if (
        rows[0][0].textContent === turn &&
        rows[1][1].textContent === turn &&
        rows[2][2].textContent === turn
      ) {
        fully = true;
      }
    }
    if (Math.abs(whatColumn - whatRow) === 2) { // 대각선 검사 필요한 경우
      if (
        columns[2][2].textContent === turn &&
        columns[1][1].textContent === turn &&
        columns[0][0].textContent === turn
      ) {
        fully = true;
      }
    }
    // 다 찼으면
    if (fully) {
      result.textContent = turn + '님이 승리!'
      // 초기화
      turn = 'X';
      rows.forEach(function (column) {
        column.forEach(function (row) {
          row.textContent = '';
        });
      });
    } else { // 다 안찼으면
      if (turn === 'X') {
        turn = '0';
      } else {
        turn = 'X';
      }
    } 
  }
}

for (var i = 1; i <= 3; i += 1) {
  var column = document.createElement('tr');
  columns.push(column);
  rows.push([]);
  for (var j = 1; j <= 3; j += 1) {
    var row = document.createElement('td');
    row.addEventListener('click', clickEvent);
    rows[i - 1].push(row);
    column.appendChild(row)
  }
  table.appendChild(column)
}
body.appendChild(table);
body.appendChild(result);
console.log(rows, columns);


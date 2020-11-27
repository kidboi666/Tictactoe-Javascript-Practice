var body = document.body; // 문서의 바디 를 변수 body에 할당
var table = document.createElement('table'); // table 엘리먼트를 생성하는 변수 선언
var rows = []; // 빈 배열 rows 변수 선언
var blanks = []; // 빈 배열 blanks 변수 선언
var turn = 'X'; // 문자열 X를 가진 turn 변수 선언
var result = document.createElement('div'); // div 엘리먼트를 생성하는 변수 선언 

function clickEvent (event) { // 클릭 이벤트 함수 설정
  var whatRow = rows.indexOf(event.target.parentNode); // columns에 event.target의 부모 요소를 선택 -> 몇 줄인지 
  var whatBlank = blanks[whatRow].indexOf(event.target); // rows의 columns에 event.target 선택 -> 몇 칸인지
  console.log(`몇줄 ${whatRow + 1}   몇칸 ${whatBlank + 1}`);

  if (blanks[whatRow][whatBlank].textContent !== '') { // 클릭한 개체가 비어있지 않다면
    result.textContent = '빈칸이 아닙니다'; // 빈칸이 아닙니다
  } else { // 클릭한 개체가 비어있다면 
    blanks[whatRow][whatBlank].textContent = turn; // 항상 x가 선빵임?
    var fully = false; // fully 변수 선언  ->  불린 초기 값으로 false 할당
    // 조건문으로 가로선 빙고 유무 검사
    if (
      blanks[whatRow][0].textContent === turn && 
      blanks[whatRow][1].textContent === turn && // and연산자 -> 모두 참일때 발동
      blanks[whatRow][2].textContent === turn
    ) {//   event.target.parentNode
      fully = true; // 모두 채워져 있다면 fully에 true 할당
    }
    // 세로줄 검사
    if (
      blanks[0][whatBlank].textContent === turn &&
      blanks[1][whatBlank].textContent === turn &&
      balnks[2][whatBlank].textContent === turn
    ) {//      event.target
      fully = true;
    }
    // 대각선 검사
    if (whatRow - whatBlank === 0) { // 대각선 검사가 필요한 경우
      if (
        blanks[2][0].textContent === turn &&
        blanks[1][1].textContent === turn &&
        blanks[0][2].textContent === turn
      ) {
        fully = true;
      }
    }
    if (Math.abs(whatRow - whatBlank) === 2) {
      if (
        columns[0][2].textContent === turn &&
        columns[1][1].textContent === turn &&
        columns[2][0].textContent === turn
      ) {
        fully = true;
      }
    }
    if (fully) {
      result.textContent = turn + '님이 승리!'
      // 초기화
      turn = 'X';
      blanks.forEach(function (row) {
        row.forEach(function (blank) {
          blank.textContent = '';
        });
      });
    } else {
      if (turn === 'X') {
        turn = '0';
      } else {
        turn = 'X';
      }
    }
  }
}

for (var i = 1; i <= 3; i += 1) { // 반복문으로 엘리먼트 생성
  var row = document.createElement('tr'); // tr엘리먼트 생성하는 변수 선언
  rows.push(row); // 빈 배열 rows에다가 row변수 할당
  blanks.push([]); // 빈 배열 rows에 빈 배열 (한 줄씩 생성)
  for (var j = 1; j <= 3; j += 1) { // tr안에 td 반복문 생성
    var blank = document.createElement('td'); // td엘리먼트 생성하는 변수 선언
    blank.addEventListener('click', clickEvent); // row에 클릭 이벤트 함수 할당
    blanks[i - 1].push(blank); // rows에 현재 반복문의 i값에 푸쉬
    row.appendChild(blank); // column의 자식 요소로 row 등록
  }
  table.appendChild(row); // table의 자식요소로 row 등록
}
body.appendChild(table); // body의 자식요소로 table 등록
body.appendChild(result); // body의 자식요소로 result등록
console.log(blanks, rows);
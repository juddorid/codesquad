﻿# Coding Test for CODE SQUAD

2021 마스터즈 코스 테스트를 위한 **단계별 루빅스 큐브 구현** 파일 입니다.

## Folders & Files

> - **step-1**
>   - step-1.html
>   - pushWord.js

> - **step-2**
>   - step-2.html
>   - planeCube.js

> - **step-3**
>   - step-3.html
>   - rubiksCube.js

> codeSquadTest.html

---

### codeSquadTest.html

단계별 결과물을 확인할 수 있습니다.
크롬 브라우저에서 600px 기준으로 놓고, 콘솔창을 켜놓고 작업을 했습니다.
(사이즈를 맞춰놓고 보시면 확인하실 때, 조금 더 편리하실 수 있습니다.)

---

### STEP 1. 단어 밀어내기 구현하기

1. **밀어낼 단어를 입력합니다.**
   (white space도 입력값으로 인정합니다.)
2. **방향은 L 또는 R만 입력 가능합니다.**
   (소문자도 가능합니다.)
3. **숫자를 입력합니다.**
   (숫자는 -100에서 99사이의 정수만 가능합니다. 나머지는 예외 처리 됩니다.)

input 3개를 안내대로 입력하고,
**실행**버튼을 클릭하면 맨 아래 결과창에 **결과**가 나타납니다. **다시하기** 버튼을 누르면 모든 입력창이 **리셋**됩니다.

---

### STEP 2. 평면 큐브 구현하기

1. **명령어를 입력합니다.**
   (유효한 입력값: U, U', R, R', L, L', B, B', Q)
2. **GO! 버튼을 누르면 큐브가 회전하면서 명령어와 함께 새로운 큐브가 그려집니다.**
3. **CUBE버튼을 누르면 새로고침 됩니다.**
4. **Q를 입력하면 종료메시지와 함께 프로그램이 종료됩니다.**

입력받는 값은 소문자, white space도 인정됩니다.
연속된 singleQoute는 예외처리 됩니다.

---

### STEP 3. 루빅스 큐브 구현하기

1. **처음 그려진 큐브는 O(orange color)면을 F(front)로 하고, 기준으로 큐브를 회전합니다.**
2. **B(blue)는 U(up), W(white)는 L(left), G(green)는 R(right), Y(yellow)는 B(back), R(red)는 D(down)입니다.**
3. **명령어를 입력하고, GO! 버튼을 누르면 큐브가 회전하면서 명령어와 함께 새로운 큐브가 그려집니다.**
4. **Random 버튼을 누르면 임의의 명령어대로 10번 회전한 큐브가 나타납니다.**
5. **큐브가 완성되면 경과시간, 조작횟수와 함께 축하메세지가 나타나고, input창에는 'BYE~' 메세지가 출력되며 프로그램이 종료됩니다.**
   (종료된 프로그램은 input창이 비활성화 됩니다.)
6. **CUBE 버튼을 누르면 새로운 프로그램이 시작됩니다.**

**명령어**는 **각 회전면의 이름**으로 합니다. (**dafault**는 **시계방향**, **singleQoute**가 있으면 **반시계방향**으로 회전합니다.)
**숫자는 2만 입력**받을 수 있습니다. (큐브 특성상 2이상은 반대로 회전시키면 되기 때문에 2는 입력값으로 인정했습니다.)

---

### Needs Some Debugging

- **step-1**
  - 입력값을 체크하는 과정에서 순서대로 체크하게 되기 때문에 방향값이 잘못입력되더라도 숫자칸이 비어있으면 빈 칸 오류 메세지가 나타납니다.
- **step-2**
  - Q가 여러번 입력됐을 때의 예외처리가 없습니다.
- **step-3**
  - Q가 여러번 입력됐을 때의 예외처리가 없습니다.
  - 큐브가 완성되었을 때나 Q로 종료된 이후 RANDOM버튼을 눌렀을 때(비활성화 된 input창 활성화 및 그려진 큐브 리셋안됨)의 예외처리가 없습니다. (CUBE버튼을 눌러 새로고침으로 빠져나올 수는 있습니다.)

### Update

---

---

## Problems

1. **CONSOLE?**
   문제를 받고, 가장 당황스러웠던 점은 콘솔로 입력값을 받아야 한다는 것이었습니다. 6면 펼쳐진 큐브를 어떻게 출력해야할지 고민하다가 Viewer를 구현하기로 결정했습니다.
2. **VIEWER!**
   Viewer를 만드는 것으로 콘솔에 큐브를 펼치는 문제에서 벗어났지만 브라우저에 큐브를 펼치는 것도 생각보다 쉽지 않았습니다.
3. **TIME**
   당연하게도 가장 많은 고민을 하고, 가장 많은 시간을 할애해야 했던것은 루빅스 큐브의 로직이었지만
4. **AGAIN! VIEWER!**
   그것을 표현하는 일도 생각보다 많은 시행착오와 시간을 필요로 했습니다.
5. **USER INPUT**
   사용자 입력값을 제한적으로 받아오는 것에도 생각보다 많은 시간이 필요했습니다.

## Feelings

1. 일주일짜리 Test는 인생을 살면서 처음이었다.
2. 게다가 문제는 단 3문제다.
3. 게다가 오픈북이다.
4. 그런데 시간이 부족했다.
5. 후회없이 쏟아부었고,
6. 어쩌면 이것이 나의 현재 모습이고 최선이다.
7. 더 이상 진전이 없을 때는 절망적이었지만
8. 한 걸음 나아갔을 때, 그만큼 쾌감이 있었다.
9. (그래봤자 고작 큐브가 한 번 돌아간건데...)
10. 나는 그걸 위해 며칠밤을 지새웠다.
11. 마감까지 ~~아직 18시간~~ 정도가 남았다.
12. 마무리하러 가자. [RACCOON](https://github.com/juddorid/codesquad)

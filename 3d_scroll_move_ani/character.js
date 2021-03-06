function Character(info) {
  //인스턴스 객체의 속성으로 쓰게됨
  this.mainElem = document.createElement("div");
  this.mainElem.classList.add("character");
  this.mainElem.innerHTML = `
        
          <div class="character-face-con character-head">
            <div class="character-face character-head-face face-front"></div>
            <div class="character-face character-head-face face-back"></div>
          </div>
          <div class="character-face-con character-torso">
            <div class="character-face character-torso-face face-front"></div>
            <div class="character-face character-torso-face face-back"></div>
          </div>
          <div class="character-face-con character-arm character-arm-right">
            <div class="character-face character-arm-face face-front"></div>
            <div class="character-face character-arm-face face-back"></div>
          </div>
          <div class="character-face-con character-arm character-arm-left">
            <div class="character-face character-arm-face face-front"></div>
            <div class="character-face character-arm-face face-back"></div>
          </div>
          <div class="character-face-con character-leg character-leg-right">
            <div class="character-face character-leg-face face-front"></div>
            <div class="character-face character-leg-face face-back"></div>
          </div>
          <div class="character-face-con character-leg character-leg-left">
            <div class="character-face character-leg-face face-front"></div>
            <div class="character-face character-leg-face face-back"></div>
          </div>
        `;

  document.querySelector(".stage").appendChild(this.mainElem);
  this.mainElem.style.left = `${(left = info.xPos)}%`;
  //하단의 character때문에 this(Character 인스턴스로 접근)하여 init()가 자동완성
  //스크롤인지 아닌지
  this.scrollState = false;
  //ㅂ로 이전 스크롤 위치
  this.lastScrollTop = 0;
  this.xPos = info.xPos;
  this.direction;
  this.speed = info.speed;

  //좌우 이동중 여부
  this.runningState = false;
  //requestAnimationFrame Id를 담을변수
  this.rafId;
  this.init();
}

/**NOTE:프로토타입에 메서드 속성을 추가생성 */
// Character.prototype.xxxx=function(){
// };

/**NOTE:프로토타입 재정의때문에 constructor를 재 생성 */
Character.prototype = {
  constructor: Character,
  init: function () {
    const self = this;
    window.addEventListener("scroll", function () {
      //스크롤 진행 중에는 scrollState에 할당된 timeoutId는 누적된 채로 setTimeout에 설정된 타이머를 초기화
      //스크롤이 멈추면 clearTimeout은 실행하지않고 마지막(제일 최근) setTimeout에 의해 running이 remove
      clearTimeout(self.scrollState);

      //처음 한번만 실행
      if (!self.scrollState) {
        self.mainElem.classList.add("running");
      }

      //동시에 scrollState에 0.5초후에 코드를 실행, 0.5초전에는 scrollState에 setTimeout에 의해 timeoutID 순차적누적
      self.scrollState = setTimeout(() => {
        self.scrollState = false;

        self.mainElem.classList.remove("running");
      }, 100);

      //console.log(self.scrollState);

      //console.log("self.lastScrollTop", self.lastScrollTop);
      //console.log("pageYOffset", pageYOffset);

      //NOTE:이전 스크롤 위치와 현재 스크롤 위치 비교
      if (self.lastScrollTop > this.pageYOffset) {
        self.mainElem.setAttribute("data-direction", "backward");
      } else {
        self.mainElem.setAttribute("data-direction", "forward");
      }

      //NOTE:스크롤 감지를 통한 headerMenu 노출에 응용할 수 있다.
      self.lastScrollTop = this.pageYOffset;
    });

    /**키보드 좌우 이벤트 */
    window.addEventListener("keydown", function (e) {
      //NOTE:누르고 있는동안 keydown 중첩 방지;
      if (self.runningState) return;
      //console.log("키다운이벤트발생", e);

      if (e.keyCode == 37) {
        self.mainElem.setAttribute("data-direction", "left");
        self.direction = "left";
        // self.xPos -= self.speed;
        // self.mainElem.style.left = self.xPos + "%";
        self.mainElem.classList.add("running");
        self.run(self);
        //키를 누를때 flag값으로 넘겨 상단에 조건문으로 현재 조건문을 다시 접근 못하도록 하기위함
        self.runningState = true;
      } else if (e.keyCode == 39) {
        self.direction = "right";
        self.mainElem.setAttribute("data-direction", "right");
        // self.xPos += self.speed;
        // self.mainElem.style.left = self.xPos + "%";
        self.mainElem.classList.add("running");
        self.run(self);
        self.runningState = true;
      }
    });

    /**키보드를 뗏을때, 러닝 중지 */
    window.addEventListener("keyup", function (e) {
      self.mainElem.classList.remove("running");
      //NOTE: 멈춤 동작 추가
      this.cancelAnimationFrame(self.rafId);
      //키다운 다시 누를 수 있도록 초기화
      //console.log(self.runningState);
      self.runningState = false;
    });
  },

  run: function (self) {
    if (self.direction == "left") {
      self.xPos -= self.speed;
    } else if (self.direction == "right") {
      self.xPos += self.speed;
    }

    //NOTE:화면 밖으로 나가지 않도록 범위제한
    //console.log(self.xPos);
    if (self.xPos < 2) {
      //self.xPos=info => self.xPos=2;
      self.xPos = 2;
    }

    if (self.xPos > 88) {
      self.xPos = 88;
    }

    self.mainElem.style.left = self.xPos + "%";

    self.rafId = requestAnimationFrame(function () {
      self.run(self);
    });
  },
};

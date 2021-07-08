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

      console.log(self.scrollState);
    });
  },
};

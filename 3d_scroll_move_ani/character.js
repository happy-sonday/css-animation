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
      //this가 가리키는것은 this
      //console.log(this);
      self.mainElem.classList.add("running");
    });
  },
};

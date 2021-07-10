//NOTE:즉시 실행 함수
(() => {
  const houseElem = document.querySelector(".house");
  const barElem = document.querySelector(".progress-bar");
  const stageElem = document.querySelector(".stage");
  const mousePos = { x: 0, y: 0 };
  let maxScrollValue;

  /** 사용자 화면 비율에 맞춰 resize */
  function resizeHandler() {
    maxScrollValue = document.body.offsetHeight - window.innerHeight;
  }

  console.log(barElem);
  window.addEventListener("scroll", function () {
    const scrollPer = this.pageYOffset / maxScrollValue;
    const zMove = scrollPer * 980 - 490;

    houseElem.style.transform = "translateZ(" + zMove + "vw)";

    //progress-bar

    barElem.style.width = `${scrollPer * 100}%`;
  });

  //마우스에 이동에 따른 시점 변경
  window.addEventListener("mousemove", function (e) {
    mousePos.x = -1 + (e.clientX / window.innerWidth) * 2;
    mousePos.y = 1 - (e.clientY / window.innerHeight) * 2;
    stageElem.style.transform = `rotateX(${mousePos.y * 10}deg) rotateY(${
      mousePos.x * 10
    }deg)`;
  });

  window.addEventListener("resize", resizeHandler);
  resizeHandler();
  stageElem.addEventListener("click", function (e) {
    new Character({
      xPos: (e.clientX / window.innerWidth) * 100,

      //캐릭터 생성시 0과 1사이 속도 임의로 부여
      //최대값 0.5 최소값 0.2
      speed: Math.random() * 0.5 + 0.2,
    });
  });
})();

//NOTE:즉시 실행 함수
(() => {
  const houseElem = document.querySelector(".house");
  const barElem = document.querySelector(".progress-bar");
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

  window.addEventListener("resize", resizeHandler);
  resizeHandler();
})();

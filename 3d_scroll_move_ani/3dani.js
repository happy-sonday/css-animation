//NOTE:즉시 실행 함수
(() => {
  const houseElem = document.querySelector(".house");
  let maxScrollValue;

  /** 사용자 화면 비율에 맞춰 resize */
  function resizeHandler() {
    maxScrollValue = document.body.offsetHeight - window.innerHeight;
  }
  window.addEventListener("scroll", function () {
    const zMove = (this.pageYOffset / maxScrollValue) * 980 - 490;
    houseElem.style.transform = "translateZ(" + zMove + "vw)";
  });

  window.addEventListener("resize", resizeHandler);
  resizeHandler();
})();

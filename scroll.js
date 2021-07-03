(function () {
  //alert("실행");
  const outputElem = this.document.querySelector(".output");

  window.addEventListener("scroll", function () {
    outputElem.innerHTML = "글씨가 안써져요";
    //outputElem.innerHTML = window.pageYOffset;
  });
})();

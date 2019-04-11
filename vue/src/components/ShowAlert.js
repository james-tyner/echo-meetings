const showAlert = function(color, message){
      // Borrowed from: https://gist.github.com/alirezas/c4f9f43e9fe1abba9a4824dd6fc60a55

      function fadeOut(el){
        el.style.opacity = 1;

        (function fade() {
          if ((el.style.opacity -= .1) < 0) {
            el.style.display = "none";
          } else {
            requestAnimationFrame(fade);
          }
        })();
      };

      function fadeIn(el, display){
        el.style.opacity = 0;
        el.style.display = display || "block";

        (function fade() {
          var val = parseFloat(el.style.opacity);
          if (!((val += .1) > 1)) {
            el.style.opacity = val;
            requestAnimationFrame(fade);
          }
        })();
      };

      let modal = document.getElementById("alert-modal");

      modal.getElementsByTagName("p")[0].innerHTML = message;

      modal.classList.add(color + "-color-band");

      fadeIn(modal, "block");
      setTimeout(() => {
        fadeOut(modal);
      }, 2000)
    }

export default showAlert;

const AnimateSave = {
  methods: {
    animateSave() {
      // Borrowed from: https://gist.github.com/alirezas/c4f9f43e9fe1abba9a4824dd6fc60a55

      function fadeOut(el) {
        el.style.opacity = 1;

        (function fade() {
          if ((el.style.opacity -= 0.1) < 0) {
            el.style.display = 'none';
          } else {
            requestAnimationFrame(fade);
          }
        }());
      }

      function fadeIn(el, display) {
        el.style.opacity = 0;
        el.style.display = display || 'block';

        (function fade() {
          let val = parseFloat(el.style.opacity);
          if (!((val += 0.1) > 1)) {
            el.style.opacity = val;
            requestAnimationFrame(fade);
          }
        }());
      }

      const icon = document.getElementById('save-animation');

      fadeIn(icon, 'block');
      setTimeout(() => {
        fadeOut(icon);
      }, 2000);
    },
  },
};

export default AnimateSave;

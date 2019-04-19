const showAlert = function (color, message, time = 5000) {
  let modal = document.getElementById("alert-modal");

  modal.getElementsByTagName("p")[0].innerHTML = message;
  modal.classList.remove("green-color-band", "blue-color-band", "red-color-band", "magenta-color-band", "orange-color-band");

  modal.classList.add(color + "-color-band");
  modal.classList.remove('out');
  modal.classList.add('in');

  setTimeout(() => {
    modal.classList.remove('in');
    modal.classList.add('out');
  }, time)
}

export default showAlert;

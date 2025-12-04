const basePath = window.location.pathname.split("/ubuntu")[0] + "/ubuntu";

function goTo(path) {
  window.location.href = basePath + "/" + path;
}

document.addEventListener("DOMContentLoaded", function () {
  function updateClock() {
    const clockElement = document.getElementById("clock");
    const now = new Date();

    const options = {
      day: "numeric",
      month: "long",
      hour: "2-digit",
      minute: "2-digit",
    };
    const timeString = now.toLocaleDateString("fr-FR", options);

    if (clockElement) {
      clockElement.textContent = timeString;
    }
  }

  updateClock();
});

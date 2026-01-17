document.addEventListener("DOMContentLoaded", () => {
  const mapContainer = document.querySelector(".text-map__map");
  const originalWidth = 812;

  if (!mapContainer) return;

  function updateScale() {
    const currentWidth = mapContainer.offsetWidth;
    const scale = currentWidth / originalWidth;
    mapContainer.style.setProperty("--map-scale", scale);
  }

  updateScale();
  window.addEventListener("resize", updateScale);
});

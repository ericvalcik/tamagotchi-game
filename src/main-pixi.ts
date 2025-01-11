import { initApp } from "./pixi/app";
import { loadAdor } from "./pixi/character";

(async () => {
  await initApp();
  await loadAdor();
})();

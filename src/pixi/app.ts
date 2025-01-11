import { Application } from "pixi.js";

// Create a new application
export const app = new Application();

export async function initApp() {
  // Initialize the application
  await app.init({ backgroundAlpha: 0, width: 300, height: 300 });

  // Append the application canvas to the document body
  document.getElementById("pixi-container")!.appendChild(app.canvas);
}

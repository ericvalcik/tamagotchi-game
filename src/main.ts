import { Application, Assets, AnimatedSprite, Sprite } from "pixi.js";

(async () => {
  // Create a new application
  const app = new Application();

  // Initialize the application
  await app.init({ background: "#1099bb", resizeTo: window });

  // Append the application canvas to the document body
  document.getElementById("pixi-container")!.appendChild(app.canvas);

  // Load the bunny texture
  const sheet = await Assets.load("/assets/ador.json");

  const adorRunning = new AnimatedSprite(sheet.animations["idle"]);
  adorRunning.texture.baseTexture.scaleMode = "nearest";
  adorRunning.animationSpeed = 0.07;
  adorRunning.scale.set(8);
  adorRunning.anchor.set(0.5);
  adorRunning.position.set(app.screen.width / 2, app.screen.height / 2);

  // Add the bunny to the stage
  app.stage.addChild(adorRunning);

  // Play the animation
  adorRunning.play();

  // Listen for animate update
  app.ticker.add((time) => {
    // Just for fun, let's rotate mr rabbit a little.
    // * Delta is 1 if running at 100% performance *
    // * Creates frame-independent transformation *
    // ador.rotation += 0.1 * time.deltaTime;
  });
})();

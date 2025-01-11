import { Application, Assets, AnimatedSprite } from "pixi.js";

(async () => {
  // Create a new application
  const app = new Application();

  // Initialize the application
  await app.init({ backgroundAlpha: 0, width: 300, height: 300 });

  // Append the application canvas to the document body
  document.getElementById("pixi-container")!.appendChild(app.canvas);

  // Load the bunny texture
  const sheet = await Assets.load("/assets/ador.json");

  const adorIdle = new AnimatedSprite(sheet.animations["idle"]);
  adorIdle.texture.source.scaleMode = "nearest";
  adorIdle.animationSpeed = 0.07;
  adorIdle.scale.set(4);
  adorIdle.anchor.set(0.5);
  adorIdle.position.set(app.screen.width / 2, app.screen.height / 2);

  const adorRun = new AnimatedSprite(sheet.animations["run"]);
  adorRun.texture.source.scaleMode = "nearest";
  adorRun.animationSpeed = 0.12;
  adorRun.scale.set(4);
  adorRun.anchor.set(0.5);
  adorRun.position.set(app.screen.width / 2, app.screen.height / 2);

  // Add the bunny to the stage
  app.stage.addChild(adorIdle);

  // Play the animation
  adorIdle.play();

  // Listen for animate update
  app.ticker.add((time) => {
    // Just for fun, let's rotate mr rabbit a little.
    // * Delta is 1 if running at 100% performance *
    // * Creates frame-independent transformation *
    // ador.rotation += 0.1 * time.deltaTime;
  });
})();

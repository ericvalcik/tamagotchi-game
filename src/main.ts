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

  const adorIdle = new AnimatedSprite(sheet.animations["idle"]);
  adorIdle.texture.baseTexture.scaleMode = "nearest";
  adorIdle.animationSpeed = 0.07;
  adorIdle.scale.set(16);
  adorIdle.anchor.set(0.5);
  adorIdle.position.set(app.screen.width / 2, app.screen.height / 2);

  const adorRun = new AnimatedSprite(sheet.animations["run"]);
  adorRun.texture.baseTexture.scaleMode = "nearest";
  adorRun.animationSpeed = 0.12;
  adorRun.scale.set(16);
  adorRun.anchor.set(0.5);
  adorRun.position.set(app.screen.width / 2, app.screen.height / 2);

  const buttonSheet = await Assets.load("/assets/start-btn.json");

  const btnUp = new Sprite(buttonSheet.textures["up"]);
  btnUp.texture.baseTexture.scaleMode = "nearest";
  btnUp.scale.set(8);
  btnUp.anchor.set(0.5);
  btnUp.position.set(app.screen.width / 2, app.screen.height * 0.8);
  btnUp.eventMode = "static";
  btnUp.cursor = "pointer";
  btnUp.on("pointerdown", (event) => {
    btnUp.texture = buttonSheet.textures["down"];
  });
  btnUp.on("pointerup", (event) => {
    btnUp.texture = buttonSheet.textures["up"];
  });
  btnUp.on("pointerout", (event) => {
    btnUp.texture = buttonSheet.textures["up"];
  });

  // Add the bunny to the stage
  app.stage.addChild(adorIdle);
  app.stage.addChild(btnUp);

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

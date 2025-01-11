import { Assets, AnimatedSprite, TickerCallback } from "pixi.js";
import { app } from "./app";
import { keyboard } from "./keyboard";

export async function loadAdor() {
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

  // setup keyboard listeners
  setupKeyboard();

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
}

const getMapElement = (): HTMLElement => {
  const mapElement = document.getElementById("root-container");
  if (!mapElement) {
    throw Error("Couldn't find the map element");
  }
  return mapElement;
};

const setupKeyboard = () => {
  const left = keyboard("a");
  const right = keyboard("d");
  const up = keyboard("w");
  const down = keyboard("s");

  const mapEl = getMapElement();

  // Listen for animate update
  app.ticker.add((time) => {
    const toMove = 5 * time.deltaTime;

    if (left.isDown) {
      mapEl.scrollLeft -= toMove;
    }
    if (right.isDown) {
      mapEl.scrollLeft += toMove;
    }
    if (down.isDown) {
      mapEl.scrollTop += toMove;
    }
    if (up.isDown) {
      mapEl.scrollTop -= toMove;
    }
  });
};

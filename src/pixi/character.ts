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
  const { getRunning } = setupKeyboard();

  // Add the bunny to the stage
  let idleStage = app.stage.addChild(adorIdle);
  let runStage = app.stage.addChild(adorRun);
  runStage.visible = false;

  // Play the animation
  adorIdle.play();
  adorRun.play();
  let loaded: "idle" | "run" = "idle";

  // Listen for animate update
  app.ticker.add(() => {
    const running = getRunning();
    if (running && loaded === "idle") {
      idleStage.visible = false;
      runStage.visible = true;
      loaded = "run";
    }
    if (!running && loaded === "run") {
      idleStage.visible = true;
      runStage.visible = false;
      loaded = "idle";
    }
  });
}

const getMapElement = (): HTMLElement => {
  const mapElement = document.getElementById("root-container");
  if (!mapElement) {
    throw Error("Couldn't find the map element");
  }
  return mapElement;
};

type SetupKeyboardReturn = {
  getRunning: () => boolean;
};

const setupKeyboard = (): SetupKeyboardReturn => {
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

  return {
    getRunning: () => left.isDown || right.isDown || up.isDown || down.isDown,
  };
};

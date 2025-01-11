import React, { FC, ReactNode } from "react";
import { cn } from "../../lib/cn";

type Direction = "up" | "left" | "down" | "right";

export const Controls: FC = () => {
  const getScrollFn = (direction: Direction) => {
    switch (direction) {
      case "left":
      case "right":
        return () => {
          const element = document.getElementById("root-container");
          if (element) {
            const amount = direction === "left" ? -10 : 10;
            element.scrollLeft += amount;
            console.log(`scrolling ${direction}`);
          }
        };
      case "up":
      case "down":
        return () => {
          const element = document.getElementById("root-container");
          if (element) {
            const amount = direction === "up" ? -10 : 10;
            element.scrollTop += amount;
            console.log(`scrolling ${direction}`);
          }
        };
    }
  };

  return (
    <>
      <Row>
        <Block />
        <Block onClick={getScrollFn("up")}>⬆️</Block>
        <Block />
      </Row>
      <Row>
        <Block onClick={getScrollFn("left")}>⬅️</Block>
        <Block />
        <Block onClick={getScrollFn("right")}>➡️</Block>
      </Row>
      <Row>
        <Block />
        <Block onClick={getScrollFn("down")}>⬇️</Block>
        <Block />
      </Row>
    </>
  );
};

const Row: FC<{ children?: ReactNode }> = ({ children }) => {
  return <div className="flex flex-row">{children}</div>;
};
type BlockProps = {
  children?: ReactNode;
  wBorder?: boolean;
  onClick?: () => void;
};

const Block: FC<BlockProps> = ({ wBorder, children, onClick }) => {
  return (
    <div
      className={cn(
        "size-[36px] flex flex-row items-center justify-center text-4xl pointer-events-auto",
        children && "cursor-pointer",
        wBorder && "border border-solid border-black rounded-md",
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

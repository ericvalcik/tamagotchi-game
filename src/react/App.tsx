import { useState, useEffect } from "react";
import { Controls } from "./components/Controls";

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const element = document.getElementById("root-container");
    if (element) {
      console.log("Pre-scroll to the middle");
      // element.scrollTop = 300;
      // element.scrollLeft = 300;
    }
  }, []);

  return (
    <div
      className="overflow-scroll max-h-screen pointer-events-none"
      id="root-container"
    >
      <main className="py-[calc(50vh-70px)] px-[calc(50%-40px)] w-max">
        <div className="h-[1000px] w-[800px] border-4 border-solid border-yellow-500 p-4">
          <h1>Vite + React</h1>
          <div>
            <button
              onClick={() => setCount((count) => count + 1)}
              className="pointer-events-auto"
            >
              count is {count}
            </button>
            <p>
              Edit <code>src/App.tsx</code> and save to test HMR
            </p>
          </div>
          <Controls />
        </div>
      </main>
    </div>
  );
}

export default App;

import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <main className="h-screen w-screen flex flex-row items-center justify-center">
      <div className="">
        <h1>Vite + React</h1>
        <div>
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
      </div>
    </main>
  );
}

export default App;

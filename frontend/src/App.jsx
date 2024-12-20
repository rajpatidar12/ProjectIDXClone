import "./App.css";
import { useState } from "react";
import { PingComponents } from "../src/components/atoms/PingComponents.jsx";
function App() {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <>
      <button onClick={() => setIsVisible(!isVisible)}>Toggle</button>
      {isVisible && <PingComponents />}
    </>
  );
}
export default App;

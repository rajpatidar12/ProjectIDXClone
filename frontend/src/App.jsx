import { useEffect } from "react";
import { pingApi } from "../src/apis/ping.js";
import "./App.css";

function App() {
  useEffect(() => {
    pingApi();
  }, []);
  return <>Hello</>;
}

export default App;

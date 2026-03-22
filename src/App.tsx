import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";

interface JobPost {
  id: nubmer;
  company: string;
  logo: string;
  position: string;
  role: string;
  level: string;
  description: string;
  languages: string[];
}

const [jPosts, setJposts] = useState<JobPosts[]>(data);
const [filters, setFilters] = useState<string[]>([]);

function App() {
  const [count, setCount] = useState(0);

  return <></>;
}

export default App;

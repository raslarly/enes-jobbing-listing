import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import "./fe-mentors/data.json";

interface JobPost {
  id: number;
  company: string;
  logo: string;
  new: boolean;
  featured: boolean;
  position: string;
  role: string;
  level: string;
  postedAt: string;
  contract: string;
  location: string;
  languages: string[];
  tools: string[];
}

function JobCard({ job, onTagClick }: JobCardProps) {
  return (
    <>
      <div className="job-card">
        <img src={job.logo} alt={job.company} />
        <div className="job-card-content">
          <h3>{job.position}</h3>
          <p>{job.description}</p>
          <div className="tags">
            {job.languages.map((tag) => {
              return (
                <div className="tag" key={tag}>
                  {tag}
                </div>
              );
            })}
            {job.level.map((tag) => {
              return (
                <div className="tag" key={tag}>
                  {tag}
                </div>
              );
            })}
            {job.role.map((tag) => {
              return (
                <div className="tag" key={tag}>
                  {tag}
                </div>
              );
            })}
            <button onClick={() => onTagClick(job.company)}>View Job</button>
            <button>Apply</button>
          </div>
        </div>
      </div>
    </>
  );
}

function App() {
  const [count, setCount] = useState(0);
  const [jPosts, setJposts] = useState<JobPost[]>(data);
  const [filters, setFilters] = useState<string[]>([]);

  const filteredJobs =
    filters.length === 0
      ? jPosts
      : jPosts.filter((job) => {
          const tags = [...job.languages, ...job.level, ...job.role];
          return filters.every((f) => tags.includes(f));
        });

  interface jobCardProps {
    job: JobPost;
    onTagClick: (tag: string) => void;
  }
  return <></>;
}

export default App;

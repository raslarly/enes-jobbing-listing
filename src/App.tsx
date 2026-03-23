import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import data from "./fe-mentors/data.json";

// now I only need to wear the assets

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

interface JobCardProps {
  job: JobPost;
  onTagClick: (tag: string) => void;
}

function JobCard({ job, onTagClick }: JobCardProps) {
  const tags = [job.role, job.level, ...job.languages, ...job.tools];
  return (
    <>
      <div className={`job-card ${job.featured ? "featured" : ""}`}>
        <img src={job.logo} alt={job.company} />
        <div className="job-card-content">
          <div className="job-card-header">
            <span className="company">{job.company}</span>
            {job.new && <span className="badge new">NEW!</span>}
            {job.featured && <span className="badge featured">FEATURED</span>}
          </div>
          <h3>{job.position}</h3>
          <div className="job-meta">
            <span>{job.postedAt}</span>
            <span>{job.contract}</span>
            <span>{job.location}</span>
          </div>
          <div className="tags">
            {tags.map((tag) => (
              <button className="tag" key={tag} onClick={() => onTagClick(tag)}>
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function App() {
  const [jPosts, setJposts] = useState<JobPost[]>(data);
  const [filters, setFilters] = useState<string[]>([]);

  const filteredJobs =
    filters.length === 0
      ? jPosts
      : jPosts.filter((job) => {
          const tags = [...job.languages, ...job.level, ...job.role];
          return filters.every((f) => tags.includes(f));
        });

  const addFilter = (tag: string) => {
    if (!filters.includes(tag)) {
      setFilters([...filters, tag]);
    }
  };
  const removeFilter = (tag: string) => {
    setFilters(filters.filter((f) => f !== tag));
  };
  return (
    <>
      <div className="app">
        {filters.length > 0 && (
          <div className="filter-bar">
            {filters.map((f) => (
              <div className="filter" key={f}>
                <span>{f}</span>
                <button onClick={() => removeFilter(f)}>X</button>
              </div>
            ))}
            <button className="clear-all" onClick={() => setFilters([])}>
              clear-all
            </button>
          </div>
        )}
        <div className="job-list">
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} onTagClick={addFilter} />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;

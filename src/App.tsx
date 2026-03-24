import { useState } from "react";
import webheader from "/public/images/bg-header-desktop.svg";
import IconRemove from "/public/images/icon-remove.svg";
import "./App.css";
import data from "./fe-mentors/data.json";
import Topbar1 from "./companents/topbar1";
// import { XMarkIcon } from "@heroicons/react/24/solid";
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
  const tags = [
    ...new Set([job.role, job.level, ...job.languages, ...job.tools]),
  ];
  return (
    <div className={`job-card ${job.featured ? "featured" : ""}`}>
      <img src={job.logo} alt={job.company} />
      <div className="job-card-content">
        <div className="job-card-header">
          <span className="company">{job.company}</span>
          {job.new && (
            <>
              {/* this is bage-new */}
              <span className="bg-[#b28f6b] p-1 rounded-sm text-white">
                NEW!
              </span>
            </>
          )}
          {job.featured && <span className="badge-featured">FEATURED!</span>}
        </div>
        <h3>{job.position}</h3>
        <div className="job-meta">
          <span>{job.postedAt}</span>
          <span>{job.contract}</span>
          <span>{job.location}</span>
        </div>
      </div>
      <div className="tags">
        {tags.map((tag) => (
          <button className="tag" key={tag} onClick={() => onTagClick(tag)}>
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}

function App() {
  const [jPosts, setJposts] = useState<JobPost[]>(data);
  const [filters, setFilters] = useState<string[]>([]);

  const filteredJobs =
    filters.length === 0
      ? jPosts
      : jPosts.filter((job) => {
          const tags = [...job.languages, ...job.tools, job.level, job.role];
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
      <img
        src={webheader}
        alt="Jobs"
        className="w-full h-full bg-[#5ba4a4] flex items-center justify-center m-0"
      />
      <div className="mx-auto app">
        {filters.length > 0 && (
          <div className=" -mt-[1.5rem] min-h-[4rem]  max-w-[1360px] bg-[#bdf0f0] p-[0.5] rounded-[0.5rem] flex flex-row flex-wrap gap-[0.5rem] items-center filter-bar">
            {filters.map((f) => (
              <div
                className="bg-[#5a7399] p-[0.25rem 0.5rem] rounded-[0.25rem] filter"
                key={f}
              >
                <span
                  className="bg-[#5ba4a4] border-none cursor-pointer p-[0.4rem 0.75rem] radius-[0.375rem] text-white 
                text-[0.8rem] font-family-inherit transition
                duration[0.2s] p-[0.25rem 0.5rem] hover:bg-[#488484]"
                >
                  {f}
                </span>
                <button onClick={() => removeFilter(f)}>
                  <img src={IconRemove} className="w-4 h-4 bg-[#006e1f]" />
                </button>
              </div>
            ))}
            <button
              className="hover:underline text-green-700"
              onClick={() => setFilters([])}
            >
              Clear
            </button>
          </div>
        )}
        <div className="max-w-[1360px] flex flex-col bg-[152.6, 95.8%, 90.6%] job-list w-full">
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} onTagClick={addFilter} />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;

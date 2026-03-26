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
    <div
      className={`job-card my-2 rounded-md max-w-[100%] w-[1360px] h-[160px] 
        overflow-hidden flex flex-row items-center gap-[1rem] rounded-[0.25rem] 
        p-[1rem] bg-white ${job.featured ? "featured border-l-5 border-l-[#5ba4a4]" : ""}`}
    >
      <img src={job.logo} alt={job.company} />
      <div className=" flex-1 job-card-content">
        <div className=" gap-3 flex items-center job-card-header">
          <span className=" text-[#5ba4a4] p-[0.25rem 0.5rem] text-[1.05rem] font-bold  company">
            {job.company}
          </span>
          {job.new && (
            <>
              {/* this is bage-new */}
              <span className="bg-[#5ba4a4] p-1  text-white rounded-[1rem]">
                NEW!
              </span>
            </>
          )}
          {job.featured && (
            <span className=" rounded-[1rem] text-white bg-[#2c3a3a] p-1 badge-featured">
              FEATURED!
            </span>
          )}
        </div>
        <h3 className="flex flex-row text-black hover:text-[#5ba4a4] text-[1.15rem] font-bold">
          {job.position}
        </h3>
        <div className=" flex flex-row job-meta gap-1">
          <span>{job.postedAt}</span>
          <span> • </span>
          <span>{job.contract}</span>
          <span> • </span>
          <span>{job.location}</span>
        </div>
      </div>
      <div className="tags  space-x-10">
        {tags.map((tag) => (
          <button
            className=" bg-[#effafa] p-[0.35rem] rounded-[0.25rem] text-[1rem] hover:text-white hover:bg-[#5ba4a4] text-[#5ba4a4] font-bold   tag"
            key={tag}
            onClick={() => onTagClick(tag)}
          >
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
          <div className=" -mt-[2rem] min-h-[4rem]  max-w-[1360px] bg-white p-[0.5] pl-[2rem] gap-[1rem] rounded-[0.35rem] flex flex-row flex-wrap  items-center filter-bar">
            {filters.map((f) => (
              <div
                className=" p-[0.1rem] rounded-[0.25rem] flex items-center filter "
                key={f}
              >
                <span
                  className="bg-[#effafa] border-none cursor-pointer p-[0.15rem] radius-[0.375rem] text-[#5ba4a4] 
                text-[1rem] font-family-inherit transition flex items-center font-bold
                duration[0.2s] hover:bg-[#5ba4a4] hover:text-[#effafa] rounded-tl-[0.25rem] rounded-bl-[0.25rem] "
                >
                  {f}
                </span>
                <button onClick={() => removeFilter(f)}>
                  <img
                    src={IconRemove}
                    className=" p-[0.4rem] rounded-br-[0.25rem] rounded-tr-[0.25rem] w-7 h-7 bg-[#5ba4a4] hover:bg-[#2c3a3a] "
                  />
                </button>
              </div>
            ))}
            <button
              className="hover:underline text-[#5ba4a4] ml-auto pr-[2rem]"
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

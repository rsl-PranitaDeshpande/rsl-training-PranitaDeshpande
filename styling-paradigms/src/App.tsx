import React, { useState } from "react";
import { DashboardApp } from "./exercise1/DashboardApp";
import { LibraryApp } from "./exercise2/LibraryApp";

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"ex1" | "ex2">("ex1");

  return (
    <div>
      <div className="bg-slate-900 text-white px-6 py-3 flex items-center justify-between border-b border-slate-800">
        <span className="font-bold text-sm tracking-wide text-sky-400">
          Styling Paradigms Assignment
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("ex1")}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
              activeTab === "ex1"
                ? "bg-sky-500 text-white"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            Exercise 1: Tailwind Dashboard
          </button>
          <button
            onClick={() => setActiveTab("ex2")}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
              activeTab === "ex2"
                ? "bg-sky-500 text-white"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            Exercise 2: Vanilla Extract Library
          </button>
        </div>
      </div>

      {activeTab === "ex1" ? <DashboardApp /> : <LibraryApp />}
    </div>
  );
};

export default App;

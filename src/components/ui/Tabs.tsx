"use client";

import { useState, ReactNode } from "react";
import { MdDownload } from "react-icons/md";

export interface TabItem {
  title: string;
  items: DeliverableItem[];
}

export interface DeliverableItem {
  name: string;
  badge?: string;
  downloadLink?: string;
}

interface TabsProps {
  title: string;
  tabs: {
    label: string;
    items: DeliverableItem[];
  }[];
}

export default function Tabs({ title, tabs }: TabsProps) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-brand-red mb-6">{title}</h2>

      {/* Tab Buttons */}
      <div className="flex flex-wrap gap-2 mb-6 border-b" style={{ borderColor: "var(--color-brand-line)" }}>
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`btn ${
              activeTab === index
                ? "btn-primary"
                : "bg-brand-bg-white text-brand-text-dark hover:bg-brand-bg-light"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-brand-bg-white rounded-lg p-6 shadow-md">
        <ul className="space-y-4">
          {tabs[activeTab].items.map((item, index) => (
            <li
              key={index}
              className="flex items-center justify-between p-4 last:border-b-0 hover:bg-brand-bg-light transition-colors border-b"
              style={{ borderColor: "var(--color-brand-line)" }}
            >
              <div className="flex-1">
                <p className="text-sm font-semibold text-brand-text-dark">
                  {item.name}
                </p>
                {item.badge && (
                  <span className="chip mt-2 bg-brand text-brand-text-light">
                    {item.badge}
                  </span>
                )}
              </div>
              {item.downloadLink && (
                <a
                  href={item.downloadLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-4 flex items-center space-x-2 text-brand-red font-semibold hover:underline text-sm"
                >
                  <span>Descargar</span>
                  <MdDownload size={18} />
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

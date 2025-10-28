"use client";

import Link from "next/link";
import { MdArrowForward, MdDownload } from "react-icons/md";
import { ReactNode } from "react";

interface InfoCardProps {
  icon?: ReactNode;
  title: string;
  description: string;
  buttonText?: string;
  buttonLink?: string;
  badge?: string;
}

export default function InfoCard({
  icon,
  title,
  description,
  buttonText = "Ver más",
  buttonLink = "#",
  badge,
}: InfoCardProps) {
  return (
    <div className="bg-brand-bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
      {/* Icon */}
      {icon && (
        <div className="text-brand-red text-4xl mb-4">
          {icon}
        </div>
      )}

      {/* Title */}
      <h3 className="text-lg font-bold text-brand-red mb-3">{title}</h3>

      {/* Badge */}
      {badge && (
        <div className="inline-block mb-3 px-3 py-1 rounded-full bg-brand-red text-brand-text-light text-xs font-semibold">
          {badge}
        </div>
      )}

      {/* Description */}
      <p className="text-sm text-brand-text-dark mb-4 leading-relaxed">
        {description}
      </p>

      {/* Button */}
      <Link href={buttonLink}>
        <button className="w-full bg-brand-red text-brand-text-light py-2 px-4 rounded-md font-semibold hover:opacity-90 transition-opacity flex items-center justify-center space-x-2">
          <span>{buttonText}</span>
          {buttonText.toLowerCase().includes("descargar") ? (
            <MdDownload size={18} />
          ) : (
            <MdArrowForward size={18} />
          )}
        </button>
      </Link>
    </div>
  );
}

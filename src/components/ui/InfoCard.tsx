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
  buttonText,
  buttonLink = "#",
  badge,
}: InfoCardProps) {
  return (
    <div className="bg-brand-bg-white rounded-lg shadow-md p-4 md:p-6 border hover:shadow-lg transition-shadow" style={{ borderColor: "var(--color-brand-line)" }}>
      {/* Icon */}
      {icon && (
        <div className="text-brand-red text-3xl md:text-4xl mb-3 md:mb-4">
          {icon}
        </div>
      )}

      {/* Title */}
      <h3 className="text-base md:text-lg font-bold text-brand-red mb-2 md:mb-3">{title}</h3>

      {/* Badge */}
      {badge && (
        <div className="chip mb-2 md:mb-3 bg-brand text-brand-text-light text-xs">
          {badge}
        </div>
      )}

      {/* Description */}
      <p className="text-xs md:text-sm text-brand-text-dark mb-3 md:mb-4 leading-relaxed">
        {description}
      </p>

      {/* Button - Only show if buttonText is provided */}
      {buttonText && (
        <Link href={buttonLink || "#"}>
          <button className="w-full btn btn-primary flex items-center justify-center space-x-2 text-sm md:text-base py-2 md:py-3">
            <span>{buttonText}</span>
            {buttonText.toLowerCase().includes("descargar") ? (
              <MdDownload size={16} className="md:w-[18px] md:h-[18px]" />
            ) : (
              <MdArrowForward size={16} className="md:w-[18px] md:h-[18px]" />
            )}
          </button>
        </Link>
      )}
    </div>
  );
}

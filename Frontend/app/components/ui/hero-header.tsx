"use client";

// import Image from "next/image";

interface HeroHeaderProps {
  title: string;
  subtitle?: string;
  backgroundImage: string;
  className?: string;
}

export function HeroHeader({
  title,
  subtitle,
  backgroundImage,
  className = "",
}: HeroHeaderProps) {
  return (
    <div
      className={`relative rounded-2xl overflow-hidden bg-cover bg-center min-h-[300px] md:min-h-[400px] flex flex-col justify-center p-4 md:p-8 ${className}`}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.1)), url('${backgroundImage}')`,
        }}
      />

      {/* Content */}
      <div className="relative text-white space-y-4 max-w-2xl">
        <h1 className="text-xl md:text-4xl font-bold font-mono">{title}</h1>
        {subtitle && (
          <p className="text-sm md:text-xl text-gray-300 font-sans">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}

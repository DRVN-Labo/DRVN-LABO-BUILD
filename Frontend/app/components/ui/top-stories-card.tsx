"use client";

import Image from "next/image";
import { Play, Clock, TrendingUp, Eye, Calendar, Star } from "lucide-react";
import { useState } from "react";

interface TopStoriesCardProps {
  title: string;
  description: string;
  image: string;
  tags: Array<{
    label: string;
    type: "irl" | "podcast" | "video" | "motorsport" | "f1";
  }>;
}

export function TopStoriesCard({
  title,
  description,
  image,
  tags,
}: TopStoriesCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const getTagColor = (type: string) => {
    switch (type) {
      case "irl":
        return "bg-green-500/20 border-green-500/40 text-green-400";
      case "motorsport":
        return "bg-green-500/20 border-green-500/40 text-green-400";
      case "f1":
        return "bg-purple-500/20 border-purple-500/40 text-purple-400";
      case "podcast":
        return "bg-purple-500/20 border-purple-500/40 text-purple-400";
      case "video":
        return "bg-purple-500/20 border-purple-500/40 text-purple-400";
      default:
        return "bg-gray-500/20 border-gray-500/40 text-gray-400";
    }
  };

  return (
    <div
      className="relative bg-black/80 border border-gray-700 rounded-xl overflow-hidden min-w-[300px] max-w-[320px] h-[420px] font-mono group cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-[#00daa2]/20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#00daa2]/20 via-transparent to-transparent"></div>
      </div>

      {/* Video Thumbnail with Play Button */}
      <div className="relative h-48 bg-gradient-to-b from-gray-800 to-gray-900 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Dynamic Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

        {/* Play Button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-black/80 backdrop-blur-sm p-3 rounded-full border border-white/20 group-hover:scale-110 transition-transform duration-300">
            <Play className="h-6 w-6 text-white fill-white ml-1" />
          </div>
        </div>

        {/* Video Duration Badge */}
        <div className="absolute top-3 right-3">
          <div className="bg-black/80 backdrop-blur-sm px-2 py-1 rounded-md border border-white/20">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3 text-white" />
              <span className="text-white text-xs font-medium">12:34</span>
            </div>
          </div>
        </div>

        {/* Trending Badge */}
        <div className="absolute top-3 left-3">
          <div className="bg-[#00daa2]/90 backdrop-blur-sm px-2 py-1 rounded-md border border-[#00daa2]/40">
            <div className="flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-black" />
              <span className="text-black text-xs font-bold">TRENDING</span>
            </div>
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 flex flex-col h-[172px]">
        {/* Title - Fixed height */}
        <div className="mb-3">
          <h3 className="text-white font-bold text-sm leading-tight line-clamp-2 h-10">
            {title}
          </h3>
        </div>

        {/* Description - Fixed height */}
        <div className="mb-4 flex-1">
          <p className="text-gray-300 text-xs leading-relaxed line-clamp-3 h-12">
            {description}
          </p>
        </div>

        {/* Stats Row */}
        <div className="flex items-center justify-between mb-3 text-xs text-gray-400">
          <div className="flex items-center gap-1">
            <Eye className="h-3 w-3" />
            <span>2.4K views</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>2 days ago</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 text-[#00daa2]" />
            <span className="text-[#00daa2]">Premium</span>
          </div>
        </div>

        {/* Tags - Fixed position at bottom */}
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {tags.map((tag, index) => (
            <span
              key={index}
              className={`px-2 py-1 text-xs border rounded-md backdrop-blur-sm ${getTagColor(tag.type)}`}
            >
              {tag.label}
            </span>
          ))}
        </div>
      </div>

      {/* Hover Effect Overlay */}
      {isHovered && (
        <div className="absolute inset-0 bg-gradient-to-t from-[#00daa2]/10 to-transparent rounded-xl pointer-events-none transition-opacity duration-300"></div>
      )}
    </div>
  );
}

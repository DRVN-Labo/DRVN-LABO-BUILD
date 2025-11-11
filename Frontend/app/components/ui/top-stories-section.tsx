import { Button } from "./button";
import { TopStoriesCard } from "./top-stories-card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const topStoriesData = [
  {
    id: 1,
    title: "THE UNDERRATED APPEAL OF JDM WAGONS IN AMERICA",
    description:
      'Wagons. In America, they\'ve been unfairly labeled as "dad cars" or "boring" vehicles. But the truth is, JDM wagons offer a unique blend of practicality and performance that\'s hard to beat.',
    image: "/Articles/rhd-guys-wagons.jpg",
    tags: [
      { label: "IRL", type: "irl" as const },
      { label: "#Podcast", type: "podcast" as const },
      { label: "#Video", type: "video" as const },
    ],
  },
  {
    id: 2,
    title: "MONEY SHIFT PODCAST / EP.10",
    description:
      "In this episode of The Money Shift, we break down the latest trends in automotive culture and discuss what's driving the market.",
    image: "/Articles/MSP10.jpg",
    tags: [
      { label: "IRL", type: "irl" as const },
      { label: "#Podcast", type: "podcast" as const },
      { label: "#Video", type: "video" as const },
    ],
  },
  {
    id: 3,
    title: "2025 F1 PRE-SEASON TESTING-EVERYTHING YOU NEED TO KNOW",
    description:
      "As the 2025 Formula 1 season approaches, excitement is building around the new regulations and team developments.",
    image: "/Articles/f1-cover-1.jpg",
    tags: [
      { label: "Motorsport", type: "motorsport" as const },
      { label: "#F1", type: "f1" as const },
    ],
  },
];

interface TopStoriesSectionProps {
  onNavigate?: (page: string) => void;
}

export function TopStoriesSection({ onNavigate }: TopStoriesSectionProps) {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

  const nextStory = () => {
    setCurrentStoryIndex((prev) => (prev + 1) % topStoriesData.length);
  };

  const prevStory = () => {
    setCurrentStoryIndex(
      (prev) => (prev - 1 + topStoriesData.length) % topStoriesData.length,
    );
  };

  return (
    <section className="space-y-4 md:space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-white text-lg md:text-2xl font-bold font-mono">
          DRVN Culture
        </h2>
        <Button
          variant="link"
          className="text-green-400 hover:text-green-300 text-sm md:text-base font-mono"
          onClick={() => onNavigate?.("culture")}
        >
          View all
        </Button>
      </div>

      {/* Desktop Top Stories */}
      <div className="hidden md:block">
        <div className="relative">
          <div className="flex items-center justify-between absolute top-1/2 -translate-y-1/2 z-10 w-full px-4">
            <Button
              variant="ghost"
              size="icon"
              className="bg-black/80 text-[#00daa2] w-10 h-10 rounded-full border border-[#00daa2] -ml-8"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="bg-black/80 text-[#00daa2] w-10 h-10 rounded-full border border-[#00daa2] -mr-8"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-4 px-8">
            {topStoriesData.slice(0, 3).map((story) => (
              <TopStoriesCard
                key={story.id}
                title={story.title}
                description={story.description}
                image={story.image}
                tags={story.tags}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Top Stories */}
      <div className="md:hidden">
        <div className="relative">
          <div className="flex items-center justify-between absolute top-1/2 -translate-y-1/2 z-10 w-full px-4">
            <Button
              variant="ghost"
              size="icon"
              className="bg-black/80 text-[#00daa2] w-10 h-10 rounded-full border border-[#00daa2] -ml-5"
              onClick={prevStory}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="bg-black/80 text-[#00daa2] w-10 h-10 rounded-full border border-[#00daa2] -mr-5"
              onClick={nextStory}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex justify-center">
            <TopStoriesCard
              title={topStoriesData[currentStoryIndex].title}
              description={topStoriesData[currentStoryIndex].description}
              image={topStoriesData[currentStoryIndex].image}
              tags={topStoriesData[currentStoryIndex].tags}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronDown,
  Info,
  Plus,
  Minus,
  TrendingUp,
  Hash,
  Gauge,
  Zap,
  Car,
  Palette,
  Settings,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { marketplaceItems } from "../../components/ui/marketplace-card";
import { useRouter } from "next/navigation";

interface CarDetailClientProps {
  id: string;
}

export function CarDetailClient({ id }: CarDetailClientProps) {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [moreInfoExpanded, setMoreInfoExpanded] = useState(false);
  const [specsExpanded, setSpecsExpanded] = useState(false);

  // Find the car data based on the ID
  const car = marketplaceItems.find((item) => item.id === parseInt(id));

  if (!car) {
    return (
      <div className="min-h-screen bg-[#131725] flex items-center justify-center">
        <div className="text-white text-xl">Car not found</div>
      </div>
    );
  }

  // Car images array - for now, use the same image for all angles since we only have one image per car
  const carImages = [
    car.image,
    car.image, // Same image for different angles
    car.image, // Same image for different angles
    car.image, // Same image for different angles
  ];

  // Icon mapping for dynamic specs
  const iconMap: {
    [key: string]: React.ComponentType<{ className?: string }>;
  } = {
    Hash,
    Gauge,
    Car,
    Zap,
    Settings,
    Palette,
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Top Navigation Bar */}
      <div className="bg-gray-950 border-b border-gray-700 px-4 py-3 flex items-center justify-between">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleBack}
          className="text-[#00daa2] hover:text-[#00daa2]/80"
        >
          <ChevronLeft className="h-7 w-7" />
        </Button>

        <h1 className="text-white text-lg font-medium font-mono">
          Vehicle Details
        </h1>

        <div className="w-10"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Hero Section with Enhanced Background */}
        <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-700 rounded-xl backdrop-blur-sm p-6">
          <div className="space-y-6">
            {/* Car Image Section */}
            <div className="relative">
              <div className="relative h-96 bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl overflow-hidden">
                <Image
                  src={carImages[currentImageIndex]}
                  alt={`${car.brand} ${car.model}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-contain"
                />

                {/* Image Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
              </div>

              {/* Image Indicators */}
              <div className="flex justify-center gap-2 mt-4">
                {carImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentImageIndex
                        ? "bg-[#00daa2]"
                        : "bg-white/60 hover:bg-white/80"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Car Details Section */}
            <div className="space-y-1">
              {/* Year & Brand with Mobile Status */}
              <div className="flex items-center justify-between lg:justify-start">
                <div className="text-red-500 text-sm font-medium uppercase font-mono">
                  {car.year} {car.brand}
                </div>

                {/* Mobile Status - Only visible on mobile */}
                <div className="lg:hidden flex flex-col items-center gap-2">
                  <div className="text-[#00daa2] text-sm font-bold">
                    ¥{car.price}
                  </div>
                  <div className="bg-transparent text-red-500 px-2 py-1 rounded text-xs font-medium flex items-center gap-1 border border-red-500">
                    <TrendingUp className="h-3 w-3" />
                    {car.status}
                  </div>
                </div>
              </div>

              {/* Model Name */}
              <h2 className="text-3xl font-bold text-white font-mono">
                {car.model.split(" ")[0]}{" "}
                <span className="italic">
                  {car.model.split(" ").slice(1).join(" ")}
                </span>
              </h2>

              {/* Collection */}
              <div className="text-white text-lg font-mono">
                {car.collection}
              </div>

              {/* Description */}
              <p className="text-gray-300 leading-relaxed font-medium font-sans">
                {car.description}
              </p>

              {/* Collapsible Sections */}
              <div className="space-y-3">
                {/* More Info Section */}
                <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg">
                  <button
                    onClick={() => setMoreInfoExpanded(!moreInfoExpanded)}
                    className="w-full px-4 py-3 flex items-center justify-between text-[#00daa2] hover:bg-gray-700/50 transition-colors"
                  >
                    <span className="font-medium font-mono">More info</span>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${moreInfoExpanded ? "rotate-180" : ""}`}
                    />
                  </button>

                  {moreInfoExpanded && (
                    <div className="px-4 pb-4 text-gray-300 text-sm space-y-2 font-sans">
                      <p>{car.moreInfo}</p>
                    </div>
                  )}
                </div>

                {/* Vehicle Specs Section */}
                <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg">
                  <button
                    onClick={() => setSpecsExpanded(!specsExpanded)}
                    className="w-full px-4 py-3 flex items-center justify-between text-[#00daa2] hover:bg-gray-700/50 transition-colors"
                  >
                    <span className="font-medium font-mono">Vehicle Specs</span>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${specsExpanded ? "rotate-180" : ""}`}
                    />
                  </button>

                  {specsExpanded && (
                    <div className="px-4 pb-4">
                      <div className="space-y-3">
                        {car.detailedSpecs.map((spec, index) => {
                          const IconComponent = iconMap[spec.icon];
                          return (
                            <div
                              key={index}
                              className="flex items-center justify-between py-2 border-b border-gray-700/50 last:border-b-0"
                            >
                              <div className="flex items-center gap-3">
                                <IconComponent className="h-4 w-4 text-[#00daa2]" />
                                <span className="text-gray-300 text-sm font-sans">
                                  {spec.label}
                                </span>
                              </div>
                              <span className="text-white font-medium text-sm font-mono">
                                {spec.value}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing and Status Section */}
        <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-700 rounded-xl backdrop-blur-sm p-6">
          <div className="space-y-6">
            {/* Price and Status */}
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-white font-mono">
                  ¥{car.price}
                </div>
                <div className="flex items-center gap-2 mt-2 font-mono">
                  <div className="bg-transparent text-red-500 px-2 py-1 rounded text-xs font-medium flex items-center gap-1 border border-red-500">
                    <TrendingUp className="h-3 w-3" />
                    {car.status}
                  </div>
                </div>
              </div>
            </div>

            {/* Value and Ownership Table */}
            <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-6 space-y-4">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-gray-400 text-sm font-sans">
                    Market Value
                  </div>
                  <div className="text-white font-bold text-lg font-mono">
                    TBD
                  </div>
                </div>
                <div>
                  <div className="text-gray-400 text-sm font-sans">
                    Appraised Value
                  </div>
                  <div className="text-white font-bold text-lg font-mono">
                    {car.mv}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-gray-400 text-sm font-sans">Spread</div>
                  <div className="text-white font-bold text-lg font-mono">
                    NA
                  </div>
                </div>
                <div>
                  <div className="text-gray-400 text-sm font-sans">
                    $RS1 Price
                  </div>
                  <div className="text-white font-bold text-lg font-mono">
                    TBA
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-gray-400 text-sm flex items-center gap-1 font-sans">
                    RS1 Members
                    <Info className="h-3 w-3" />
                  </div>
                  <div className="text-white font-bold text-lg font-mono">
                    2
                  </div>
                </div>
                <div>
                  <div className="text-gray-400 text-sm font-sans">Owners</div>
                  <div className="text-white font-bold text-lg font-mono">
                    2
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action Buttons */}
            <div className="space-y-3">
              <div className="text-center text-gray-400 text-sm font-sans">
                Buy/Sell only available with USDC.
              </div>

              <div className="flex gap-3 justify-center">
                <Button
                  variant="outline"
                  className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600 flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />+ Buy $RS1
                </Button>

                <Button
                  variant="outline"
                  className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600 flex items-center gap-2"
                >
                  <Minus className="h-4 w-4" />- Sell $RS1
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

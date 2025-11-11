"use client";

import Image from "next/image";
import {
  Clock,
  TrendingUp,
  // Zap,
  // Gauge,
  // Fuel,
  // Settings,
  // Car,
  // Star,
} from "lucide-react";
// import { useState } from "react"
import { useRouter } from "next/navigation";

// Marketplace data moved here
export const marketplaceItems = [
  {
    id: 1,
    year: "1999",
    brand: "FERRARI",
    model: "360 Modena",
    collection: "Paul Walker Collection",
    mv: "$190,000",
    av: "$190,000",
    status: "Coming Soon" as const,
    price: "$RS1",
    image: "/Cars/modena1.jpg",
    description:
      "This 1999 Ferrari 360 Modena was owned by the late Hollywood actor Paul Walker.",
    moreInfo:
      "All provenance is provided, including Walker's registration and insurance cards, license plate and copy of the previous title in Walker's name. The 360 Modena was a clean-sheet design by Ferrari which set the stage for their entire future vision. It's light weight aluminum construction, rigid chassis, and compact V8 made the 360 one of the most driver-focused cars of the late 90's - early 2000's.",
    specs: {
      engine: "3.6L V8",
      power: "400 HP",
      topSpeed: "295 km/h",
      acceleration: "4.3s 0-100",
    },
    detailedSpecs: [
      { icon: "Hash", label: "VIN", value: "ZFFYR51B000116318" },
      { icon: "Gauge", label: "Mileage", value: "74,271 mi" },
      { icon: "Car", label: "Engine", value: "Tipo F131" },
      { icon: "Zap", label: "Displacement", value: "3.6L" },
      { icon: "Settings", label: "Cylinders", value: "8" },
      { icon: "Zap", label: "Horsepower", value: "395 hp" },
      { icon: "Zap", label: "Torque", value: "275 lb ft" },
      { icon: "Settings", label: "Transmission", value: "6-Speed Manual" },
      { icon: "Car", label: "Drive", value: "RWD" },
      { icon: "Gauge", label: "Curb Weight", value: "3291 lbs" },
      { icon: "Palette", label: "Exterior Color", value: "Ferrari Red" },
      { icon: "Palette", label: "Interior Color", value: "Black Leather" },
    ],
  },
  {
    id: 2,
    year: "1999",
    brand: "NISSAN",
    model: "R34 GT-R",
    collection: "V-Spec",
    mv: "$172,000",
    av: "$172,000",
    status: "Demo" as const,
    price: "$RS2",
    image: "/Cars/bsb-gtr-1.jpg",
    description:
      "The R34 GT-R is a timeless classic. A fan favorite of the Skyline lineage, the R34 stands out as one of the best cars to ever come out of Japan.",
    moreInfo:
      "This specific example has been meticulously cared for, with fully documented importation into the UK along with complete service history. This car was imported to the UK in December of 1999 and has been in storage for a handful of years. Being a feb 99 car, it is now available to import into the US and is being offered on behalf of the UK owner. The engine has been fully rebuilt at 33,000km and has full documentation. The work carried out has been done with power, but reliability in mind, hence rebuilding at such low mileage. The car has also the cooling system upgraded to ensure that the big single turbo set up can run as cool and efficiently as possible. On the current set up, this car makes 700hp to all four wheels. ",
    specs: {
      engine: "2.6L I6 Twin-Turbo",
      power: "280 HP",
      topSpeed: "300 km/h",
      acceleration: "4.1s 0-100",
    },
    detailedSpecs: [
      { icon: "Hash", label: "VIN", value: "BNR34-000054" },
      { icon: "Gauge", label: "Mileage", value: "89,849 km" },
      { icon: "Car", label: "Engine", value: "RB26DETT" },
      { icon: "Zap", label: "Displacement", value: "2.6L" },
      { icon: "Settings", label: "Cylinders", value: "6" },
      { icon: "Zap", label: "Horsepower", value: "330 hp" },
      { icon: "Zap", label: "Torque", value: "289 lb ft" },
      { icon: "Settings", label: "Transmission", value: "6-Speed Manual" },
      { icon: "Car", label: "Drive", value: "AWD" },
      { icon: "Gauge", label: "Curb Weight", value: "3439 kg" },
      { icon: "Palette", label: "Exterior Color", value: "Batside Blue" },
      { icon: "Palette", label: "Interior Color", value: "Black" },
    ],
  },
  {
    id: 3,
    year: "1997",
    brand: "HONDA",
    model: "NSX",
    collection: "Type S",
    mv: "$152,000",
    av: "$152,000",
    status: "Demo" as const,
    price: "$RS3",
    image: "/Cars/nsx-ts-2.jpg",
    description:
      "The Honda NSX revolutionized the supercar world with its innovative aluminum construction and Formula 1-inspired engineering. This mid-engine masterpiece combines Japanese reliability with exotic car performance, creating a truly unique driving experience.",
    moreInfo:
      "This Honda NSX Type S represents the pinnacle of Japanese automotive engineering. Built with Formula 1-inspired technology, it features an all-aluminum monocoque chassis and body panels. The Type S variant includes enhanced aerodynamics, stiffer suspension, and improved handling characteristics. The car comes with complete service history and has been maintained to factory specifications. All original documentation and ownership papers are included.",
    specs: {
      engine: "3.0L V6",
      power: "290 HP",
      topSpeed: "270 km/h",
      acceleration: "5.0s 0-100",
    },
    detailedSpecs: [
      { icon: "Hash", label: "VIN", value: "JHMNA11800T000123" },
      { icon: "Gauge", label: "Mileage", value: "32,456 mi" },
      { icon: "Car", label: "Engine", value: "C30A" },
      { icon: "Zap", label: "Displacement", value: "3.0L" },
      { icon: "Settings", label: "Cylinders", value: "6" },
      { icon: "Zap", label: "Horsepower", value: "290 hp" },
      { icon: "Zap", label: "Torque", value: "224 lb ft" },
      { icon: "Settings", label: "Transmission", value: "5-Speed Manual" },
      { icon: "Car", label: "Drive", value: "RWD" },
      { icon: "Gauge", label: "Curb Weight", value: "1430 kg" },
      { icon: "Palette", label: "Exterior Color", value: "Championship White" },
      { icon: "Palette", label: "Interior Color", value: "Black" },
    ],
  },
];

interface MarketplaceCardProps {
  year: string;
  brand: string;
  model: string;
  collection: string;
  mv: string;
  av: string;
  status: "Coming Soon" | "Demo";
  price: string;
  image: string;
  description: string;
  moreInfo: string;
  specs: {
    engine: string;
    power: string;
    topSpeed: string;
    acceleration: string;
  };
  detailedSpecs: Array<{
    icon: string;
    label: string;
    value: string;
  }>;
}

export function MarketplaceCard({
  year,
  brand,
  model,
  collection,
  mv,
  av,
  status,
  price,
  image,
  // specs,
  id,
}: MarketplaceCardProps & { id: number }) {
  // const [isHovered, setIsHovered] = useState(false)
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/cars/${id}`);
  };

  return (
    <div
      className="relative bg-gradient-to-br from-gray-900 to-black border border-gray-700 rounded-xl overflow-hidden min-w-[300px] max-w-[320px] group cursor-pointer transition-all duration-500 hover:scale-105 backdrop-blur-sm"
      // onMouseEnter={() => setIsHovered(true)}
      // onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      {/* Animated Background Pattern */}
      {/* <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#00daa2]/20 via-transparent to-transparent"></div>
      </div> */}

      {/* Car Image with Overlay */}
      <div className="relative h-48 bg-black overflow-hidden">
        <Image
          src={image}
          alt={`${brand} ${model}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Dynamic Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

        {/* Status Badge */}
        <div className="absolute top-3 right-3">
          <div
            className={`px-3 py-1 rounded-full text-xs font-bold font-mono ${
              status === "Coming Soon"
                ? "bg-black/80 text-red-500"
                : "bg-black/80 text-[#00daa2]/90"
            }`}
          >
            {status === "Coming Soon" ? (
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {status}
              </div>
            ) : (
              <div className="flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                {status}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 space-y-4">
        {/* Car Info */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="text-gray-400 text-xs font-medium font-sans">
              {year} {brand}
            </div>
            <div className="flex items-center gap-1">
              <span className="text-[#00daa2] text-xs font-medium font-mono">
                {price}
              </span>
            </div>
          </div>

          <div className="text-white text-xl font-bold tracking-wide font-mono">
            {model}
          </div>

          <div className="text-gray-300 text-sm font-medium font-sans">
            {collection}
          </div>
        </div>

        {/* Pricing Table */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-3 border border-gray-700/50">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-red-400 text-xs font-medium font-sans">
                  MV
                </span>
              </div>
              <span className="text-white text-sm font-bold font-mono">
                {mv}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-blue-400 text-xs font-medium font-sans">
                  AV
                </span>
              </div>
              <span className="text-white text-sm font-bold font-mono">
                {av}
              </span>
            </div>
          </div>
        </div>

        {/* Hover Effect Overlay */}
        {/* {isHovered && (
          <div className="absolute inset-0 bg-gradient-to-t from-[#00daa2]/10 to-transparent rounded-xl pointer-events-none transition-opacity duration-300"></div>
        )} */}
      </div>
    </div>
  );
}

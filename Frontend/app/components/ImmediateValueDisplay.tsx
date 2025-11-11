// "use client";

// import { useOptimizedOnboarding } from "../../hooks/useOptimizedOnboarding";
// import { ProgressiveActionButton } from "./ProgressiveActionButton";
// import { useMiniKitNavigation } from "../../hooks/useMiniKitNavigation";
// import { Button } from "./ui/button";
// import { Card, CardContent } from "./ui/card";
// import { Car, TrendingUp, Star } from "lucide-react";
// import Image from "next/image";

// interface ImmediateValueDisplayProps {
//   onNavigateToMarketplace?: () => void;
//   onNavigateToGarage?: () => void;
// }

// export function ImmediateValueDisplay({
//   onNavigateToMarketplace,
//   onNavigateToGarage
// }: ImmediateValueDisplayProps) {
//   const { getPersonalizedContent, hasCompletedFirstAction } = useOptimizedOnboarding();
//   const { handleShare } = useMiniKitNavigation();

//   const { isPersonalized, welcomeMessage } = getPersonalizedContent();

//   // Demo content to show immediate value
//   const demoStats = {
//     totalCars: 1,
//     // activeTraders: 1234,
//     totalVolume: "$2.3M",
//     featuredCar: {
//       name: "Paul Walker Ferrari 360 Modena",
//       price: "12.5 ETH",
//       image: "/Cars/modena1.jpg",
//       trend: "+15%"
//     }
//   };

//   const handleExploreMarketplace = () => {
//     if (onNavigateToMarketplace) {
//       onNavigateToMarketplace();
//     }
//   };

//   const handleShareApp = () => {
//     handleShare(
//       "Check out DRVN/VHCLS - the premium automotive marketplace on Base!",
//       window.location.href
//     );
//   };

//   return (
//     <div className="space-y-6">
//       {/* Welcome Section */}
//       <div className="text-center space-y-4">
//         <h1 className="text-2xl md:text-4xl font-bold font-mono text-white">
//           {welcomeMessage}
//         </h1>
//         {isPersonalized && (
//           <p className="text-[#00daa2] text-sm font-mono">
//             Welcome back! Your garage is ready.
//           </p>
//         )}
//       </div>

//       {/* Demo Stats - Show immediate value */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         <Card className="bg-gray-900 border-gray-700">
//           <CardContent className="p-4 text-center">
//             <Car className="h-6 w-6 text-[#00daa2] mx-auto mb-2" />
//             <div className="text-white font-mono font-bold text-lg">{demoStats.totalCars}</div>
//             <div className="text-gray-400 text-xs font-mono">Exclusive Cars</div>
//           </CardContent>
//         </Card>

//         {/* <Card className="bg-gray-900 border-gray-700">
//           <CardContent className="p-4 text-center">
//             <Users className="h-6 w-6 text-[#00daa2] mx-auto mb-2" />
//             <div className="text-white font-mono font-bold text-lg">{demoStats.activeTraders}</div>
//             <div className="text-gray-400 text-xs font-mono">Active Traders</div>
//           </CardContent>
//         </Card> */}

//         <Card className="bg-gray-900 border-gray-700">
//           <CardContent className="p-4 text-center">
//             <TrendingUp className="h-6 w-6 text-[#00daa2] mx-auto mb-2" />
//             <div className="text-white font-mono font-bold text-lg">{demoStats.totalVolume}</div>
//             <div className="text-gray-400 text-xs font-mono">Total Volume</div>
//           </CardContent>
//         </Card>

//         <Card className="bg-gray-900 border-gray-700">
//           <CardContent className="p-4 text-center">
//             <Star className="h-6 w-6 text-[#00daa2] mx-auto mb-2" />
//             <div className="text-white font-mono font-bold text-lg">{demoStats.featuredCar.trend}</div>
//             <div className="text-gray-400 text-xs font-mono">This Week</div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Featured Car Demo */}
//       <Card className="bg-gradient-to-r from-gray-900 to-gray-800 border-[#00daa2]/30">
//         <CardContent className="p-6">
//           <div className="flex items-center gap-4">
//             <div className="relative w-20 h-20 rounded-lg overflow-hidden">
//               <Image
//                 src={demoStats.featuredCar.image}
//                 alt={demoStats.featuredCar.name}
//                 fill
//                 className="object-cover"
//               />
//             </div>
//             <div className="flex-1">
//               <h3 className="text-white font-mono font-bold text-lg">
//                 {demoStats.featuredCar.name}
//               </h3>
//               <p className="text-[#00daa2] font-mono text-sm">
//                 Current Price: {demoStats.featuredCar.price}
//               </p>
//               <p className="text-gray-400 text-xs font-mono">
//                 Trending: {demoStats.featuredCar.trend} this week
//               </p>
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Clear CTAs */}
//       <div className="space-y-4">
//         <div className="text-center">
//           <h2 className="text-white font-mono font-bold text-lg mb-4">
//             Ready to get started?
//           </h2>
//         </div>

//         <div className="flex flex-col sm:flex-row gap-3 justify-center">
//           <ProgressiveActionButton
//             actionType="explore"
//             feature="public"
//             onClick={handleExploreMarketplace}
//             className="bg-[#00daa2] hover:bg-[#00b894] text-black font-mono font-bold"
//           >
//             Explore Marketplace
//           </ProgressiveActionButton>

//           <ProgressiveActionButton
//             actionType="personalize"
//             feature="garage"
//             onClick={() => {
//               if (onNavigateToGarage) {
//                 onNavigateToGarage();
//               }
//             }}
//             variant="outline"
//             className="border-[#00daa2] text-[#00daa2] hover:bg-[#00daa2] hover:text-black font-mono font-bold"
//           >
//             View My Garage
//           </ProgressiveActionButton>
//         </div>

//         {/* Post-success sharing */}
//         {hasCompletedFirstAction && (
//           <div className="text-center space-y-3 pt-4 border-t border-gray-700">
//             <p className="text-gray-400 text-sm font-mono">
//               Love what you see? Share DRVN VHCLS with your friends!
//             </p>
//             <Button
//               onClick={handleShareApp}
//               variant="outline"
//               size="sm"
//               className="border-[#00daa2] text-[#00daa2] hover:bg-[#00daa2] hover:text-black font-mono"
//             >
//               Share App
//             </Button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

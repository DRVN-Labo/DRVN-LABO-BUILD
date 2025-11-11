"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { X, Home, Car, Wrench } from "lucide-react";
import { SignupModal } from "./signup-modal";
import Image from "next/image";

interface AutoSignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function AutoSignupModal({
  isOpen,
  onClose,
  onSuccess,
}: AutoSignupModalProps) {
  const [showSignupModal, setShowSignupModal] = useState(false);

  const handleSignupClick = () => {
    setShowSignupModal(true);
  };

  const handleSignupClose = () => {
    setShowSignupModal(false);
  };

  const handleSignupSuccess = () => {
    onSuccess();
    setShowSignupModal(false);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        {/* Garage Door Effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-black opacity-60"></div>

        <Card className="w-full max-w-lg bg-gradient-to-b from-gray-900 to-black border-2 border-[#00daa2]/30 shadow-2xl shadow-[#00daa2]/20 relative overflow-hidden">
          {/* Garage Door Lines */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00daa2] to-transparent opacity-40"></div>
          <div className="absolute top-4 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00daa2] to-transparent opacity-20"></div>
          <div className="absolute top-8 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00daa2] to-transparent opacity-10"></div>

          {/* Close Button - Styled like a garage door handle */}
          <div className="flex flex-row justify-end mt-4 mr-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-red-400 border-2 border-red-400/50 rounded-full size-8 hover:bg-red-400/10 hover:border-red-400 transition-all duration-200"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <CardHeader className="flex items-center justify-center space-y-0 pb-0">
            <CardTitle className="text-[#00daa2] text-center text-2xl font-mono mb-2 tracking-wider">
              WELCOME TO DRVN VHCLS
            </CardTitle>
          </CardHeader>

          {/* Logo with garage styling */}
          <div className="flex justify-center mb-4 relative">
            <div className="relative">
              <Image
                src="/Cars/DRVNWHITE.png"
                alt="DRVN VHCLS"
                width={100}
                height={100}
                className="mx-auto w-auto h-auto drop-shadow-[0_0_20px_rgba(0,218,162,0.3)]"
              />
            </div>
          </div>

          <CardContent className="space-y-6">
            <div className="text-center">
              <p className="text-gray-300 text-sm font-mono mb-2 tracking-wide">
                Your wallet is connected!
              </p>
              <p className="text-gray-400 text-xs font-mono mb-6 tracking-wide">
                Create your account to access the full DRVN VHCLS experience.
              </p>
            </div>

            <div className="space-y-4">
              {/* Create Account Button */}
              <Button
                onClick={handleSignupClick}
                className="w-full bg-gradient-to-r from-[#00daa2] to-[#00b894] text-black hover:from-[#00b894] hover:to-[#00daa2] font-bold font-mono h-12 text-lg shadow-lg shadow-[#00daa2]/30 transition-all duration-300 border-2 border-[#00daa2]/50 hover:border-[#00daa2] hover:scale-[1.02]"
              >
                <Home className="h-5 w-5 mr-3" />
                Create Your Garage
              </Button>
            </div>

            {/* Footer - Garage mechanic style */}
            <div className="text-center pt-4 border-t border-gray-700">
              <p className="text-gray-400 text-xs font-mono tracking-wide">
                <span className="text-[#00daa2] font-bold">JOIN</span> the
                automotive community and{" "}
                <span className="text-[#00daa2] font-bold">UNLOCK</span>{" "}
                exclusive features
              </p>
              <div className="flex justify-center mt-2 space-x-2">
                <Car className="h-4 w-4 text-[#00daa2]" />
                <Wrench className="h-4 w-4 text-[#00daa2]" />
                <Home className="h-4 w-4 text-[#00daa2]" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Signup Modal */}
      <SignupModal
        isOpen={showSignupModal}
        onClose={handleSignupClose}
        onSwitchToSignin={() => {}} // No switching needed in auto signup
        onSuccess={handleSignupSuccess}
      />
    </>
  );
}

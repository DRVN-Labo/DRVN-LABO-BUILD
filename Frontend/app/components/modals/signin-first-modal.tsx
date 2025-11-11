"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { X, UserPlus } from "lucide-react";
import { SignupModal } from "./signup-modal";
import { SigninModal } from "./signin-modal";

interface SigninFirstModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function SigninFirstModal({
  isOpen,
  onClose,
  onSuccess,
}: SigninFirstModalProps) {
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

  const handleSigninSuccess = () => {
    onSuccess();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <Card className="w-full max-w-md bg-gray-950 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-white text-xl font-mono">
              Sign In to DRVN VHCLS
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <p className="text-gray-300 text-sm font-mono mb-6">
                Connect your wallet to access your account
              </p>
            </div>

            {/* Signin Form */}
            <SigninModal
              isOpen={true}
              onClose={onClose}
              onSwitchToSignup={handleSignupClick}
              onSuccess={handleSigninSuccess}
            />

            {/* Signup Option */}
            <div className="text-center pt-4 border-t border-gray-700">
              <p className="text-gray-400 text-xs font-mono mb-3">
                Don&apos;t have an account?
              </p>
              <Button
                onClick={handleSignupClick}
                variant="outline"
                size="sm"
                className="border-[#00daa2] text-[#00daa2] hover:bg-[#00daa2] hover:text-black bg-transparent font-mono"
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Create New Account
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Signup Modal */}
      <SignupModal
        isOpen={showSignupModal}
        onClose={handleSignupClose}
        onSwitchToSignin={() => {
          setShowSignupModal(false);
        }}
        onSuccess={handleSignupSuccess}
      />
    </>
  );
}

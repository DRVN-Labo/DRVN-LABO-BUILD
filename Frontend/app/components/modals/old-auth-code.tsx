// "use client"

// import { useState, useEffect } from "react"
// import { Button } from "../ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
// import { X, UserPlus, LogIn } from "lucide-react"
// import { SignupModal } from "./signup-modal"
// import { SigninModal } from "./signin-modal"
// import { useAccount } from "wagmi"
// import Image from "next/image"
// import { ConnectButton } from "../web3/ConnectButton"

// interface AuthChoiceModalProps {
//   isOpen: boolean
//   onClose: () => void
//   onSuccess: () => void
// }

// export function AuthChoiceModal({ isOpen, onClose, onSuccess }: AuthChoiceModalProps) {
//   const { address } = useAccount()
//   const [showSignupModal, setShowSignupModal] = useState(false)
//   const [showSigninModal, setShowSigninModal] = useState(false)
//   const [userExists, setUserExists] = useState<boolean | null>(null)
//   const [isChecking, setIsChecking] = useState(false)
//   const [selectedAction, setSelectedAction] = useState<'signup' | 'signin' | null>(null)

//   // Check if user exists when wallet connects
//   useEffect(() => {
//     const checkUserExists = async () => {
//       if (address && isOpen && userExists === null) {
//         setIsChecking(true)
//         try {
//           const response = await fetch('/api/auth/check-user', {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ walletAddress: address }),
//           })

//           if (response.ok) {
//             const data = await response.json()
//             setUserExists(data.exists)

//             // Automatically show appropriate modal based on user existence
//             if (data.exists) {
//               setShowSigninModal(true)
//             } else {
//               setShowSignupModal(true)
//             }
//           }
//         } catch (error) {
//           console.error('Error checking user existence:', error)
//           setUserExists(false) // Default to signup if error
//           setShowSignupModal(true)
//         } finally {
//           setIsChecking(false)
//         }
//       }
//     }

//     checkUserExists()
//   }, [address, isOpen, userExists])

//   const handleSignupClick = () => {
//     setSelectedAction('signup')
//     // Don't show modal yet - wait for wallet connection
//   }

//   const handleSigninClick = () => {
//     setSelectedAction('signin')
//     // Don't show modal yet - wait for wallet connection
//   }

//   const handleSignupClose = () => {
//     setShowSignupModal(false)
//     setUserExists(null) // Reset for next time
//     setSelectedAction(null)
//   }

//   const handleSigninClose = () => {
//     setShowSigninModal(false)
//     setUserExists(null) // Reset for next time
//     setSelectedAction(null)
//   }

//   const handleSignupSuccess = () => {
//     onSuccess()
//     setShowSignupModal(false)
//     setUserExists(null)
//     setSelectedAction(null)
//   }

//   const handleSigninSuccess = () => {
//     onSuccess()
//     setShowSigninModal(false)
//     setUserExists(null)
//     setSelectedAction(null)
//   }

//   // If wallet is not connected, show the choice modal with wallet connection
//   if (!address) {
//     if (!isOpen) return null

//     return (
//       <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//         <Card className="w-full max-w-md bg-gray-950 border-gray-800">
//           <div className="flex flex-row justify-end mt-2 mr-2">
//             <Button
//                 variant="ghost"
//                 size="icon"
//                 onClick={onClose}
//                 className="text-red-500 border border-red-500 rounded-full size-6"
//               >
//                 <X className="h-4 w-4" />
//             </Button>
//           </div>
//           <CardHeader className="flex items-center justify-center space-y-0 pb-0">
//           <CardTitle className="text-[#00daa2] text-center text-xl font-mono mb-1">
//             Welcome To
//           </CardTitle>
//           </CardHeader>
//           <div className="flex justify-center mb-2">
//             <Image
//               src="/Cars/DRVNWHITE.png"
//               alt="DRVN VHCLS"
//               width={120}
//               height={120}
//               className="mx-auto w-auto h-auto"
//             />
//           </div>
//           <CardContent className="space-y-6">
//             <div className="text-center">
//               <p className="text-gray-300 text-sm font-mono mb-6">
//                 Choose how you&apos;d like to get started
//               </p>
//             </div>

//             <div className="space-y-4">
//               <Button
//                 onClick={handleSignupClick}
//                 className="w-full bg-[#00daa2] text-black hover:bg-[#00daa2] font-medium font-mono h-12 text-lg"
//               >
//                 <UserPlus className="h-5 w-5 mr-2" />
//                 Create New Account
//               </Button>

//               <Button
//                 onClick={handleSigninClick}
//                 variant="outline"
//                 className="w-full border-[#00daa2] text-white hover:bg-[#00daa2] hover:text-black bg-transparent font-medium font-mono h-12 text-lg"
//               >
//                 <LogIn className="h-5 w-5 mr-2" />
//                 Sign In to Existing Account
//               </Button>
//             </div>

//             {/* Wallet Connection Section */}
//             {selectedAction && (
//               <div className="space-y-4 pt-4 border-t border-gray-700">
//                 <div className="text-center">
//                   <p className="text-gray-300 text-sm font-mono mb-3">
//                     {selectedAction === 'signup'
//                       ? 'Connect your wallet to create your account'
//                       : 'Connect your wallet to sign in'
//                     }
//                   </p>
//                 </div>

//                                  <ConnectButton />
//               </div>
//             )}

//             <div className="text-center">
//               <p className="text-gray-400 text-xs font-mono">
//                 <a className="text-[#00daa2]">Connect</a> your wallet to get started with DRVN VHCLS
//               </p>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     )
//   }

//   // If wallet is connected but we're still checking, show loading
//   if (isChecking) {
//     return (
//       <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//         <Card className="w-full max-w-md bg-gray-950 border-gray-800">
//           <CardContent className="space-y-6 text-center py-8">
//             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00daa2] mx-auto"></div>
//             <p className="text-gray-300 text-sm font-mono">
//               Checking your account...
//             </p>
//           </CardContent>
//         </Card>
//       </div>
//     )
//   }

//   // If wallet is connected and we know the user status, show appropriate modal
//   return (
//     <>
//       {/* Signup Modal */}
//       <SignupModal
//         isOpen={showSignupModal}
//         onClose={handleSignupClose}
//         onSwitchToSignin={() => {
//           setShowSignupModal(false)
//           setShowSigninModal(true)
//         }}
//         onSuccess={handleSignupSuccess}
//       />

//       {/* Signin Modal */}
//       <SigninModal
//         isOpen={showSigninModal}
//         onClose={handleSigninClose}
//         onSwitchToSignup={() => {
//           setShowSigninModal(false)
//           setShowSignupModal(true)
//         }}
//         onSuccess={handleSigninSuccess}
//       />
//     </>
//   )
// }

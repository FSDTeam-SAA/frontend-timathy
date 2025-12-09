// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { useState } from "react";
// import { Menu } from "lucide-react";
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import { Button } from "@/components/ui/button";
// import { useSession, signOut } from "next-auth/react";

// export default function Header() {
//   const [isOpen, setIsOpen] = useState(false);
//   const { status } = useSession();

//   const isAuthenticated = status === "authenticated";

//   const navLinks = [
//     { label: "Home", href: "/" },
//     { label: "Dashboard", href: "/campaigns" },
//     { label: "About Us", href: "#" },
//     { label: "Contact Us", href: "#" },
//   ];

//   const handleAuthClick = () => {
//     if (isAuthenticated) {
//       signOut({ callbackUrl: "/" });
//     }
//     setIsOpen(false);
//   };

//   return (
//     <header className="border-b border-[#FF6900] bg-[#1E1E1E] sticky top-0 z-50">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-20">

//           {/* Logo */}
//           <Link href="/" className="flex items-center">
//             <Image
//               src="/assets/logo.png"
//               alt="Logo"
//               width={1000}
//               height={1000} 
//               className="w-14 h-14 sm:w-16 sm:h-16"
//             />
//           </Link>

//           {/* Desktop Navigation + Login/Logout Button */}
//           <div className="hidden md:flex items-center gap-8">
//             <nav className="flex items-center gap-8">
//               {navLinks.map((link) => (
//                 <Link
//                   key={link.label}
//                   href={link.href}
//                   className="text-[#F5F5F5] text-lg font-medium hover:text-[#FF6900] transition"
//                 >
//                   {link.label}
//                 </Link>
//               ))}
//             </nav>

//             {/* Desktop Auth Button */}
//             <Button
//               asChild
//               className="bg-[#FF6900] hover:bg-orange-600 px-10 h-12 rounded-[8px] text-white font-semibold text-base transition"
//             >
//               {isAuthenticated ? (
//                 <button onClick={() => signOut({ callbackUrl: "/" })}>Logout</button>
//               ) : (
//                 <Link href="/login">Login</Link>
//               )}
//             </Button>
//           </div>

//           {/* Mobile Menu Trigger */}
//           <Sheet open={isOpen} onOpenChange={setIsOpen}>
//             <SheetTrigger asChild>
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className="md:hidden text-[#F5F5F5] hover:text-[#FF6900]"
//               >
//                 <Menu className="h-7 w-7" />
//               </Button>
//             </SheetTrigger>

//             <SheetContent side="right" className="w-80 bg-[#1E1E1E] border-l border-[#FF6900]">
//               <div className="flex flex-col gap-8 mt-10">

//                 {/* Mobile Navigation Links */}
//                 {navLinks.map((link) => (
//                   <Link
//                     key={link.label}
//                     href={link.href}
//                     onClick={() => setIsOpen(false)}
//                     className="text-[#F5F5F5] text-xl font-medium hover:text-[#FF6900] transition"
//                   >
//                     {link.label}
//                   </Link>
//                 ))}

//                 {/* Mobile Auth Button (Only one in mobile) */}
//                 <Button
//                   asChild
//                   className="w-full bg-[#FF6900] hover:bg-orange-600 h-14 rounded-[10px] text-white font-bold text-lg mt-6"
//                 >
//                   {isAuthenticated ? (
//                     <button onClick={handleAuthClick}>Logout</button>
//                   ) : (
//                     <Link href="/login" onClick={() => setIsOpen(false)}>
//                       Login
//                     </Link>
//                   )}
//                 </Button>
//               </div>
//             </SheetContent>
//           </Sheet>

//         </div>
//       </div>
//     </header>
//   );
// }


"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { status } = useSession();

  const isAuthenticated = status === "authenticated";

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Dashboard", href: "/campaigns" },
    { label: "About Us", href: "#" },
    { label: "Contact Us", href: "#" },
  ];

  const handleAuthClick = () => {
    if (isAuthenticated) {
      signOut({ callbackUrl: "/" });
    }
    setIsOpen(false);
  };

  return (
    <header className="border-b border-[#FF6900] bg-[#1E1E1E] sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex items-center h-20">

          {/* Logo (Left) */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <Image
              src="/assets/logo.png"
              alt="Logo"
              width={1000}
              height={1000}
              className="w-14 h-14 sm:w-16 sm:h-16"
            />
          </Link>

          {/* CENTER MENU (only on desktop) */}
          <nav className="hidden md:flex flex-1 justify-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[#F5F5F5] text-lg font-medium hover:text-[#FF6900] transition"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* RIGHT Logout/Login Button */}
          <div className="hidden md:flex flex-shrink-0 ml-auto">
            <Button
              asChild
              className="bg-[#FF6900] hover:bg-orange-600 px-10 h-12 rounded-[8px] text-white font-semibold text-base transition"
            >
              {isAuthenticated ? (
                <button onClick={() => signOut({ callbackUrl: "/" })}>Logout</button>
              ) : (
                <Link href="/login">Login</Link>
              )}
            </Button>
          </div>

          {/* Mobile Menu Trigger */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden ml-auto text-[#F5F5F5] hover:text-[#FF6900]"
              >
                <Menu className="h-7 w-7" />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-80 bg-[#1E1E1E] border-l border-[#FF6900]">
              <div className="flex flex-col gap-8 mt-10">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-[#F5F5F5] text-xl font-medium hover:text-[#FF6900] transition"
                  >
                    {link.label}
                  </Link>
                ))}

                <Button
                  asChild
                  className="w-full bg-[#FF6900] hover:bg-orange-600 h-14 rounded-[10px] text-white font-bold text-lg mt-6"
                >
                  {isAuthenticated ? (
                    <button onClick={handleAuthClick}>Logout</button>
                  ) : (
                    <Link href="/login" onClick={() => setIsOpen(false)}>
                      Login
                    </Link>
                  )}
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

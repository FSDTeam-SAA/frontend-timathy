// "use client"
// import Link from "next/link"
// import { Grid3x3, Zap } from "lucide-react"
// import AdvertiseCard from "./AdvertiseCard"
// import { usePathname } from "next/navigation";

// export default function Advertise() {
 
//         const pathname = usePathname();
//   return (
//     <div className="min-h-screen ">
    
      
//         {/* Header */}
//       <div className="lg:px-8 py-8 bg-[#4B4B4B3D]/25 ">
//         <div className="container mx-auto">
//           <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
//             Dashboard
//           </h1>
//           <p className="text-gray-400 text-sm">
//             Manage Your Advertising Management
//           </p>

//           {/* Tabs */}
//           <div className="mt-6 flex gap-2 sm:gap-4 py-4 sm:py-6 rounded-[8px]   w-full bg-[#4B4B4B] overflow-x-auto">
//             {[
//               { href: "/campaigns", label: "Campaigns", icon: Grid3x3 },
//               { href: "/advertise", label: "Advertise", icon: Zap },
//               { href: "/creative-hub", label: "Creative Hub", icon: Zap },
//             ].map((tab) => (
//               <Link key={tab.href} href={tab.href}>
//                 <button
//                   className={`flex items-center gap-2 px-3  py-2 text-xs  md:text-base font-medium transition border-b-2 whitespace-nowrap ${
//                     pathname === tab.href
//                       ? "border-[#FF6900] text-white"
//                       : "border-transparent text-gray-300 hover:border-slate-500"
//                   }`}
//                 >
//                   <tab.icon size={18} />
//                   {tab.label}
//                 </button>
//               </Link>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="px-4 sm:px-6 lg:px-8 pb-12 container">
//         <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
//           {/* Sidebar */}
//           <div className="lg:col-span-2">
//             <div className="bg-slate-700 rounded-lg p-6 space-y-6">
//               <div>
//                 <h3 className="text-white font-semibold mb-4">Advertising in a Quick Time</h3>
//                 <div className="space-y-3">
//                   <input
//                     type="email"
//                     placeholder="example@gmail.com"
//                     className="w-full bg-slate-600 text-white placeholder-gray-400 px-3 py-2 rounded text-sm"
//                   />
//                   <button className="w-full bg-slate-600 text-white px-3 py-2 rounded text-sm hover:bg-slate-500 transition flex items-center justify-center gap-2">
//                     Create an new ad
//                     <span>→</span>
//                   </button>
//                   <p className="text-xs text-gray-400">At last 1 landscape image or 1 Square image</p>
//                 </div>
//               </div>

//               <div>
//                 <h4 className="text-white font-semibold mb-3">Images</h4>
//                 <button className="w-full bg-slate-600 text-white px-3 py-2 rounded text-sm hover:bg-slate-500 transition flex items-center justify-center gap-2">
//                   <span>+</span>
//                 </button>
//               </div>

//               <div>
//                 <h4 className="text-white font-semibold mb-3">Creative</h4>
//                 <div className="flex gap-3">
//                   <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
//                     <input type="radio" name="creative" defaultChecked />
//                     Image
//                   </label>
//                   <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
//                     <input type="radio" name="creative" />
//                     Texts
//                   </label>
//                 </div>
//               </div>

//               <div>
//                 <h4 className="text-white font-semibold mb-3">Primary text</h4>
//                 <div className="bg-slate-600 rounded p-3 space-y-2">
//                   <p className="text-xs text-gray-300">
//                     Lorem ipsum is simply dummy text of the printing and typesetting industry...
//                   </p>
//                   <p className="text-xs text-gray-300">
//                     Lorem ipsum is simply dummy text of the printing and typesetting industry...
//                   </p>
//                   <p className="text-xs text-gray-300">
//                     Lorem ipsum is simply dummy text of the printing and typesetting industry...
//                   </p>
//                   <p className="text-xs text-gray-300">
//                     Lorem ipsum is simply dummy text of the printing and typesetting industry...
//                   </p>
//                 </div>
//               </div>

//               <button className="w-full bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-500 transition">
//                 Rewrite
//               </button>
//             </div>
//           </div>

//           {/* Cards Grid */}
//           <div className="lg:col-span-4">
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//               {[1, 2, 3, 4, 5, 6].map((i) => (
//                 <AdvertiseCard key={i} />
//               ))}
//             </div>

//             {/* Create Button */}
//             <button className="w-full mt-6 bg-[#FF6900] text-white h-[48px] rounded-[8px] font-semibold hover:bg-orange-600 transition">
//               Create
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }


"use client"

import Link from "next/link"
import { Grid3x3, Zap } from "lucide-react"

import { usePathname } from "next/navigation"
import AdvertiseCard from "./AdvertiseCard"
import CampaignForm from "./Froms"

export default function Advertise() {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-[#4B4B4B3D]/25">
      {/* Header */}
      <div className="lg:px-8 py-8 bg-[#4B4B4B3D]/25">
        <div className="container mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-gray-400 text-sm">Manage Your Advertising Management</p>

          {/* Tabs */}
          <div className="mt-6 flex gap-2 sm:gap-4 py-4 sm:py-6 rounded-[8px] w-full bg-[#4B4B4B] overflow-x-auto">
            {[
              { href: "/campaigns", label: "Campaigns", icon: Grid3x3 },
              { href: "/advertise", label: "Advertise", icon: Zap },
              { href: "/creative-hub", label: "Creative Hub", icon: Zap },
            ].map((tab) => (
              <Link key={tab.href} href={tab.href}>
                <button
                  className={`flex items-center gap-2 px-3 py-2 text-xs md:text-base font-medium transition border-b-2 whitespace-nowrap ${
                    pathname === tab.href
                      ? "border-[#FF6900] text-white"
                      : "border-transparent text-gray-300 hover:border-slate-500"
                  }`}
                >
                  <tab.icon size={18} />
                  {tab.label}
                </button>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 lg:px-8 pb-12 mt-14 container">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
          {/* Sidebar with Form */}
          <div className="lg:col-span-2">
            <div className=" rounded-lg p-6 h-screen overflow-y-auto  hide-scrollbar">
              <CampaignForm />
            </div>
          </div>

          {/* Cards Grid */}
          <div className="lg:col-span-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <AdvertiseCard key={i} />
              ))}
            </div>

            {/* Create Button */}
            <button className="w-full mt-6 bg-[#FF6900] text-white h-[48px] rounded-[8px] font-semibold hover:bg-orange-600 transition">
              Create Campaign
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}


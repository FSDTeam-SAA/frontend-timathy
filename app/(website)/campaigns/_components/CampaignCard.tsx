"use client"
import Image from "next/image"

export default function CampaignCard() {
  return (
    <div className=" overflow-hidden hover:shadow-lg transition bg-[#4B4B4B] rounded-[8px]">
      {/* Image */}
      <div className="w-full h-[264px]">
        <Image src="/assets/campain.png" alt="Campaign" width={1000} height={1000} className="w-full h-full object-cover rounded-[8px]" />
      </div>

      {/* Content */}
      <div className="p-4  space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-[24px] text-[#F5F5F5] font-midium">Summer Sale 2023</h3>
            <p className="text-[#AAAAAA] font-normal text-base">Facebook Instagram</p>
          </div>
          <span className="bg-[#ECF1FF] text-[#3F74FF] text-base px-4 py-1 rounded-full">Active</span>
        </div>

        {/* Stats */}
        <div className="flex justify-between gap-2 ">
          <div>
            <p className="text-base text-[#AAAAAA] font-normal">Budget</p>
            <p className="text-2xl text-[#F5F5F5] font-midium">$1,200</p>
          </div>
          <div >
            <p className="text-base text-[#AAAAAA] font-normal">Spent</p>
            <p className="text-2xl text-[#F5F5F5] font-midium">$345</p>
          </div>
        
        </div>

        <div className="flex justify-between gap-2 text-xs">
          <div>
            <p className="text-base text-[#AAAAAA] font-normal">Lead</p>
            <p className="text-2xl text-[#F5F5F5] font-midium">28</p>
          </div>
          <div>
            <p className="text-base text-[#AAAAAA] font-normal">Cost per Laad</p>
            <p className="text-2xl text-[#F5F5F5] font-midium">$12.32</p>
          </div>
        
        </div>

        {/* Edit Button */}
        {/* <div className="pt-[32px]">
        <Button className="w-full bg-[#FF6900] text-white h-[48px] rounded-[8px] font-semibold hover:bg-orange-600 transition text-sm font-bold">
          Edit
        </Button>
        </div> */}
      </div>
    </div>
  )
}

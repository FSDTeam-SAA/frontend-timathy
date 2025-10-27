"use client"
import Image from "next/image"
 interface FacebookPageData {
  adAccountId?: string | null
  instagramBusinessId?: string | null
  pageAccessToken?: string
  pageId?: string
  pageName?: string
  tasks?: string[]
  page: {
    
    pageId?: string
    pageName?: string
 
  }
}
export default function AdvertiseCard({ page}: FacebookPageData) {
  console.log(page,"22222222221")
  return (
    <div className="bg-[#4B4B4B] rounded-lg overflow-hidden hover:shadow-lg transition">
      {/* Header with Logo */}
      {/* <div className=" p-[18px] flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div className="w-[48px] h-[48px]  rounded flex items-center justify-center flex-shrink-0">
            <Image src="/assets/logo.png" alt="Logo" width={1000} height={1000} className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-[#F5F5F5] text-base font-semibold">Lorem ipsum is simply</p>
            <p className="text-[#AAAAAA] text-base">Lorem ipsum</p>
          </div>
        </div>
        <span className="text-[#000000] text-2xl cursor-pointer hover:text-white transition">...</span>
      </div> */}

      {/* Rocket Icon Section */}
      <div className=" flex items-center justify-center h-[320px]">
        <Image src="/assets/roket.jpg" alt="Rocket" width={1000} height={1000} className="w-full h-full object-cover rounded-[8px] " />
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div className="flex justify-between">
          <div>  
        <p>Page Name :</p>
        <p className="text-[#F5F5F5] text-base font-medium">{page.pageName}</p>
          </div>
        {/* <Button className="w-[107px] bg-[#AAAAAA] text-white  h-[33px] rounded-full text-xs hover:bg-[#AAAAAA]/80 transition font-medium">
          Learn More
        </Button> */}
        <div>
          <p>Page Id :</p>
          <p>{page.pageId}</p>
        </div>
        </div>

        {/* Engagement Metrics */}
        {/* <div className="flex items-center justify-between text-base text-[#AAAAAA] pt-2 border-t-[2px] border-[#AAAAAA]">
          <button className="flex items-center gap-1 hover:text-white transition">
            <Heart size={16} className="text-[#AAAAAA]" />
            <span>Like</span>
          </button>
          <button className="flex items-center gap-1 hover:text-white transition">
            <MessageCircle size={14} />
            <span>Comments</span>
          </button>
          <button className="flex items-center gap-1 hover:text-white transition">
            <Share2 size={14} />
            <span>Share</span>
          </button>
        </div> */}
      </div>
    </div>
  )
}

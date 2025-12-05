import React, { Suspense } from 'react'
import AllCampaigns from './Allcampaignpage'

const page = () => {
  return (
    <div>
        <Suspense fallback={<div>Loading campaigns...</div>}>
      <AllCampaigns/>
        </Suspense>
    </div>
  )
}

export default page

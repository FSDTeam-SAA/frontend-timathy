import React, { Suspense } from 'react'
import MetaAdsPage from './_components/MainPage'

const page = () => {
  return (
    <div>
        <Suspense fallback={<div>Loading...</div>}>
      <MetaAdsPage/>
        </Suspense>
    </div>
  )
}

export default page

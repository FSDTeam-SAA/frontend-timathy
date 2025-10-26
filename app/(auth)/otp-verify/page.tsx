import React, { Suspense } from 'react'
import OtpVerifyPage from './_components/OtpVarifyForm'

function page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
        <OtpVerifyPage />
    </Suspense>
  )
}

export default page
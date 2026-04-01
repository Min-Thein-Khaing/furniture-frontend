import ConfirmPasswordComponent from '@/components/Auth/components/ConfirmPasswordComponent'
import React from 'react'

const ConfirmPassword = () => {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="w-full max-w-sm">
        <ConfirmPasswordComponent  />
      </div>
    </div>
  )
}

export default ConfirmPassword
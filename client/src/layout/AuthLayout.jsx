import React from 'react'

function AuthLayout({authInfo}) {
  return (
    <div className="hidden md:flex md:w-1/2 relative">
        <img
          src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f"
          alt="Library"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white px-10 text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to BookWare</h1>
          <p className="text-lg">
            {authInfo} account and start managing your library efficiently.
          </p>
        </div>
      </div>
  )
}

export default AuthLayout
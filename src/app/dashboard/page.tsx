'use client'

import { useSession, signOut } from 'next-auth/react'

const DashboardPage = () => {
  const {data: session, status}  = useSession()
  return (
    <div>
      <h1>Profile</h1>
      <pre>
        {
          JSON.stringify({
            session,
            status
          },
            null,
            2
          )
        }
      </pre>
      <button
        onClick={() => signOut()}
      >
        Logout
      </button>
    </div>
  )
}

export default DashboardPage
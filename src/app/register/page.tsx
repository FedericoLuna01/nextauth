'use client'

import axios, {AxiosError} from 'axios'
import { FormEvent, useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const RegisterPage = () => {

  const [error, setError] = useState()
  const router = useRouter()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    const formData = new FormData(e.currentTarget)

    try {
      const res = await axios.post('/api/auth/signup', {
        email: formData.get('email'), 
        password: formData.get('password'), 
        fullname: formData.get('fullname')
      })

      const nextAuthRes = await signIn('credentials', {
        email: res.data.email,
        password: formData.get('password'),
      })

      if (nextAuthRes?.ok) return router.push('/dashboard')

    } catch (error) {
      console.log(error)
      if (error instanceof AxiosError) {
        setError(error.response?.data.message)
      }
    }
  }

  return (
    <div
      className='justify-center h-[calc(100vh-4rem)] flex items-center'
    >
      <form
        onSubmit={handleSubmit}
        className='bg-neutral-950 px-8 py-10 w3/13'
      >
        {
          error && (
            <div className="bg-red-500 text-white px-4 py-2 mb-2">
              {error}
            </div>
          )
        }
        <h1 className='text-4xl font-bold mb-7'>Sign Up</h1>
        <input 
          type="text" 
          placeholder="John Doe" 
          name='fullname' 
          className="bg-zinc-800 px-4 py-2 block mb-2"
        />
        <input 
          type="email" 
          placeholder="mail@mail.com" 
          name='email' 
          className="bg-zinc-800 px-4 py-2 block mb-2"
        />
        <input 
          type="password" 
          placeholder="*********" 
          name='password' 
          className="bg-zinc-800 px-4 py-2 block mb-2"
        />
        <button
          className="bg-indigo-500 px-4 py-2" 
        >
          Register
        </button>
      </form>
    </div>
  )
}

export default RegisterPage
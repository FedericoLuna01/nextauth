import { NextResponse } from 'next/server'
import User from '@/models/user'
import { connectDB } from "@/libs/mongodb";
import bcrypt from 'bcryptjs'

export async function POST(req: Request) {
  const { email, password, fullname } = await req.json()
  console.log(email, password, fullname)

  if (!password || password.length < 6) return NextResponse.json({
    message: 'password must be at least 6 characters'
  }, { 
    status: 400 
  })

  try {
    await connectDB()
    const userFound = await User.findOne({email})

    if( userFound ) return NextResponse.json({
      message: 'email already exists'
    }, {
      status: 409
    })

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = new User({
      email, 
      fullname,
      password: hashedPassword
    })

    const savedUser = await user.save()
    console.log(savedUser)

    return NextResponse.json({savedUser})
  } catch (error) {
    console.log(error)
    return NextResponse.error()
  }
}
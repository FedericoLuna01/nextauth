import { getServerSession } from "next-auth"
import Link from "next/link"

const Navbar = async () => {
  const session = await getServerSession()
   return (
    <nav
      className="bg-zinc-900 p-4"
    >
      <div className="container mx-auto flex justify-between">
        <Link href="/">
          <h1 className="font-bold text-xl">NextAuth</h1>
        </Link>
        <ul
          className="flex gap-x-2"
        >
          {
            session ? (
              <li
                className="px-3 py-1"
              >
                <Link
                  href='/dashboard'
                >
                  Perfil
                </Link>
              </li>
            ) :
            null
          }
          <li
            className="px-3 py-1"
          >
            <Link
              href='/login'
            >
              Ingresar
            </Link>
          </li>
          <li
            className="px-3 py-1"
          >
            <Link
              href='/register'
            >
              Registro
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
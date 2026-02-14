import Link from "next/link"
import Image from "next/image"
import { Button } from "./ui/button"

const NavBar = () => {
  return (
    <header>
        <nav>
            <Link href="/" className="logo"> 
                <Image src="/icons/logo.png" alt="Dlogo" width={40} height={40} />
                <p>Dev Events</p>
            </Link>
            <ul className="nav-links">
                <Button variant="ghost"><Link href="/">Home</Link></Button>
                <Button variant="ghost"><Link href=".events">Events</Link></Button>
                <Button variant="ghost"><Link href="#explore-btn">Explore</Link></Button>
                <Button variant="ghost"><Link href='/admin/create-event'>Create Event</Link></Button>
            </ul>
        </nav>
    </header>
  )
}

export default NavBar
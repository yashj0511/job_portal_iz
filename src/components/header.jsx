import React from 'react'
import {Link} from "react-router-dom"
import {Button} from "./ui/button"
const Header = () => {
  return (
    <>
      <nav className="py-4 flex justify-between items-center">
        <Link>
            <img src="public\intelizign_logo-removebg-preview.png" className="h-30 w-40"/>
        </Link>

        <Button variant="outline">Login</Button>
      </nav>
    </>
  )
}

export default Header;

import React,{useState} from 'react'
import './Navbar.css'

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false)


    
    return(
        <div className={`navbar ${menuOpen ? "open" : ""}`}>
        <div className="navbar-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
        </div>
        <ul className="navbar-menu">
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="/upvoted">Upvoted</a></li>
          <li><a href="/bookmarked">Bookmarked</a></li>
        </ul>
      </div>
    )}

export default Navbar
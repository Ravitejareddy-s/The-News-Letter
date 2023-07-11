import React,{useState} from 'react'
import './Navbar.css'
// import logo from './100X_icon_orange_orange tm.jpg'

const Navbar = ({title}) => {
    const [menuOpen, setMenuOpen] = useState(false)


    
    return(
        <div className={`navbar ${menuOpen ? "open" : ""}`}>
          <h1 className='heighlight'>{title}</h1>
        <div className="navbar-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
        </div>
        <ul className="navbar-menu">
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="/content">Content</a></li>
          <li><a href="/upvoted">Upvoted</a></li>
          <li><a href="/bookmarked">Bookmarked</a></li>
        </ul>
      </div>
    )}

export default Navbar
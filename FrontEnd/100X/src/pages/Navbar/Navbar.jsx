import React,{useState} from 'react'
import './Navbar.css'
import { TiArrowForward } from 'react-icons/ti';
// import logo from './100X_icon_orange_orange tm.jpg'

const Navbar = ({title}) => {
    const [menuOpen, setMenuOpen] = useState(false)
function cleartoken(){
  localStorage.removeItem("token");
}

    
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
          <li><a href="/content">Articles</a></li>
          <li><a href="/upvoted">Upvoted Content</a></li>
          <li><a href="/bookmarked">Saved</a></li>
          <li><a onClick={cleartoken} href="/">Logout <TiArrowForward /></a></li>
        </ul>
      </div>
    )}

export default Navbar
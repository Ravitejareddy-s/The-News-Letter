import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import './content.css'
import noimg from './noimg.jpg'


function timeSince(dateString) {
  var currentDate = new Date();
  var inputDate = new Date(dateString);

  var currentTime = currentDate.getTime();
  var inputTime = inputDate.getTime();

  var seconds = Math.floor((currentTime - inputTime) / 1000);
  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years";
  }

  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months";
  }

  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days";
  }

  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours";
  }

  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes";
  }

  return Math.floor(seconds) + " seconds";
}

const Content = () => {

    const [data,n_data]=useState([{"Blog Title":"test"}])
    const [cat,n_cat]=useState('AI')
    const [menuOpen, setMenuOpen] = useState(false)

    
    

  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    // Get the current date
    const currentDate = new Date().toISOString().split('T')[0];
    setSelectedDate(currentDate);
    console.log(currentDate);
  }, []);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
    console.log(event.target.value);
  };




    async function get_prob(){


        const response = await fetch('http://localhost:3000/D_news/',{method:'POST',  headers:{
            'Content-Type': 'application/json'
          },body:JSON.stringify({
            "date": "2023-06-24",
            "Category":cat
          })});
        const data2 = await response.json();
        n_data(data2)
        console.log('flag')

      }

    useEffect(() => {

    get_prob();
    }, [cat]);

      
    return(
      <div>

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





        <div className="categories">
          <ul className="blog-filters">                        
                                          
              <li className={`blog-filters__item ${cat==='AI'? 'selected':''}`} >
                  <a className="test" onClick={()=>n_cat('AI')}>AI</a>
              </li>

              <li className={`blog-filters__item ${cat==='Business models'? 'selected':''}`}  >
                  <a onClick={()=>n_cat('Business models')}>Business models</a>
              </li>

              <li className={`blog-filters__item ${cat==='Digital marketing'? 'selected':''}`} >
                  <a onClick={()=>n_cat('Digital marketing')}>Digital marketing</a>
              </li>

              <li className={`blog-filters__item ${cat==='Marketing strategies'? 'selected':''}`} >
                  <a onClick={()=>n_cat('Marketing strategies')}>Marketing strategies</a>
              </li>

          </ul>
        </div>

        <form>
      <input
        type="date"
        id="datePicker"
        value={selectedDate}
        onChange={handleDateChange}
      />
    </form>


        <ul className='container'>
          {data.map((x)=><Render {...x}/>)}
        </ul>


      </div>
    )
}


function Render(x){
  const icons_size=20
  const [isClicked, setIsClicked] = useState([0,0,0,0]);

    
  const upvote = () => {
    setIsClicked(prevState => [1 - prevState[0], 0, 0, 0]);
    fetch('http://localhost:3000/user-action/',{method:'POST',  headers:{
            'Content-Type': 'application/json'
          },body:JSON.stringify({
            "link": x.link,
            "date":x.scraped_time,
            "upvote":1-isClicked[0]
          })});
  };
  const downvote = () => {
    setIsClicked(prevState => [0, 1 - prevState[1], 0, 0]);
    fetch('http://localhost:3000/user-action/',{method:'POST',  headers:{
      'Content-Type': 'application/json'
    },body:JSON.stringify({
      "link": x.link,
      "date":x.scraped_time,
      "downvote":1-isClicked[1]
    })});
  };
  const fav = () => {
    setIsClicked(prevState => [0, 0, 1 - prevState[2], 0]);
    fetch('http://localhost:3000/user-action/',{method:'POST',  headers:{
      'Content-Type': 'application/json'
    },body:JSON.stringify({
      "link": x.link,
      "date":x.scraped_time,
      "fav":1-isClicked[2]
    })});
  };
  const bookmark = () => {
    setIsClicked(prevState => [prevState[0], prevState[1], prevState[2], 1 - prevState[3]]);
    fetch('http://localhost:3000/user-action/',{method:'POST',  headers:{
      'Content-Type': 'application/json'
    },body:JSON.stringify({
      "link": x.link,
      "date":x.scraped_time,
      "bookmark":1-isClicked[3]
    })});
  };

  return <li className='boxes'>
    <div className="header">
      <div>

      <img src={x.logo_image}/>
      <a>{x.scraped_from} </a>
      </div>

      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g id="feEdit0" fill="none" fill-rule="evenodd" stroke="none" stroke-width="1"><g id="feEdit1" fill="currentColor"><path id="feEdit2" d="M5 20h14a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Zm-1-5L14 5l3 3L7 18H4v-3ZM15 4l2-2l3 3l-2.001 2.001L15 4Z"/></g></g></svg>
    
    </div>
    

    <img className="main_img" src={x.img} onError={(e)=>e.target.src=noimg} alt="image"/>

    <div className="details">
      <a>{x.site_name} </a>
      <a>{timeSince(x.date)+' ago'} </a>
      

      
    </div>

    <div className="title">
      
      <a href={x.link} target="_blank">{x.title}</a>
      <div title={x.desc}>{x.desc}</div>

    </div>
    <div className="icons_container">

      <div onClick={upvote}>
        {isClicked[0]?(<svg xmlns="http://www.w3.org/2000/svg" width={icons_size} height={icons_size} viewBox="0 0 24 24"><rect x="0" y="0" width={icons_size} height={icons_size} fill="none" stroke="none" /><path fill="currentColor" d="M4 14h4v7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7h4a1.001 1.001 0 0 0 .781-1.625l-8-10c-.381-.475-1.181-.475-1.562 0l-8 10A1.001 1.001 0 0 0 4 14z"/></svg>):(<svg xmlns="http://www.w3.org/2000/svg" width={icons_size} height={icons_size} viewBox="0 0 24 24"><rect x="0" y="0" width={icons_size} height={icons_size} fill="none" stroke="none" /><path fill="currentColor" d="M12.781 2.375c-.381-.475-1.181-.475-1.562 0l-8 10A1.001 1.001 0 0 0 4 14h4v7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7h4a1.001 1.001 0 0 0 .781-1.625l-8-10zM15 12h-1v8h-4v-8H6.081L12 4.601L17.919 12H15z"/></svg>)}
      </div>

      <div onClick={downvote}>
        {isClicked[1]?(<svg xmlns="http://www.w3.org/2000/svg" width={icons_size} height={icons_size} viewBox="0 0 24 24"><rect x="0" y="0" width={icons_size} height={icons_size} fill="none" stroke="none" /><path fill="currentColor" d="M20.901 10.566A1.001 1.001 0 0 0 20 10h-4V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v7H4a1.001 1.001 0 0 0-.781 1.625l8 10a1 1 0 0 0 1.562 0l8-10c.24-.301.286-.712.12-1.059z"/></svg>):(<svg xmlns="http://www.w3.org/2000/svg" width={icons_size} height={icons_size} viewBox="0 0 24 24"><rect x="0" y="0" width={icons_size} height={icons_size} fill="none" stroke="none" /><path fill="currentColor" d="M20.901 10.566A1.001 1.001 0 0 0 20 10h-4V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v7H4a1.001 1.001 0 0 0-.781 1.625l8 10a1 1 0 0 0 1.562 0l8-10c.24-.301.286-.712.12-1.059zM12 19.399L6.081 12H10V4h4v8h3.919L12 19.399z"/></svg>)}
      </div>

      <div onClick={fav}>
        {isClicked[2]?(<svg xmlns="http://www.w3.org/2000/svg" width={icons_size} height={icons_size} viewBox="0 0 2048 2048"><rect x="0" y="0" width={icons_size} height={icons_size} fill="none" stroke="none" /><path fill="currentColor" d="m1416 1254l248 794l-640-492l-640 492l248-794L0 768h784L1024 0l240 768h784l-632 486z"/></svg>):(<svg xmlns="http://www.w3.org/2000/svg" width={icons_size} height={icons_size} viewBox="0 0 2048 2048"><rect x="0" y="0" width={icons_size} height={icons_size} fill="none" stroke="none" /><path fill="currentColor" d="m1416 1254l248 794l-640-492l-640 492l248-794L0 768h784L1024 0l240 768h784l-632 486zm5 446q-38-124-76-246t-78-247q103-77 203-155t202-156h-502l-146-467l-146 467H376q102 78 202 156t203 155q-40 124-78 246t-76 247l397-306l397 306z"/></svg>)}
      </div>


      <div onClick={bookmark}>
        {isClicked[3]?(<svg xmlns="http://www.w3.org/2000/svg" width={icons_size} height={icons_size} viewBox="0 0 24 24"><rect x="0" y="0" width={icons_size} height={icons_size} fill="none" stroke="none" /><path fill="currentColor" d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3l7 3V5c0-1.1-.9-2-2-2z"/></svg>):(<svg xmlns="http://www.w3.org/2000/svg" width={icons_size} height={icons_size} viewBox="0 0 24 24"><rect x="0" y="0" width={icons_size} height={icons_size} fill="none" stroke="none" /><path fill="currentColor" d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3l7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V5h10v13z"/></svg>)}
      </div>

    </div>

  </li>

  
}


export default Content


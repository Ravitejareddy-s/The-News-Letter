import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './Upvoted.css'
import Navbar from "../Navbar/Navbar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import noimg from './noimg.jpg'

let mail_data=[]

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

const Upvoted = () => {

  const [data, n_data] = useState([{ "Blog Title": "test" }])





  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    // Get the current date
    const currentDate = new Date().toISOString().split('T')[0];
    setSelectedDate(currentDate);
    // console.log(selectedDate);
  }, []);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };



  async function get_prob() {

    if ("date", selectedDate) {

      const response = await fetch('http://localhost:3000/news/', {
        method: 'POST', headers: {
          'Content-Type': 'application/json'
        }, body: JSON.stringify({
          "date": selectedDate,
          "feedback": 'l'
        })
      });
      const data2 = await response.json();

      const response3 = await fetch('http://localhost:3000/news/', {
        method: 'POST', headers: {
          'Content-Type': 'application/json'
        }, body: JSON.stringify({
          "date": selectedDate,
          "feedback": 'f'
        })
      });
      const data3 = await response3.json();


      n_data([...data2, ...data3])
    }
  }

  useEffect(() => {

    get_prob();
  }, [selectedDate]);

  function send_mail(){
    if(mail_data.length){
      fetch('http://localhost:3000/mail/', {
        method: 'POST', headers: {
          'Content-Type': 'application/json'
        }, body: JSON.stringify(mail_data)
      });

      toast('sending emails⏳', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });

    }else{
      toast.error('Select a blog to Mail', {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "dark",
        });

    }
    
    <a>this is a test</a>
  }


  return (
    <div>
      <Navbar title="Upvoted Posts"/>
      <div className="filters">
        <input
          type="date"
          id="datePicker"
          value={selectedDate}
          onChange={handleDateChange}
        />
        <svg onClick={send_mail} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path fill="white" fill-rule="evenodd" d="m7.172 11.334l2.83 1.935l2.728-1.882l6.115 6.033c-.161.052-.333.08-.512.08H1.667c-.22 0-.43-.043-.623-.12l6.128-6.046ZM20 6.376v9.457c0 .247-.054.481-.15.692l-5.994-5.914L20 6.376ZM0 6.429l6.042 4.132l-5.936 5.858A1.663 1.663 0 0 1 0 15.833V6.43ZM18.333 2.5c.92 0 1.667.746 1.667 1.667v.586L9.998 11.648L0 4.81v-.643C0 3.247.746 2.5 1.667 2.5h16.666Z"/></svg>


      </div>
      <ToastContainer />

      <ul className='upvote_container'>
        {data.map((x) => <Render key={x.link} {...x} />)}
      </ul>


    </div>
  )
}


function Render(x) {
  const icons_size = 20
  const [isclicked, setclicked] = useState(0);



  useEffect(()=> {
    if(isclicked){
      mail_data.push({'title':x.gpt_title,'content':x.gpt_summary,'link':x.link,'img':x.img});
    }else{
      mail_data = mail_data.filter(obj => obj.title !== x.gpt_title);
    }




  },[isclicked])

  const [isClicked, setIsClicked] = useState([0,0,0,0]);
  useEffect(()=> {


    let temp=0
    if(x.bookmark===1){
      temp=1
    }

    if (x.feedback === 'l') {
      setIsClicked([1, 0, 0,temp]);
    } else if (x.feedback === 'd') {

      setIsClicked([0, 1, 0,temp]);
    } else if (x.feedback === "f") {

      setIsClicked([0, 0, 1,temp]);
    } else {
      setIsClicked([0, 0,0,temp]);
    }


  },[])


  // let temp=[0,0,1]
  // console.log('x.feedback:'+x.feedback)
  // console.log('isClicked'+isClicked)
  const upvote = () => {
    setIsClicked(prevState => [1 - prevState[0], 0, 0, 0]);
    fetch('http://localhost:3000/user-action/', {
      method: 'POST', headers: {
        'Content-Type': 'application/json'
      }, body: JSON.stringify({
        "link": x.link,
        "uid": x.uid,
        "date": x.scraped_time,
        "upvote": 1 - isClicked[0]
      })
    });
  };
  const downvote = () => {
    setIsClicked(prevState => [0, 1 - prevState[1], 0, 0]);
    fetch('http://localhost:3000/user-action/', {
      method: 'POST', headers: {
        'Content-Type': 'application/json'
      }, body: JSON.stringify({
        "link": x.link,
        "uid": x.uid,
        "date": x.scraped_time,
        "downvote": 1 - isClicked[1]
      })
    });
  };
  const fav = () => {
    setIsClicked(prevState => [0, 0, 1 - prevState[2], 0]);
    fetch('http://localhost:3000/user-action/', {
      method: 'POST', headers: {
        'Content-Type': 'application/json'
      }, body: JSON.stringify({
        "uid": x.uid,
        "link": x.link,
        "date": x.scraped_time,
        "fav": 1 - isClicked[2]
      })
    });
  };
  const bookmark = () => {
    setIsClicked(prevState => [prevState[0], prevState[1], prevState[2], 1 - prevState[3]]);
    fetch('http://localhost:3000/user-action/', {
      method: 'POST', headers: {
        'Content-Type': 'application/json'
      }, body: JSON.stringify({
        "link": x.link,
        "uid": x.uid,
        "date": x.scraped_time,
        "bookmark": 1 - isClicked[3]
      })
    });
  };

  return <li className='upvote_boxes'>
    <div className="header">
      <div>
        <input type="checkbox" onChange={()=>setclicked(!isclicked)} id="myCheckbox" name="myCheckbox"/>

        <img src={x.logo_image} />
        <a>{x.scraped_from} </a>
      </div>
      <button>publish</button>

      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g id="feEdit0" fill="none" fill-rule="evenodd" stroke="none" stroke-width="1"><g id="feEdit1" fill="currentColor"><path id="feEdit2" d="M5 20h14a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Zm-1-5L14 5l3 3L7 18H4v-3ZM15 4l2-2l3 3l-2.001 2.001L15 4Z" /></g></g></svg>

    </div>


    <img className="main_img" src={x.img}  alt="image" />

    <div className="details">
      <a>{x.site_name} </a>
      <a>{timeSince(x.date) + ' ago'} </a>



    </div>


    <div className="upvote_title">

      <a href={x.link} target="_blank">{x.gpt_title}</a>
      <div title={x.desc}>{x.gpt_summary}</div>

    </div>

    <div className="actual_title">

      <a href={x.link} target="_blank">{x.title}</a>
      <div title={x.desc}>{x.desc}</div>

    </div>

    <div className="icons_container">

      <div onClick={upvote}>
        {isClicked[0] ? (<svg xmlns="http://www.w3.org/2000/svg" width={icons_size} height={icons_size} viewBox="0 0 24 24"><rect x="0" y="0" width={icons_size} height={icons_size} fill="none" stroke="none" /><path fill="currentColor" d="M4 14h4v7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7h4a1.001 1.001 0 0 0 .781-1.625l-8-10c-.381-.475-1.181-.475-1.562 0l-8 10A1.001 1.001 0 0 0 4 14z" /></svg>) : (<svg xmlns="http://www.w3.org/2000/svg" width={icons_size} height={icons_size} viewBox="0 0 24 24"><rect x="0" y="0" width={icons_size} height={icons_size} fill="none" stroke="none" /><path fill="currentColor" d="M12.781 2.375c-.381-.475-1.181-.475-1.562 0l-8 10A1.001 1.001 0 0 0 4 14h4v7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7h4a1.001 1.001 0 0 0 .781-1.625l-8-10zM15 12h-1v8h-4v-8H6.081L12 4.601L17.919 12H15z" /></svg>)}
      </div>

      <div onClick={downvote}>
        {isClicked[1] ? (<svg xmlns="http://www.w3.org/2000/svg" width={icons_size} height={icons_size} viewBox="0 0 24 24"><rect x="0" y="0" width={icons_size} height={icons_size} fill="none" stroke="none" /><path fill="currentColor" d="M20.901 10.566A1.001 1.001 0 0 0 20 10h-4V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v7H4a1.001 1.001 0 0 0-.781 1.625l8 10a1 1 0 0 0 1.562 0l8-10c.24-.301.286-.712.12-1.059z" /></svg>) : (<svg xmlns="http://www.w3.org/2000/svg" width={icons_size} height={icons_size} viewBox="0 0 24 24"><rect x="0" y="0" width={icons_size} height={icons_size} fill="none" stroke="none" /><path fill="currentColor" d="M20.901 10.566A1.001 1.001 0 0 0 20 10h-4V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v7H4a1.001 1.001 0 0 0-.781 1.625l8 10a1 1 0 0 0 1.562 0l8-10c.24-.301.286-.712.12-1.059zM12 19.399L6.081 12H10V4h4v8h3.919L12 19.399z" /></svg>)}
      </div>

      <div onClick={fav}>
        {isClicked[2] ? (<svg xmlns="http://www.w3.org/2000/svg" width={icons_size} height={icons_size} viewBox="0 0 2048 2048"><rect x="0" y="0" width={icons_size} height={icons_size} fill="none" stroke="none" /><path fill="currentColor" d="m1416 1254l248 794l-640-492l-640 492l248-794L0 768h784L1024 0l240 768h784l-632 486z" /></svg>) : (<svg xmlns="http://www.w3.org/2000/svg" width={icons_size} height={icons_size} viewBox="0 0 2048 2048"><rect x="0" y="0" width={icons_size} height={icons_size} fill="none" stroke="none" /><path fill="currentColor" d="m1416 1254l248 794l-640-492l-640 492l248-794L0 768h784L1024 0l240 768h784l-632 486zm5 446q-38-124-76-246t-78-247q103-77 203-155t202-156h-502l-146-467l-146 467H376q102 78 202 156t203 155q-40 124-78 246t-76 247l397-306l397 306z" /></svg>)}
      </div>


      <div onClick={bookmark}>
        {isClicked[3] ? (<svg xmlns="http://www.w3.org/2000/svg" width={icons_size} height={icons_size} viewBox="0 0 24 24"><rect x="0" y="0" width={icons_size} height={icons_size} fill="none" stroke="none" /><path fill="currentColor" d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3l7 3V5c0-1.1-.9-2-2-2z" /></svg>) : (<svg xmlns="http://www.w3.org/2000/svg" width={icons_size} height={icons_size} viewBox="0 0 24 24"><rect x="0" y="0" width={icons_size} height={icons_size} fill="none" stroke="none" /><path fill="currentColor" d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3l7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V5h10v13z" /></svg>)}
      </div>

    </div>

  </li>


}


export default Upvoted



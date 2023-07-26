import React, { useState } from "react";
import './Upvoted.css'
import {mail_data} from "./Upvoted";
import CopySectionButton from './CopySectionButton';




export default function Export_content() {
  const [modal, setModal] = useState(false);
  const [active, setactive] = useState(false);




console.log(mail_data)
const dummy=
[
{'title': 'AI Brings Film Stars Back from the Dead: James Dean to Star in New Movie', 'content': 'James Dean, the iconic American film actor who die…ng the need for clearer legislation in this area.', 'link': 'https://www.bbc.co.uk/future/article/20230718-how-ai-is-bringing-film-stars-back-from-the-dead', 'img': 'https://www.bing.com/th?id=OVFT.yvNDrTTRYGVcD6aRtVXHJy&pid=News&w=2340&h=1320&c=14&rs=2&qlt=90'}
,
{'title': 'The Demise of the Sales Funnel: Embracing the AI-Driven Bow Tie Model for Customer Engagement', 'content': 'The traditional sales funnel is losing its effecti…w tie model and revolutionize marketing strategy.', 'link': 'https://www.forbes.com/sites/benjaminlaker/2023/07…ining-marketing-strategy-for-the-data-driven-age/', 'img': 'https://www.bing.com/th?id=OVFT.wu5wy7oxdSrbr6LeKUHjkC&pid=News&w=2340&h=1320&c=14&rs=2&qlt=90'}
,{'title': 'The Demise of the Sales Funnel: Embracing the AI-Driven Bow Tie Model for Customer Engagement', 'content': 'The traditional sales funnel is losing its effecti…w tie model and revolutionize marketing strategy.', 'link': 'https://www.forbes.com/sites/benjaminlaker/2023/07…ining-marketing-strategy-for-the-data-driven-age/', 'img': 'https://www.bing.com/th?id=OVFT.wu5wy7oxdSrbr6LeKUHjkC&pid=News&w=2340&h=1320&c=14&rs=2&qlt=90'}
,{'title': 'The Demise of the Sales Funnel: Embracing the AI-Driven Bow Tie Model for Customer Engagement', 'content': 'The traditional sales funnel is losing its effecti…w tie model and revolutionize marketing strategy.', 'link': 'https://www.forbes.com/sites/benjaminlaker/2023/07…ining-marketing-strategy-for-the-data-driven-age/', 'img': 'https://www.bing.com/th?id=OVFT.wu5wy7oxdSrbr6LeKUHjkC&pid=News&w=2340&h=1320&c=14&rs=2&qlt=90'}
,{'title': 'The Demise of the Sales Funnel: Embracing the AI-Driven Bow Tie Model for Customer Engagement', 'content': 'The traditional sales funnel is losing its effecti…w tie model and revolutionize marketing strategy.', 'link': 'https://www.forbes.com/sites/benjaminlaker/2023/07…ining-marketing-strategy-for-the-data-driven-age/', 'img': 'https://www.bing.com/th?id=OVFT.wu5wy7oxdSrbr6LeKUHjkC&pid=News&w=2340&h=1320&c=14&rs=2&qlt=90'}
,{'title': 'The Demise of the Sales Funnel: Embracing the AI-Driven Bow Tie Model for Customer Engagement', 'content': 'The traditional sales funnel is losing its effecti…w tie model and revolutionize marketing strategy.', 'link': 'https://www.forbes.com/sites/benjaminlaker/2023/07…ining-marketing-strategy-for-the-data-driven-age/', 'img': 'https://www.bing.com/th?id=OVFT.wu5wy7oxdSrbr6LeKUHjkC&pid=News&w=2340&h=1320&c=14&rs=2&qlt=90'}
,{'title': 'The Demise of the Sales Funnel: Embracing the AI-Driven Bow Tie Model for Customer Engagement', 'content': 'The traditional sales funnel is losing its effecti…w tie model and revolutionize marketing strategy.', 'link': 'https://www.forbes.com/sites/benjaminlaker/2023/07…ining-marketing-strategy-for-the-data-driven-age/', 'img': 'https://www.bing.com/th?id=OVFT.wu5wy7oxdSrbr6LeKUHjkC&pid=News&w=2340&h=1320&c=14&rs=2&qlt=90'}
,{'title': 'The Demise of the Sales Funnel: Embracing the AI-Driven Bow Tie Model for Customer Engagement', 'content': 'The traditional sales funnel is losing its effecti…w tie model and revolutionize marketing strategy.', 'link': 'https://www.forbes.com/sites/benjaminlaker/2023/07…ining-marketing-strategy-for-the-data-driven-age/', 'img': 'https://www.bing.com/th?id=OVFT.wu5wy7oxdSrbr6LeKUHjkC&pid=News&w=2340&h=1320&c=14&rs=2&qlt=90'}
,{'title': 'The Demise of the Sales Funnel: Embracing the AI-Driven Bow Tie Model for Customer Engagement', 'content': 'The traditional sales funnel is losing its effecti…w tie model and revolutionize marketing strategy.', 'link': 'https://www.forbes.com/sites/benjaminlaker/2023/07…ining-marketing-strategy-for-the-data-driven-age/', 'img': 'https://www.bing.com/th?id=OVFT.wu5wy7oxdSrbr6LeKUHjkC&pid=News&w=2340&h=1320&c=14&rs=2&qlt=90'}
,{'title': 'The Demise of the Sales Funnel: Embracing the AI-Driven Bow Tie Model for Customer Engagement', 'content': 'The traditional sales funnel is losing its effecti…w tie model and revolutionize marketing strategy.', 'link': 'https://www.forbes.com/sites/benjaminlaker/2023/07…ining-marketing-strategy-for-the-data-driven-age/', 'img': 'https://www.bing.com/th?id=OVFT.wu5wy7oxdSrbr6LeKUHjkC&pid=News&w=2340&h=1320&c=14&rs=2&qlt=90'}
,{'title': 'The Demise of the Sales Funnel: Embracing the AI-Driven Bow Tie Model for Customer Engagement', 'content': 'The traditional sales funnel is losing its effecti…w tie model and revolutionize marketing strategy.', 'link': 'https://www.forbes.com/sites/benjaminlaker/2023/07…ining-marketing-strategy-for-the-data-driven-age/', 'img': 'https://www.bing.com/th?id=OVFT.wu5wy7oxdSrbr6LeKUHjkC&pid=News&w=2340&h=1320&c=14&rs=2&qlt=90'}
,{'title': 'The Demise of the Sales Funnel: Embracing the AI-Driven Bow Tie Model for Customer Engagement', 'content': 'The traditional sales funnel is losing its effecti…w tie model and revolutionize marketing strategy.', 'link': 'https://www.forbes.com/sites/benjaminlaker/2023/07…ining-marketing-strategy-for-the-data-driven-age/', 'img': 'https://www.bing.com/th?id=OVFT.wu5wy7oxdSrbr6LeKUHjkC&pid=News&w=2340&h=1320&c=14&rs=2&qlt=90'}
,{'title': 'The Demise of the Sales Funnel: Embracing the AI-Driven Bow Tie Model for Customer Engagement', 'content': 'The traditional sales funnel is losing its effecti…w tie model and revolutionize marketing strategy.', 'link': 'https://www.forbes.com/sites/benjaminlaker/2023/07…ining-marketing-strategy-for-the-data-driven-age/', 'img': 'https://www.bing.com/th?id=OVFT.wu5wy7oxdSrbr6LeKUHjkC&pid=News&w=2340&h=1320&c=14&rs=2&qlt=90'}
,{'title': 'The Demise of the Sales Funnel: Embracing the AI-Driven Bow Tie Model for Customer Engagement', 'content': 'llllllllllllasttttttttttttttt', 'link': 'https://www.forbes.com/sites/benjaminlaker/2023/07…ining-marketing-strategy-for-the-data-driven-age/', 'img': 'https://www.bing.com/th?id=OVFT.wu5wy7oxdSrbr6LeKUHjkC&pid=News&w=2340&h=1320&c=14&rs=2&qlt=90'}
]


  const toggleModal = () => {
    setModal(!modal);
  };




  return (
    <>
     
      {/* <button onClick={toggleModal} className="btn-modal">
        Open
      </button> */}

      <svg onClick={toggleModal} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path fill="currentColor" d="M15 15H2V6h2.595s.689-.896 2.17-2H1a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h15a1 1 0 0 0 1-1v-3.746l-2 1.645V15zm-1.639-6.95v3.551L20 6.4l-6.639-4.999v3.131C5.3 4.532 5.3 12.5 5.3 12.5c2.282-3.748 3.686-4.45 8.061-4.45z"/></svg>


      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content" >
{/* <div className="toggle">
  <button onClick={()=>setactive(0)} className={`${active ? "" : "active"}`}>Text</button>
  <button onClick={()=>setactive(1)} className={`${active ? "active" : ""}`}>HTML</button>
</div> */}
{/* <button>copy</button> */}
<CopySectionButton sectionId="sectionToCopy" />
{active ? (
              /* Render HTML content here when 'active' is true */
              <div>
                <h2>Hello HTML</h2>
                <p>
                 this will be the html mail
                </p>
              </div>
            ) : (
              /* Render other HTML content here when 'active' is false */
              <div id='sectionToCopy'>

                {mail_data.map((x)=>(
                  <>
<a href={x.link} target="_blank">
  <h1>{x.title}</h1>
</a>

<img className='main_img' src={x.img}/>
<p>{x.content}</p>
<a href={x.link} target="_blank">Read more</a>
<br />
<br />
<br />

</>
                ))}

              </div>
            )}

           
            <button className="close-modal" onClick={toggleModal}>
              CLOSE
            </button>
          </div>
        </div>
      )}
      
    </>
  );
}
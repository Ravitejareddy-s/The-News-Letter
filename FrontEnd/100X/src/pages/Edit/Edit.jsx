import React, {  useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Input from '@mui/material/Input';
import * as material from '@mui/material/';
import * as Icons from '@mui/icons-material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import InputAdornment from '@mui/material/InputAdornment';
import {backendUrl} from "../constants.js";


import './Edit.css' 


const Edit = () => {
  const { date, uid } = useParams();
  const [data, n_data] = useState({'category': '','date': '','desc': '','feedback': '','gpt_summary': '','gpt_title': '','img': '',  'link': '',  'logo_image': '',  'scraped_from': '',  'scraped_time': '',  'site_name': '',  'title': '',  'uid': ''})

  const [image, setimg] = useState('');
  const [link, setlink] = useState('');
  const [blogtitle, setblogtitle] = useState('');
  const [gpttitle, setgpttitle] = useState('');
  const [gptdesc, setgptdesc] = useState('');
  const [selectedOption, setSelectedOption] = useState(''); // Initialize with an empty string or any default value you want


  async function get_prob() {



      const response = await fetch(`${backendUrl}/news/`, {
        method: 'POST', headers: {
          "authorization": localStorage.getItem("token"),
          'Content-Type': 'application/json'
        }, body: JSON.stringify({
          "date": date,
          "uid": uid
        })
      });
      const data2 = await response.json();
      if(data2[0]){
      n_data(data2[0])
      console.log('data: ',data2)
      }

  }

  useEffect(() => {

    get_prob();
  }, []);

  useEffect(() => {
    setlink(data.link)
    setimg(data.img)
    setblogtitle(data.title)
    setgpttitle(data.gpt_title)
    setgptdesc(data.gpt_summary)
    setSelectedOption(data.category)

  }, [data]);


  const darkTheme = createTheme({
    palette: {
      mode: 'dark'
    },
  });
  // Use the postId and userId values in your component

  async function save() {
    const payload={'date':date,'uid':uid,'update':{'site_name':"ad hoc"}}
    // console.log(data.scraped_time,data.uid,"dropdoen: ",selectedOption,"  ||  "+ 'image: '+ image,"  ||  "+ 'title: '+ gpttitle,"  ||  "+ 'desc: '+ gptdesc)
    if(selectedOption){
      console.log("entering if stmt")
      if(!data.feedback){
        payload.update.feedback='l'

      }
      if(!data.title){
        payload.update.title=gpttitle

      }

      
      if(selectedOption !== data.category){
        payload.update.category=selectedOption
      }
      if(image !== data.img){
        payload.update.img=image
      }
      if(gpttitle !== data.gpt_title){
        payload.update.gpt_title=gpttitle
      }
      if(gptdesc !== data.gpt_summary){
        payload.update.gpt_summary=gptdesc
      }
      if(link !== data.link){
        payload.update.link=link
      }

      if(Object.keys(payload.update).length > 0){
        console.log(payload.update)
// console.log(payload)
        await fetch(`${backendUrl}/update_data`, {
          method: 'POST', headers: {
          "authorization": localStorage.getItem("token"),

            'Content-Type': 'application/json'
          }, body: JSON.stringify(payload)
        });
        window.close()
      }else{
        alert("no chainges made")
      }
    }else{

      alert("Please select a category")
    }





  }


  async function showAlert() {
    const blog_content = document.getElementById("blog content").value;
    const blog_title = document.getElementById("blog title").value;
    const prompt_desc = document.getElementById("prompt desc").value;
    const prompt_title = document.getElementById("prompt title").value;
    // alert(blog_content+' ||  ' +blog_title+' ||  ' +gpt_desc+ ' ||  ' +gpt_title+' ||  ' +link+' ||  ' +image);

    const response = await fetch(`${backendUrl}/generate/`, {
      method: 'POST', headers: {
        "authorization": localStorage.getItem("token"),
        'Content-Type': 'application/json'
      }, body: JSON.stringify({

        "title": blog_title, "link": link, "p_title": prompt_title, "p_desc": prompt_desc, "scraped_data": blog_content

      })
    });
    const data2 = await response.json();


    setgpttitle(data2.gpt_title)
    setgptdesc(data2.gpt_summary)
    if (!img) {
      setimg(data2.image)
    }


  }
  return (

    <div className='edit_body'>

<div class="three">
  <h1>Add / Edit Article</h1>
</div>

      {/* <div>{data.title}</div> */}
      <ThemeProvider theme={darkTheme}>
        <div className='first_inputs'>
          <material.FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <material.InputLabel id="dropdown-label">Category</material.InputLabel>
            <material.Select
              labelId="dropdown-label"
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
            >
              <material.MenuItem value="AI">AI</material.MenuItem>
              <material.MenuItem value="Business models">Business models</material.MenuItem>
              <material.MenuItem value="Digital marketing">Digital marketing</material.MenuItem>
              <material.MenuItem value="Business models">Business models</material.MenuItem>
              {/* Add more menu items as needed */}
            </material.Select>
          </material.FormControl>

          <Input className='generate'  onChange={(e) => setlink(e.target.value)}

            startAdornment={
              <InputAdornment position="start">
                <Icons.Link />
              </InputAdornment>
            }
            value={link}
            
            defaultValue={link}

            sx={{ width: '100%' }}
          />

              <InputAdornment position="end">
                <Button onClick={showAlert} className="custom-button">generate</Button>
              </InputAdornment>


        </div>
        <div className='first_inputs'>
          {/* <CssBaseline /> */}


          {/* <div className='input_image'> */}
          <Input onChange={(e) => setimg(e.target.value)}
            startAdornment={
              <InputAdornment position="start">
                <Icons.Image />
              </InputAdornment>
            }
            value={image}
          />
          <img src={image} />
          <div className='prompts'>
            Prompts
            <div className='chatgpt'>

              <material.TextField
                id="prompt title"
                label="Title"
                multiline
                rows={4}
                defaultValue='make the title more attractive and engaging'
                variant="filled"
              />


              <material.TextField
                id="prompt desc"
                label="Summary"
                multiline
                rows={4}
                defaultValue="summarize news piece with a touch of humor and creativity"
                variant="filled"
              />
            </div>
          </div>
        </div>
        <Input id="gpt title" value={gpttitle} onChange={(e) => setgpttitle(e.target.value)} placeholder="Title" multiline variant="soft" />
        <Input id="gpt desc" value={gptdesc} onChange={(e) => setgptdesc(e.target.value)} placeholder="Summary" multiline variant="soft" />
        <Button onClick={save} style={{ textTransform: "none", width: '100px' }} variant="contained">Save</Button>


        <Input id='blog title' value={blogtitle} onChange={(e) => setblogtitle(e.target.value)}
          placeholder='Please paste the article Title here'

        />
        <Input id='blog content' placeholder='Please paste the article Content here' />

        {/* </Paper> */}
      </ThemeProvider>

    </div>
  
  );
};

export default Edit;
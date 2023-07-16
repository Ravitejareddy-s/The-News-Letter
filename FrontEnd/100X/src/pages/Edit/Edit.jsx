import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Input from '@mui/material/Input';
import * as material from '@mui/material/';
import * as Icons from '@mui/icons-material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import InputAdornment from '@mui/material/InputAdornment';


import './Edit.css' 


const Edit = () => {
  const { date, uid } = useParams();
  const [link, setLink] = useState('link');
  const [image, setimg] = useState('');
  const img='img'

  const darkTheme = createTheme({
    palette: {
      mode: 'dark'
    },
  });
  // Use the postId and userId values in your component

  return (      

  <div className='edit_body'>
    <ThemeProvider theme={darkTheme}>
      {/* <Paper> */}
      <Input
      startAdornment={
        <InputAdornment position="start">
          <Icons.Link />
        </InputAdornment>
      }
      endAdornment={
        <InputAdornment position="end">
          <Button className="custom-button">generate</Button>
        </InputAdornment>
      }
    />
    <div className='first_inputs'>
    {/* <CssBaseline /> */}


{/* <div className='input_image'> */}
<Input onChange={(e)=>setimg(e.target.value)}
      startAdornment={
        <InputAdornment position="start">
          <Icons.Image />
        </InputAdornment>
      }
    />
    <img src={image}  />
<div className='prompts'>
Prompts
<div className='chatgpt'>

<material.TextField
          id="filled-multiline-static"
          label="Title"
          multiline
          rows={4}
          defaultValue="Default Value"
          variant="filled"
        />


<material.TextField
          id="filled-multiline-static"
          label="Summary"
          multiline
          rows={4}
          defaultValue="Default Value"
          variant="filled"
        />
</div>
</div>
</div>
<Input placeholder="Title" multiline variant="soft" />
<Input placeholder="Summary" multiline variant="soft" />
<Button onClick={()=>{console.log("test")}} style={{ textTransform: "none",width:'100px' }} variant="contained">Save</Button>

<Input placeholder='Please paste the article content here'
      endAdornment={
        <InputAdornment position="end">
          <button style={{ backgroundColor: 'transparent' }} onClick={()=>{console.log("working")}}>
          <Icons.Cached />
          </button >
        </InputAdornment>
      }
    />
{/* </Paper> */}
</ThemeProvider>

  </div>
  
  );
};

export default Edit;
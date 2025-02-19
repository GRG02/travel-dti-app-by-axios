import React from 'react'

import { Box,Typography,Avatar,TextField, Button,  } from '@mui/material';
import { Link } from 'react-router-dom';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import { Styled } from '@mui/material/styles';
import {useState} from react

import Travel from '../assets/travel.png'
import Profile from '../assets/Profile.png'





function Register() {

  const [travellerImage , setTravellerImage] = useState(null)
  const [travellerFullname , setTravellerFullname] = useState('')
  const [travellerEmail , setTravellerEmail] = useState('')
  const [travellerPassword , setTravellerPassword] = useState('')

  const handleSelectFileClick = () =>{
    const file = e.target.files[0]


    if(file){
      setTravellerImage(file)
    }
  }

  const handleRegisterClick = async (e) =>{
    e.preventDefault();

    // Validate UI แล้วค่อยส่งข้อมูลไปให้ API ที่ผั่ง Backend
    if(travellerFullname.trim().length == 0){
      alert('กรุณากรอกชื่อ-นามสกุล')
    }else if(travellerEmail.trim().length == 0){
      alert('กรุณากรอกชื่อผู้ใช้')
    }else if(travellerPassword.trim().length == 0){
      alert('กรุณากรอกรหัสผ่าน')
    }else{
      //ส่งข้อมูลไปให้ API บันทึกลง DB แล้ว redirect ไปหน้า Login
      
    }

    
  }

  const selectFileBt = styled("input")({
    clip:"rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1


  })




  return (
    <Box sx={{width:'100%', height: '100vh', display: 'flex', alignItems: 'center'}} >
      <Box sx={{width:'40%', boxShadow: 4, mx: 'auto', mt: 5, p: 5}}>
        <Typography variant='h3' sx={{textAlign: 'center'}} >
          Travel DTI
        </Typography>
        <Avatar src={Travel} alt='travel logo' sx={{width: 150, height: 150, mx: 'auto', my: 2 }}/>
        <Typography variant='h5' sx={{textAlign: 'center'}} >
          ลงทะเบียน
        </Typography>
        <Typography sx={{fontWeight: 'bold', mt: 4, mb: 1}} >
          ชื่อ-นามสกุล
        </Typography>
        <TextField fullWidth/>
        <Typography sx={{fontWeight: 'bold', mt: 4, mb: 1}} >
          ชื่อผู้ใช้(Email)
        </Typography>
        <TextField fullWidth value={travellerEmail} />
        <Typography sx={{fontWeight: 'bold', mt: 4, mb: 1}} >
          รหัสผ่าน
        </Typography>
        <TextField fullWidth type='password'/>
        <Avatar src={Profile} alt='travel logo' sx={{width: 150, height: 150, mx: 'auto', my: 2 }}/>
        
        <Box sx={{display: 'flex', justifyContent: 'center'}}>
        <Button variant='contained' 
        startIcon={<CloudUploadIcon/  >}>
        เลือกรูป
        <selectFileBt type="file " accept="image/*" onChange={handleSelectFileClick} />
        
        </Button>
        </Box>
        
        <Button variant='contained' fullWidth
         sx={{mt: 4,py: 2, backgroundColor: '#2ede59'}}>
          Register
        </Button>
        

        <Link to='/' style={{TextDecoration: 'none', color: '#2ede59'}}>
          <Typography sx={{fontWeight: 'bold', mt: 2, mb: 1, textAlign: 'center'}} >
            กลับไปไหน้า Login
          </Typography>
        </Link>

        

      </Box>
    </Box>
  )
}

export default Register
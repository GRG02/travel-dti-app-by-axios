import React from 'react'

// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import Avatar from '@mui/material/Avatar';
import { Box,Typography,Avatar,TextField, Button,  } from '@mui/material';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Travel from '../assets/travel.png';
import axios from 'axios';


function Login() {

  const [travellerEmail, setTravellerEmail] = useState();
  const [travellerPassword, setTravellerPassword] = useState(); 

  const handleLoginClick = async (e) =>{
    e.preventDefault();

    //validate ui
    if(travellerEmail.length == 0){
      alert("ป้อนอีเมล์ด้วย");
      return;
    }else if(travellerPassword.length == 0){
      alert("ป้อนรหัสผ่านด้วย");
      return;
    }

    //ส่งข้อมูลไปให้ API ลงฐานข้อมูลแล้วไปยังหน้า MyTravel
    try {
      const response = await axios.get(`https://travel-service-server-by-prisma-ivory.vercel.app/traveller/${travellerEmail}/${travellerPassword}`)
    
      if(response.status == 200) {
        alert('ลงชื่อเข้าใช้สำเร็จ...');
    
        // ดึงข้อมูลจาก response และเก็บลงใน localStorage
        // const data = await response.json();  // เรียกใช้ json() ด้วยวงเล็บ
        localStorage.setItem('traveller', JSON.stringify(response.data['data']));
    
        // เปิดไปหน้า /mytravel
        window.location.href = '/mytravel';
      } else if(response.status == 404) {
        alert('ชื่อผู้ใช้หรือรหัสไม่ถูกต้อง');
      } else {
        alert('ลงชื่อเข้าใช้ไม่สำเร็จ กรุณาลองใหม่อีกครั้ง...');
      }
    } catch(error) {
      alert('พบข้อผิดพลาด: ' + error);
    }
  }

  return (
    <Box sx={{width:'100%', height: '100vh', display: 'flex', alignItems: 'center'}} >
      <Box sx={{width:'40%', boxShadow: 4, mx: 'auto', mt: 5, p: 5}}>
        <Typography variant='h3' sx={{textAlign: 'center'}} >
          Travel DTI
        </Typography>
        <Avatar src={Travel} alt='travel logo' sx={{width: 150, height: 150, mx: 'auto', my: 2 }}/>
        <Typography variant='h5' sx={{textAlign: 'center'}} >
          เข้าใช้งานระบบ
        </Typography>
        <Typography sx={{fontWeight: 'bold', mt: 4, mb: 1}} >
          ชื่อผู้ใช้
        </Typography>
        <TextField fullWidth value={travellerEmail} onChange={(e)=>setTravellerEmail(e.target.value)}/>
        <Typography sx={{fontWeight: 'bold', mt: 4, mb: 1}} >
          รหัสผ่าน
        </Typography>
        <TextField fullWidth type='password' value={travellerPassword} onChange={(e)=>setTravellerPassword(e.target.value)} />
        <Button variant='contained' fullWidth onClick={handleLoginClick}
         sx={{mt: 4,py: 2, backgroundColor: '#2ede59'}}>
          LOGIN
        </Button>

        <Link to='/register' style={{TextDecoration: 'none', color: '#2ede59'}}>
          <Typography sx={{fontWeight: 'bold', mt: 2, mb: 1, textAlign: 'center'}} >
            ลงทะเบียน
          </Typography>
        </Link>

        

      </Box>
    </Box>
  )
}

export default Login
import React from 'react'

// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import Avatar from '@mui/material/Avatar';
import { Box,Typography,Avatar,TextField, Button,  } from '@mui/material';
import { Link } from 'react-router-dom';

import Travel from '../assets/travel.png'


function Login() {

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
        <TextField fullWidth/>
        <Typography sx={{fontWeight: 'bold', mt: 4, mb: 1}} >
          รหัสผ่าน
        </Typography>
        <TextField fullWidth type='password'  />
        <Button variant='contained' fullWidth
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
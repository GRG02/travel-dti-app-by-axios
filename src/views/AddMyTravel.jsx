import React, { useEffect, useState } from 'react';
import { Box, AppBar, Toolbar, IconButton, Typography, Button, Avatar, TextField } from '@mui/material';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import Profile from './../assets/Profile.png';
import { Link } from 'react-router-dom';
import Travel from './../assets/travel.png';
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from 'axios';

function AddMyTravel() {
  const [travellerFullname, setTravellerFullname] = useState('');
  const [travellerImage, setTravellerImage] = useState('');

  const [travelPlace, setTravelPlace] = useState("");
  const [travelStartDate, setTravelStartDate] = useState("");
  const [travelEndDate, setTravelEndDate] = useState("");
  const [travelCostTotal, setTravelCostTotal] = useState("");
  const [travelImage, setTravelImage] = useState(null);

  const handleSelectFileClick = (e) => {
    const file = e.target.files[0];
    if (file) {
      setTravelImage(file);
    }
  };

  const handleAddTravelClick = async (e) => {
    e.preventDefault();
  
    // Validate UI แล้วค่อยส่งข้อมูลไปให้ API
    if (travelPlace.trim().length === 0) {
      alert("ป้อนสถานที่ด้วย");
      return;
    } else if (travelStartDate.trim().length === 0) {
      alert("ป้อนวันที่เริ่มทริปด้วย");
      return;
    } else if (travelEndDate.trim().length === 0) {
      alert("ป้อนวันที่จบทริปด้วย");
      return;
    } else if (travelCostTotal.trim().length === 0) {
      alert("ป้อนค่าเดินทางด้วย");
      return;
    }
  
    // ดึง travellerId จาก localStorage
    const travellerData = localStorage.getItem('traveller');
    let travellerId = '';
      
    if (travellerData) {
      try {
        const traveller = JSON.parse(travellerData);
        travellerId = traveller.travellerId;  // สมมุติว่า travellerId เก็บอยู่ใน `travellerId`
      } catch (error) {
        console.error('Error parsing traveller data from localStorage:', error);
      }
    }
  
    // ส่งข้อมูลไปให้ API บันทึกลง DB โดยใช้ formData
    const formData = new FormData();
    formData.append("travellerId", travellerId);
    formData.append("travelPlace", travelPlace);
    formData.append("travelStartDate", travelStartDate);
    formData.append("travelEndDate", travelEndDate);
    formData.append("travelCostTotal", travelCostTotal);
  
    if (travelImage) {
      formData.append("travelImage", travelImage);
    }
  
    try {
      const response = await axios.post('travel-service-server-by-prisma-ivory.vercel.app/travel/', formData);
      if (response.status === 201) {
        alert('เพิ่มการเดินทางสำเร็จ...');
        window.location.href = '/mytravel';
      } else {
        alert('เพิ่มการเดินทางไม่สำเร็จ กรุณาลองใหม่อีกครั้งนึง...');
      }
    } catch (error) {
      console.error('Error adding travel:', error);
      alert('พบข้อผิดพลาด: ' + error);
    }
  };
  
  useEffect(() => {
    const travelData = localStorage.getItem('travel');
    if (travelData) {
      try {
        const travel = JSON.parse(travelData);
        setTravelPlace(travel.travelPlace);
        setTravelStartDate(travel.travelStartDate);
        setTravelEndDate(travel.travelEndDate);
        setTravelCostTotal(travel.travelCostTotal);
        setTravelImage(travel.travelImage);
      } catch (error) {
        console.error('Error parsing travel data from localStorage:', error);
      }
    } else {
      console.log('No travel data found in localStorage');
    }
  }, []);
  
  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <AirplanemodeActiveIcon sx={{ color: 'white' }} />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                News
              </Typography>
              <Button color="inherit">
                {travellerFullname}
              </Button>
              <Avatar src={travellerImage === '' ? Profile : 'http://localhost:3000/images/traveller/' + travellerImage} />
              <Link to={'/'} style={{ color: 'red', textDecoration: 'none', marginLeft: '10px' }}>
                LOG OUT
              </Link>
            </Toolbar>
          </AppBar>
        </Box>
  
        <Box sx={{ width: '70%', boxShadow: 4, mx: 'auto', p: 5, my: 4 }}>
          <Typography variant='h4' component='div' sx={{ textAlign: 'center' }}>
            เพิ่มการเดินทาง
          </Typography>
  
          <Avatar
            src={Travel}
            alt="travel logo"
            sx={{ width: 150, height: 150, mx: "auto", my: 2 }}
          />
          <Typography sx={{ fontWeight: "bold", mt: 4, mb: 1 }}>
            สถานที่
          </Typography>
          <TextField
            fullWidth
            value={travelPlace}
            onChange={(e) => setTravelPlace(e.target.value)}
          />
          <Typography sx={{ fontWeight: "bold", mt: 4, mb: 1 }}>
            วันที่เริ่มทริป
          </Typography>
          <TextField
            fullWidth
            value={travelStartDate}
            onChange={(e) => setTravelStartDate(e.target.value)}
          />
          <Typography sx={{ fontWeight: "bold", mt: 2, mb: 1 }}>
            วันที่จบทริป
          </Typography>
          <TextField
            fullWidth
            value={travelEndDate}
            onChange={(e) => setTravelEndDate(e.target.value)}
          />
          <Typography sx={{ fontWeight: "bold", mt: 2, mb: 1 }}>
            ค่าใช้จ่าย
          </Typography>
          <TextField
            fullWidth
            value={travelCostTotal}
            onChange={(e) => setTravelCostTotal(e.target.value)}
          />
  
          <Avatar
            src={
              travelImage && travelImage instanceof File
                ? URL.createObjectURL(travelImage)
                : Profile
            }
            alt="travel logo"
            sx={{ width: 150, height: 150, mx: "auto", my: 3 }}
            variant="rounded"
          />
  
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
            >
              เลือกรูปที่คุณเดินทางไป
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleSelectFileClick}
              />
            </Button>
          </Box>
  
          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 4, py: 2, backgroundColor: "#259e69" }}
            onClick={handleAddTravelClick}
          >
            เพิ่มการเดินทาง
          </Button>
  
          <Link to="/mytravel" style={{ textDecoration: "none", color: "#259e69" }}>
            <Typography
              sx={{ fontWeight: "bold", mt: 2, mb: 1, textAlign: "center" }}
            >
              กลับไปหน้าหลัก
            </Typography>
          </Link>
        </Box>
      </Box>
    </>
  );
}

export default AddMyTravel;

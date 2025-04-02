import React, { useState } from "react";
import { Box, Typography, Avatar, TextField, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import axios from "axios";

import Travel from "./../assets/travel.png";
import Profile from "./../assets/Profile.png";

function Register() {
  const [travellerImage, setTravellerImage] = useState(null);
  const [travellerFullname, setTravellerFullname] = useState("");
  const [travellerEmail, setTravellerEmail] = useState("");
  const [travellerPassword, setTravellerPassword] = useState("");

  const navigate = useNavigate();

  const handleSelectFileClick = (e) => {
    const file = e.target.files[0];
    if (file) {
      setTravellerImage(file);
    }
  };

  const handleRegisterClick = async (e) => {
    e.preventDefault();

    // Validate UI
    if (travellerFullname.trim().length === 0) {
      alert("ป้อนชื่อ-นามสกุลด้วย");
      return;
    } else if (travellerEmail.trim().length === 0) {
      alert("ป้อนอีเมล์ด้วย");
      return;
    } else if (travellerPassword.trim().length === 0) {
      alert("ป้อนรหัสผ่านด้วย");
      return;
    }

    // เตรียมข้อมูล formData
    const formData = new FormData();
    formData.append("travellerFullname", travellerFullname);
    formData.append("travellerEmail", travellerEmail);
    formData.append("travellerPassword", travellerPassword);
    if (travellerImage) {
      formData.append("travellerImage", travellerImage);
    }

    // ส่งข้อมูลไปยัง API ด้วย axios
    try {
      const response = await axios.post(
        "https://travel-service-server-by-prisma-ivory.vercel.app/traveller/",
        formData, // ส่ง formData เป็นพารามิเตอร์แรก
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      if (response.status === 201) {
        alert("ลงทะเบียนสำเร็จ...");
        navigate("/");
      } else {
        alert("ลงทะเบียนไม่สำเร็จ กรุณาลองใหม่อีกครั้งนึง...");
      }
    } catch (error) {
      alert("พบข้อผิดพลาด: " + error.message);
    }
  };

  const SelectFileBt = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ width: "60%", boxShadow: 4, mx: "auto", p: 5, my: 4 }}>
        <Typography variant="h3" sx={{ textAlign: "center", fontWeight: "bold" }}>
          Travel DTI
        </Typography>
        <Avatar src={Travel} alt="travel logo" sx={{ width: 150, height: 150, mx: "auto", my: 2 }} />
        <Typography variant="h5" sx={{ textAlign: "center", fontWeight: "bold" }}>
          ลงทะเบียน
        </Typography>
        <Typography sx={{ fontWeight: "bold", mt: 4, mb: 1 }}>ชื่อ-นามสกุล</Typography>
        <TextField fullWidth value={travellerFullname} onChange={(e) => setTravellerFullname(e.target.value)} />
        <Typography sx={{ fontWeight: "bold", mt: 4, mb: 1 }}>ชื่อผู้ใช้ (E-Mail)</Typography>
        <TextField fullWidth value={travellerEmail} onChange={(e) => setTravellerEmail(e.target.value)} />
        <Typography sx={{ fontWeight: "bold", mt: 2, mb: 1 }}>รหัสผ่าน</Typography>
        <TextField
          fullWidth
          type="password"
          value={travellerPassword}
          onChange={(e) => setTravellerPassword(e.target.value)}
        />
        <Avatar
          src={travellerImage == null ? Profile : URL.createObjectURL(travellerImage)}
          alt="Profile"
          sx={{ width: 150, height: 150, mx: "auto", my: 3 }}
          variant="rounded"
        />
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
            เลือกรูป
            <SelectFileBt type="file" accept="image/*" onChange={handleSelectFileClick} />
          </Button>
        </Box>
        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 4, py: 2, backgroundColor: "#259e69" }}
          onClick={handleRegisterClick}
        >
          ลงทะเบียน
        </Button>
        <Link to="/" style={{ textDecoration: "none", color: "#259e69" }}>
          <Typography sx={{ fontWeight: "bold", mt: 2, mb: 1, textAlign: "center" }}>
            กลับไปหน้า LOGIN
          </Typography>
        </Link>
      </Box>
    </Box>
  );
}

export default Register;

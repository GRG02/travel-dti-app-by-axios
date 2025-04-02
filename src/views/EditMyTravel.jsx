import React, { useEffect, useState } from "react";
import { styled } from "@mui/system";
import { Box, AppBar, Toolbar, IconButton, Typography, Button, Avatar, TextField } from "@mui/material";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import { Link, useParams, useNavigate } from "react-router-dom";
import Travel from "./../assets/travel.png";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Profile from "./../assets/Profile.png";
import axios from "axios";

function EditMyTravel() {
  const [travellerId, setTravellerId] = useState("");
  const [travellerFullname, setTravellerFullname] = useState("");
  const [travellerImage, setTravellerImage] = useState("");

  const [travelPlace, setTravelPlace] = useState("");
  const [travelStartDate, setTravelStartDate] = useState("");
  const [travelEndDate, setTravelEndDate] = useState("");
  const [travelCostTotal, setTravelCostTotal] = useState("");
  const [travelImage, setTravelImage] = useState(null);

  const { travelId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const traveller = JSON.parse(localStorage.getItem("traveller"));
    if (traveller) {
      setTravellerFullname(traveller.travellerFullname);
      setTravellerImage(traveller.travellerImage);
      setTravellerId(traveller.travellerId); // ตรวจสอบ key ให้ตรงกับข้อมูลใน localStorage
    }

    const getTravel = async () => {
      try {
        const response = await axios.get(`travel-service-server-by-prisma-ivory.vercel.app/travel/one/${travelId}`);
        const data = response.data;
        // สมมุติว่า API ส่งข้อมูลในรูปแบบ { data: { travelPlace, travelStartDate, travelEndDate, travelCostTotal } }
        setTravelPlace(data["data"].travelPlace);
        setTravelStartDate(data["data"].travelStartDate);
        setTravelEndDate(data["data"].travelEndDate);
        setTravelCostTotal(data["data"].travelCostTotal);
      } catch (error) {
        console.error("Error fetching travel data:", error);
      }
    };

    getTravel();
  }, [travelId]);

  const handleEditTravelClick = async (e) => {
    e.preventDefault();

    // Validate UI
    if (travelPlace.trim().length === 0) {
      alert("ป้อนสถานที่ด้วย");
      return;
    } else if (travelStartDate.trim().length === 0) {
      alert("ป้อนวันที่เริ่มทริปด้วย");
      return;
    } else if (travelEndDate.trim().length === 0) {
      alert("ป้อนวันที่จบทริปด้วย");
      return;
    } else if (typeof travelCostTotal === "string" && travelCostTotal.trim().length === 0) {
      alert("ป้อนค่าเดินทางด้วย");
      return;
    }

    // ดึง travellerId จาก localStorage
    const travellerData = localStorage.getItem("traveller");
    let storedTravellerId = "";
    if (travellerData) {
      try {
        const traveller = JSON.parse(travellerData);
        storedTravellerId = traveller.travellerId;
      } catch (error) {
        console.error("Error parsing traveller data from localStorage:", error);
      }
    }

    // เตรียมข้อมูล formData
    const formData = new FormData();
    formData.append("travellerId", storedTravellerId);
    formData.append("travelPlace", travelPlace);
    formData.append("travelStartDate", travelStartDate);
    formData.append("travelEndDate", travelEndDate);
    formData.append("travelCostTotal", travelCostTotal);
    if (travelImage) {
      formData.append("travelImage", travelImage);
    }

    try {
      const response = await axios.put(`travel-service-server-by-prisma-ivory.vercel.app/travel/${travelId}`, formData);
      if (response.status === 200) {
        alert("แก้ไขสำเร็จ...");
        navigate("/mytravel");
      } else {
        alert("แก้ไขไม่สำเร็จ กรุณาลองใหม่อีกครั้งนึง...");
      }
    } catch (error) {
      console.error("Error updating travel data:", error);
      alert("พบข้อผิดพลาดในการแก้ไขข้อมูล");
    }
  };

  const handleSelectFileClick = (e) => {
    const file = e.target.files[0];
    if (file) {
      setTravelImage(file);
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
    <>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ flexGrow: 1 }}>
          <Box sx={{ width: "70%", boxShadow: 4, mx: "auto", p: 5, my: 4 }}>
            <Typography variant="h4" component="div" sx={{ textAlign: "center" }}>
              เพิ่มการเดินทาง
            </Typography>

            <Avatar
              src={Travel}
              alt="travel logo"
              sx={{ width: 150, height: 150, mx: "auto", my: 2 }}
            />
            <Typography sx={{ fontWeight: "bold", mt: 4, mb: 1 }}>สถานที่</Typography>
            <TextField fullWidth value={travelPlace} onChange={(e) => setTravelPlace(e.target.value)} />
            <Typography sx={{ fontWeight: "bold", mt: 4, mb: 1 }}>วันที่เริ่มทริป</Typography>
            <TextField fullWidth value={travelStartDate} onChange={(e) => setTravelStartDate(e.target.value)} />
            <Typography sx={{ fontWeight: "bold", mt: 2, mb: 1 }}>วันที่จบทริป</Typography>
            <TextField fullWidth value={travelEndDate} onChange={(e) => setTravelEndDate(e.target.value)} />
            <Typography sx={{ fontWeight: "bold", mt: 2, mb: 1 }}>ค่าใช้จ่าย</Typography>
            <TextField fullWidth value={travelCostTotal} onChange={(e) => setTravelCostTotal(e.target.value)} />

            <Avatar
              src={travellerImage ? (typeof travellerImage === 'string' ? travellerImage : URL.createObjectURL(travellerImage)) : Profile}
              alt="Profile"
              sx={{ width: 150, height: 150, mx: "auto", my: 3 }}
              variant="rounded"
            />


            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                เลือกรูปที่คุณเดินทางไป
                <SelectFileBt type="file" accept="image/*" onChange={handleSelectFileClick} />
              </Button>
            </Box>

            <Button
              variant="contained"
              fullWidth
              sx={{ mt: 4, py: 2, backgroundColor: "#259e69" }}
              onClick={handleEditTravelClick}
            >
              แก้ไขการเดินทาง
            </Button>

            <Link to="/mytravel" style={{ textDecoration: "none", color: "#259e69" }}>
              <Typography sx={{ fontWeight: "bold", mt: 2, mb: 1, textAlign: "center" }}>
                กลับไปหน้าหลัก
              </Typography>
            </Link>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default EditMyTravel;

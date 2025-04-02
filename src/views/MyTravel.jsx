import React, { useEffect, useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import Profile from "./../assets/Profile.png";
import { Link } from "react-router-dom";
import axios from "axios";

function MyTravel() {
  const [travellerId, setTravellerId] = useState(""); // ใช้ state สำหรับ travellerId
  const [travellerFullname, setTravellerFullname] = useState(""); // ใช้ state สำหรับชื่อผู้ใช้
  const [travellerImage, setTravellerImage] = useState(""); // ใช้ state สำหรับรูปโปรไฟล์
  const [travel, setTravel] = useState([]);

  useEffect(() => {
    // ดึงข้อมูลจาก localStorage
    const traveller = JSON.parse(localStorage.getItem("traveller"));
    if (traveller) {
      // กำหนดค่า travellerId, fullname และ image จาก localStorage หรือค่าดีฟอลต์
      setTravellerId(traveller.travellerId || ''); // ให้ตั้งค่า travellerId จากข้อมูลใน localStorage
      setTravellerFullname(traveller.travellerFullname || "ไม่มีชื่อ");
      setTravellerImage(traveller.travellerImage || ""); // ใช้ Profile.png ถ้ารูปไม่ถูกตั้งค่า
    }
  }, []);

  useEffect(() => {
    if (!travellerId) return; // ถ้าไม่มี travellerId ไม่ต้องทำการดึงข้อมูล

    const getAllTravel = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/travel/${travellerId}`
        );
        console.log("API Data:", response.data); // เช็คข้อมูล API
        setTravel(response.data["data"]);
      } catch (error) {
        console.error("Error fetching travel data:", error);
      }
    };

    getAllTravel();
  }, [travellerId]); // เมื่อ travellerId เปลี่ยน ให้ทำการดึงข้อมูลใหม่

  return (
    <>
      <Box sx={{ width: "100%" }}>
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
                <AirplanemodeActiveIcon sx={{ color: "white" }} />
              </IconButton>
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1 }}
              >
                News
              </Typography>
              <Button color="inherit" component={Link} to={`/editprofile/${travellerId}`}>
                {travellerFullname ? travellerFullname : "ไม่มีชื่อ"}
              </Button>
              <Button color="inherit" component={Link} to={`/editprofile/${travellerId}`}>
                <Avatar
                  src={
                    travellerImage && travellerImage !== ""
                      ? `http://localhost:3000/images/traveller/${travellerImage}`
                      : Profile
                  }
                />
              </Button>
              <Link
                to={"/"}
                style={{
                  color: "red",
                  textDecoration: "none",
                  marginLeft: "10px",
                }}
              >
                LOG OUT
              </Link>
            </Toolbar>
          </AppBar>
        </Box>

        <Box
          sx={{
            width: "70%",
            boxShadow: 4,
            mx: "auto",
            p: 5,
            my: 4,
          }}
        >
          <Typography
            variant="h4"
            component="div"
            sx={{ textAlign: "center", mb: 4 }}
          >
            การเดินทางของฉัน
          </Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow sx={{ backgroundColor: "lightblue" }}>
                  <TableCell align="center">ลำดับ</TableCell>
                  <TableCell align="center">สถานที่ไป</TableCell>
                  <TableCell align="center">รูป</TableCell>
                  <TableCell align="center">วันที่ไป</TableCell>
                  <TableCell align="center">วันที่กลับ</TableCell>
                  <TableCell align="center">ค่าใช้จ่ายทั้งหมด</TableCell>
                  <TableCell align="center">#</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {travel.map((row, index) => (
                  <TableRow
                    key={row.travelId}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="left">{row.travelPlace}</TableCell>
                    <TableCell align="left">
                      <Avatar
                        src={
                          row.travelImage === ""
                            ? Profile
                            : "http://localhost:3000/images/travel/" +
                              row.travelImage
                        }
                        sx={{
                          width: 50,
                          height: 50,
                          boxShadow: 3,
                        }}
                        variant="circular"
                      />
                    </TableCell>
                    <TableCell align="left">
                      {row.travelStartDate}
                    </TableCell>
                    <TableCell align="left">
                      {row.travelEndDate}
                    </TableCell>
                    <TableCell align="left">
                      {row.travelCostTotal}
                    </TableCell>
                    <TableCell align="left">
                      <Button
                        component={Link}
                        to={`/editmytravel/${row.travelId}`}
                      >
                        แก้ไข
                      </Button>
                      <Button
                        onClick={() => {
                          const confirmDelete = window.confirm(
                            `คุณต้องการลบรายการ ${row.travelPlace} หรือไม่?`
                          );
                          if (confirmDelete) {
                            axios
                              .delete(
                                `http://localhost:3000/travel/${row.travelId}`
                              )
                              .then((response) => {
                                if (response.status === 200) {
                                  setTravel(
                                    travel.filter(
                                      (item) =>
                                        item.travelId !== row.travelId
                                    )
                                  );
                                  alert(
                                    `ลบรายการ ${row.travelPlace} สำเร็จ`
                                  );
                                } else {
                                  alert(
                                    `ลบรายการ ${row.travelPlace} ไม่สำเร็จ`
                                  );
                                }
                              })
                              .catch((error) => {
                                console.error(
                                  "Error deleting travel data:",
                                  error
                                );
                                alert(
                                  `ลบรายการ ${row.travelPlace} ไม่สำเร็จ`
                                );
                              });
                          }
                        }}
                      >
                        ลบ
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            component={Link}
            to="/addmytravel"
            sx={{ fontWeight: "bold", mt: 4 }}
          >
            เพิ่มการเดินทาง
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default MyTravel;

import React, { useEffect,useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Avatar, IconButton } from "@mui/material";
import { Email, Work, Phone, LocationOn, Edit, Delete } from "@mui/icons-material";
import profileImg from "../Component/profile.png";
import { NavLink, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Detail = () => {

  const navigate = useNavigate();
  const { id } = useParams();
  console.log("User ID:", id);

  const [getuserdata, setUserdata] = useState({});

  const getdata = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/getuser/${id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" }
      });

          const data = await res.json();
          console.log("Fetched Data:", data);

          if (!res.ok) {
              console.error("Error fetching user:", res.status, data.message);
          } else {
              setUserdata(data);
          }
      } catch (error) {
          console.error("Fetch error:", error);
      }
  };

  useEffect(() => {
      if (id) getdata();
  }, [id]); // ✅ ID change hone par hi API call hogi

  const deleteuser = async (id) => {
    try {
        const res2 = await fetch(`http://localhost:8000/api/deleteuser/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!res2.ok) {
            console.log("Error:", await res2.text());
            return;
        }

        const deletedata = await res2.json();

        console.log("Deleted User:", deletedata);

        navigate("/");

    } catch (error) {
        console.error("Delete Request Failed:", error);
    }
};

useEffect(() => {
  document.body.style.overflow = "hidden";

  return () => {
    document.body.style.overflow = "auto";
  };
}, []);

  return (
    <>

    <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",  // Poora screen cover karega
      backgroundColor: "#f5f5f5",
    }}
  >
    <Card
      sx={{
        minWidth: 500,
        padding: "25px",
        borderRadius: "12px",
        boxShadow: "5px 5px 15px rgba(0,0,0,0.2)",
        backgroundColor: "#ffffff",
        marginBottom:10
      }}
    >

        <CardContent>
          {/* Header */}
          <Typography variant="h5" fontWeight="bold" align="center" color="primary">
            Welcome, Tony Stark!
          </Typography>
           {/* Action Buttons */}
           <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
           <NavLink to={`/edit/${getuserdata._id}`}><button className="btn btn-primary" style={{ marginRight: "10px", }}><i className="fa-solid fa-pen"></i></button> </NavLink>
           <button className="btn btn-danger" onClick={() =>deleteuser(getuserdata._id)}><i className="fa-solid fa-trash"></i></button>
         </div>

          {/* Profile Section */}
          <div style={{marginBottom:120}}>
          <div style={{ display: "flex", alignItems: "center", marginTop: "20px" }}>
            <Avatar src={profileImg} sx={{ width: 70, height: 70, marginRight: "15px" }} />
            <div>
              <Typography variant="h6" fontWeight="bold">{getuserdata.name}</Typography>
              <Typography variant="body1" color="textSecondary">{getuserdata.age}</Typography>
            </div>
          </div>

          {/* Contact & Work Info */}
          <div style={{marginTop:20}}>

            <Typography variant="body1" display="flex" alignItems="center"  sx={{ marginBottom: "10px" }}>
              <Email sx={{ marginRight: "10px", color: "#1976d2" }} /> <b>Email:</b> {getuserdata.email}
            </Typography>
            <Typography variant="body1" display="flex" alignItems="center" sx={{ marginBottom: "10px" }}>
              <Work sx={{ marginRight: "10px", color: "#1976d2" }} /> <b>Occupation:</b> {getuserdata.work}
            </Typography>
            <Typography variant="body1" display="flex" alignItems="center" sx={{ marginBottom: "10px" }}>
              <Phone sx={{ marginRight: "10px", color: "#1976d2" }} /> <b>Mobile:</b>{getuserdata.mobile}
            </Typography>
            <Typography variant="body1" display="flex" alignItems="center" sx={{ marginBottom: "10px" }}>
              <LocationOn sx={{ marginRight: "10px", color: "#1976d2" }} /> <b>Location:</b> {getuserdata.add}
            </Typography>
          </div>
          </div>

          {/* Description */}

          <Typography variant="body2" sx={{ marginTop: "20px", fontStyle: "italic", color: "#555" }}>
            <b>Description:</b>{getuserdata.desc}
          </Typography>

        </CardContent>
      </Card>
    </div>
    </>
  );
};

export default Detail;



import { Update } from '@mui/icons-material';
import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { updatadata } from './Context/Contextprovider';

const Edit = () => {
  const { update, setUPdata } = useContext(updatadata);
  const navigate = useNavigate();
  const { id } = useParams();

  const [getuserdata, setUserdata] = useState(null);
  const [intval, setInp] = useState({
    name: "",
    email: "",
    age: "",
    mobile: "",
    work: "",
    add: "",
    desc: "",
  });

  // ✅ Fetch User Data API
  const getdata = async () => {
    if (!id) return;
    try {
      console.log("Fetching data...");
      const res = await fetch(`http://localhost:8000/api/getuser/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });

      const data = await res.json();
      if (!res.ok) {
        console.error("Error fetching user:", res.status, data.message);
        return;
      }
      setUserdata(data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  // ✅ Fetch data when ID changes
  useEffect(() => {
    getdata();
  }, [id]);

  // ✅ Set input fields when user data is available
  useEffect(() => {
    if (getuserdata) {
      setInp({
        name: getuserdata.name || "",
        email: getuserdata.email || "",
        age: getuserdata.age || "",
        mobile: getuserdata.mobile || "",
        work: getuserdata.work || "",
        add: getuserdata.add || "",
        desc: getuserdata.desc || "",
      });
    }
  }, [getuserdata]);

  // ✅ Handle Input Change
  const setdata = (e) => {
    const { name, value } = e.target;
    setInp((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // ✅ Update User API
  const updateuser = async (e) => {
    e.preventDefault();
    const { name, email, age, mobile, add, work, desc } = intval;

    if (!name || !email || !mobile) {
      alert("Name, Email, and Mobile are required!");
      return;
    }

    try {
      const res = await fetch(`http://localhost:8000/api/updateuser/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, age, mobile, add, work, desc }) 
      });

      const data = await res.json();
      if (!res.ok) {
        // alert("Failed to update user");
        console.error("Update error:", res.status, data.message);
        return;
      }

      // alert("User updated successfully!");
      setUPdata(data);
      navigate("/");
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden"; // 
  
    return () => {
      document.body.style.overflow = "auto"; // 
    };
  }, []);
  

  return (
    <div className="edit-container">

    <div style={{ display: "flex", justifyContent: "center",  margintop:-12,alignItems: "center", minHeight: "100vh", backgroundColor: "#f8f9fa", padding: "20px" }}>
      <div style={{ width: "100%", maxWidth: "700px" , padding: "30px", borderRadius: "10px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", backgroundColor: "#fff" }}>
        <h2 style={{ fontSize: "32px", marginBottom: "20px", textAlign: "center" }}>Edit User</h2>

        <form style={{ display: "flex", flexDirection: "column", gap: "15px" }} onSubmit={updateuser}>
          <div style={{ display: "flex", gap: "10px" }}>
            <div style={{ flex: 1 }}>
              <label className="form-label">Name</label>
              <input type="text" value={intval.name} onChange={setdata} name="name" className="form-control" required />
            </div>
            <div style={{ flex: 1 }}>
              <label className="form-label">Email</label>
              <input type="email" value={intval.email} onChange={setdata} name="email" className="form-control" required />
            </div>
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <div style={{ flex: 1 }}>
              <label className="form-label">Age</label>
              <input type="number" value={intval.age} onChange={setdata} name="age" className="form-control" />
            </div>
            <div style={{ flex: 1 }}>
              <label className="form-label">Mobile</label>
              <input type="tel" value={intval.mobile} onChange={setdata} name="mobile" className="form-control" required />
            </div>
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <div style={{ flex: 1 }}>
              <label className="form-label">Work</label>
              <input type="text" value={intval.work} onChange={setdata} name="work" className="form-control" />
            </div>
            <div style={{ flex: 1 }}>
              <label className="form-label">Address</label>
              <input type="text" value={intval.add} onChange={setdata} name="add" className="form-control" />
            </div>
          </div>

          <div>
            <label className="form-label">Description</label>
            <textarea className="form-control" value={intval.desc} onChange={setdata} name="desc" rows="3"></textarea>
          </div>

          <button type="submit" className="btn btn-primary" style={{ fontSize: "20px", padding: "10px" }}>
            Update
          </button>
        </form>
        </div>
      </div>
    </div>
  );
};

export default Edit;

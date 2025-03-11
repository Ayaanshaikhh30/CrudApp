import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { adddata } from "./Context/Contextprovider";
import { useEffect } from "react";

const Register = () => {

  const {udata,setudata} = useContext(adddata);

  const navigate = useNavigate();
  const [intval, setInp] = useState({
    name: "",
    email: "",
    age: "",
    mobile: "",
    work: "",
    add: "",
    desc: "",
  });

  const [error, setError] = useState(""); 
  const [success, setSuccess] = useState(""); 

  const setdata = (e) => {
    const { name, value } = e.target;
    setInp((preval) => ({
      ...preval,
      [name]: value,
    }));
  };

  const addinpdata = async (e) => {
    e.preventDefault();
    setError(""); // Reset errors
    setSuccess("");

    const { name, email, work, add, mobile, desc, age } = intval;
    if (!name || !email || !work || !add || !mobile || !desc || !age) {
      setError("Please fill all fields.");
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, work, add, mobile, desc, age }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        return;
      }
        setSuccess("User registered successfully!");
      setTimeout(() => {
        navigate("/");
        setudata(data)
      }, 1500);
    } catch (error) {
      console.error("Fetch error:", error);
      setError("Server error, please try again later.");
    }
  };

   useEffect(() => {
      document.body.style.overflow = "hidden"; //
    
      return () => {
        document.body.style.overflow = "auto"; // 
      };
    }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f8f9fa",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "700px",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          backgroundColor: "#fff",
        }}
      >
        <h2
          style={{
            fontSize: "32px",
            marginBottom: "20px",
            textAlign: "center",
          }}
        >
          Register
        </h2>

        {/* ✅ Show Error Message */}
        {error && (
          <div
            style={{ color: "red", textAlign: "center", marginBottom: "10px" }}
          >
            {error}
          </div>
        )}

        {/* ✅ Show Success Message */}
        {success && (
          <div
            style={{
              color: "green",
              textAlign: "center",
              marginBottom: "10px",
            }}
          >
            {success}
          </div>
        )}

        <form style={{ display: "flex", flexDirection: "column", gap: "15px", }}>
          {/* Name & Email */}
          <div style={{ display: "flex", gap: "10px" }}>
            <div style={{ flex: 1 }}>
              <label className="form-label">Name</label>
              <input
                type="text"
                value={intval.name}
                onChange={setdata}
                name="name"
                className="form-control"
              />
            </div>
            <div style={{ flex: 1 }}>
              <label className="form-label">Email</label>
              <input
                type="email"
                value={intval.email}
                onChange={setdata}
                name="email"
                className="form-control"
              />
            </div>
          </div>

          {/* Age & Mobile */}
          <div style={{ display: "flex", gap: "10px" }}>
            <div style={{ flex: 1 }}>
              <label className="form-label">Age</label>
              <input
                type="number"
                value={intval.age}
                onChange={setdata}
                name="age"
                className="form-control"
              />
            </div>
            <div style={{ flex: 1 }}>
              <label className="form-label">Mobile</label>
              <input
                type="tel"
                value={intval.mobile}
                onChange={setdata}
                name="mobile"
                className="form-control"
              />
            </div>
          </div>

          {/* Work & Address */}
          <div style={{ display: "flex", gap: "10px" }}>
            <div style={{ flex: 1 }}>
              <label className="form-label">Work</label>
              <input
                type="text"
                value={intval.work}
                onChange={setdata}
                name="work"
                className="form-control"
              />
            </div>
            <div style={{ flex: 1 }}>
              <label className="form-label">Address</label>
              <input
                type="text"
                value={intval.add}
                onChange={setdata}
                name="add"
                className="form-control"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              value={intval.desc}
              onChange={setdata}
              name="desc"
              rows="3"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            onClick={addinpdata}
            className="btn btn-primary"
            style={{ fontSize: "20px", padding: "10px" }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;

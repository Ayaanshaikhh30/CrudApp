import React, { useEffect, useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { adddata, updatadata } from "./Context/Contextprovider";

const Home = () => {
  const [alertType, setAlertType] = useState("success"); 
  const { udata, setudata } = useContext(adddata);
  const { updata, setUPdata } = useContext(updatadata); // ✅ Corrected `updata`
  
 

  const [getuserdata, setUserdata] = useState([]);
  const [successAlert, setSuccessAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const deleteUser = async (id) => {
    try {
      const res = await fetch(`http://localhost:8000/api/deleteuser/${id}`, {
        method: "DELETE",
      });

      if (res.status === 200) {
        setUserdata((prev) => prev.filter((user) => user._id !== id));
        setAlertMessage("User deleted successfully!");
        setAlertType("danger");
        setSuccessAlert(true);
        setTimeout(() => setSuccessAlert(false), 3000);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const getdata = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/getdata", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (res.status === 200) setUserdata(data);
      else console.log("Error:", data.error);
    } catch (error) {
      console.error("Fetching data failed:", error);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  useEffect(() => {
    if (udata) {
      setAlertMessage("User added successfully!");
      setAlertType("success");
      setSuccessAlert(true);
      setTimeout(() => {
        setSuccessAlert(false);
        setudata(null);
      }, 5000);
    }
  }, [udata]);

  useEffect(() => {
    if (updata) {
      setAlertMessage("User updated successfully!");
      setAlertType("success");
      setSuccessAlert(true);
      setTimeout(() => {
        setSuccessAlert(false);
        setUPdata(null);
      }, 5000);
    }
  }, [updata]);

  return (
    <>
    {successAlert && (
      <div 
        className={`alert alert-${alertType} alert-dismissible fade show`} 
        role="alert"
        style={{
          position: "fixed",
          top: "56px",  // Navbar ke neeche set karne ke liye
          left: "50%",
          transform: "translateX(-50%)",
          width: "50%",
          zIndex: 1050,  // Navbar ke upar dikhne ke liye
        }}
      >
        <strong>{alertType === "danger" ? "Deleted!" : "Success!"}</strong> {alertMessage}
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
          onClick={() => setSuccessAlert(false)}
        ></button>
      </div>
    )}
    

      <div style={{ fontFamily: "cursive" }}>
        <div className="mt-5">
          <div className="container">
            <div className="add_btn mt-3">
              <NavLink to="/register">
                <button className="btn btn-primary">Add Data</button>
              </NavLink>
            </div>

            <table className="table">
              <thead>
                <tr className="table-info">
                  <th scope="col">Id</th>
                  <th scope="col">Username</th>
                  <th scope="col">Email</th>
                  <th scope="col">Job</th>
                  <th scope="col">Number</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {getuserdata.map((element, index) => (
                  <tr key={element._id}>
                    <th scope="row">{index + 1}</th>
                    <td>{element.name}</td>
                    <td>{element.email}</td>
                    <td>{element.work}</td>
                    <td>{element.mobile}</td>
                    <td className="d-flex gap-3">
                      <NavLink to={`view/${element._id}`}>
                        <button className="btn btn-success">
                          <i className="fa-solid fa-eye"></i>
                        </button>
                      </NavLink>
                      <NavLink to={`edit/${element._id}`}>
                        <button className="btn btn-primary">
                          <i className="fa-solid fa-pen"></i>
                        </button>
                      </NavLink>
                      <button className="btn btn-danger" onClick={() => deleteUser(element._id)}>
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;





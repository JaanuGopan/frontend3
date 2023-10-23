import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./filepassword.css";
import Navbarpass from "../../layout/Navbarpass";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Filepassword() {
  let navigate = useNavigate();
  const { id } = useParams();

  const [file, setFile] = useState();

  useEffect(() => {
    loadFiles();
  });
  const loadFiles = async () => {
    const result = await axios.get(`http://localhost:8080/fileapi/files/${id}`);
    setFile(result.data);
  };

  const [enteredFilePassword, setenteredFilePassword] = useState();

  const onInputChange = (e) => {
    setenteredFilePassword(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (file.filePassword === enteredFilePassword) {
      navigate(`/viewfile/${id}`);
    } else {
      toast.error("Please enter the correct file password..!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      //alert("Please enter the correct file password..!");
    }
  };

  return (
    <div className="filepassbackground">
      <Navbarpass />
      <div className="passfield">
        <div className="passinnerfield rounded">
          <form onSubmit={(e) => onSubmit(e)}>
            <h3>Protected File</h3>
            <form>
              <nav className="passinnerfieldinput">
                <label htmlFor="filepassword">Enter The File Password</label>
                <input
                  className="form-control"
                  type={"password"}
                  placeholder="file password"
                  value={enteredFilePassword}
                  onChange={(e) => onInputChange(e)}
                />
              </nav>
            </form>
            <button type="submit" className="btn3">
              <span>Submit</span>
              <i></i>
            </button>
          </form>
        </div>
      </div>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default Filepassword;

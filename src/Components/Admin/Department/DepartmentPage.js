import React, { useEffect, useState } from "react";
import "./dept.css";
import axios from "axios";
import { useNavigate, useNavigation } from "react-router-dom";

function DepartmentPage() {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
  const [bool, setBool] = useState(false);
  const [updatingBool, setUpdatingBool] = useState(false);
  const [updatingDepartment, setUpdatingDepartment] = useState();
  const [name, setName] = useState("");
  const [des, setDes] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("authTokenAdmin");
    axios
      .get("http://127.0.0.1:8000/department", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setDepartments(res.data);
      });
  }, []);

  function UpdateDepartment(id) {
    const department = departments.find((item) => item.id === id);
    setUpdatingDepartment(department);
    setBool(true);
  }

  function UpdateParticularDepartment() {
    const token = localStorage.getItem("authTokenAdmin");

    axios
      .put(
        `http://127.0.0.1:8000/department/${updatingDepartment.id}`,
        {
          dept_name: name,
          dept_description: des,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.statusText);
        if (res.statusText === "OK") {
          navigate("/department");
        }
      })
      .catch(() => {
        alert("Wrong password");
      });
  }

  function DeleteDept (){
    const token = localStorage.getItem("authTokenAdmin");
    axios
      .delete(
        `http://127.0.0.1:8000/department/${updatingDepartment.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.statusText);
        if (res.statusText === "OK") {
          navigate("/department");
        }
      })
      .catch(() => {
        navigate("/department");
      });
  }

  function DeleteDepartment(id) {
    const department = departments.find((item) => item.id === id);
    setUpdatingDepartment(department);
    setUpdatingBool(true);
  }
  return (
    <div>
      <div className="mainClass">
        <div className="dept1">
          {" "}
          <button className="AddNew" onClick={() => navigate("/add_dept")}>
            {" "}
            Add New Department
          </button>
        </div>
        <div className="tableTop">
          {bool ? (
            <div>
              <form className="updatingForm">
                <input
                  className="Updatingtextbox"
                  placeholder={updatingDepartment.dept_name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  type="text"
                  name=""
                  id=""
                />
                <input
                  className="Updatingtextbox"
                  placeholder={updatingDepartment.dept_description}
                  onChange={(e) => {
                    setDes(e.target.value);
                  }}
                  type="text"
                  name=""
                  id=""
                />
                <button onClick={UpdateParticularDepartment}>submit</button>
              </form>
            </div>
          ) : (
            <div className="tableMain">
              {updatingBool ? (
                <div>
                  <form className="customModalParent">
                    <div className="customModal">
                      <div>
                        <h3>Are you sure, do you want to delete this department</h3>
                      </div>
                      <div className="ModalOptions">
                        <div>
                          <button>Cancel</button>
                        </div>
                        <div>
                          <button onClick={DeleteDept} className="delete">Delete</button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              ) : (
                <table>
                  <tr>
                    <th>Department Name</th>
                    <th>Department Description</th>
                    <th></th>
                    <th></th>
                  </tr>
                  {departments.map((dept) => {
                    return (
                      <tr>
                        <td>{dept.dept_name}</td>
                        <td>{dept.dept_description}</td>
                        <td>
                          <button onClick={() => UpdateDepartment(dept.id)}>
                            Update
                          </button>
                        </td>
                        <td>
                          <button
                            onClick={() => DeleteDepartment(dept.id)}
                            className="delete"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </table>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DepartmentPage;

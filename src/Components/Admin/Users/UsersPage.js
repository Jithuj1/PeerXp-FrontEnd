import React, { useEffect, useState } from "react";
import "./users.css";
import axios from "axios";
import { useNavigate, useNavigation } from "react-router-dom";

function AddUser() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [bool, setBool] = useState(false);
  const [updatingUser, setUpdatingUser] = useState();
  const [dip, setDip] = useState();

  useEffect(() => {
    const token = localStorage.getItem("authTokenAdmin");
    axios
      .get("http://127.0.0.1:8000/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setUsers(res.data);
      });

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
    const user = users.find((item) => item.id === id);
    setUpdatingUser(user);
    setBool(true);
  }

  function UpdateParticularUser() {
    const token = localStorage.getItem("authTokenAdmin");
    axios
      .put(
        `http://127.0.0.1:8000/users/${updatingUser.id}`,
        {
          department: dip,
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
          navigate("/users");
        }
      })
      .catch(() => {
        alert("Enter Proper Department");
      });
  }
  return (
    <div>
      <div>
        <div className="mainClass">
          <div className="dept1">
            {" "}
            <button className="AddNew" onClick={() => navigate("/add_user")}>
              {" "}
              Add New User
            </button>
          </div>
          {bool ? (
            <div>
              <form className="updatingForm">
                <input
                  className="Updatingtextbox"
                  value={updatingUser.name}
                  type="text"
                  name=""
                  id=""
                />
                <select
                  className="updatingDepartmentNameBox"
                  onChange={(e) => {
                    setDip(e.target.value);
                  }}
                >
                  <option value="volvo">Select Department</option>
                  {departments &&
                    departments.map((dept) => {
                      return <option value={dept.id}>{dept.dept_name}</option>;
                    })}
                </select>
                <button onClick={UpdateParticularUser}>submit</button>
              </form>
            </div>
          ) : (
            <div className="tableTop">
              <div className="tableMain">
                <table>
                  <tr>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Department</th>
                    <th></th>
                  </tr>
                  {users.map((user) => {
                    return (
                      <tr>
                        <td>{user.name}</td>
                        <td>{user.phone}</td>
                        <td>{user.email}</td>
                        <td>{user.department.dept_name}</td>
                        <td>
                          <button onClick={() => UpdateDepartment(user.id)}>
                            Update Department
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddUser;

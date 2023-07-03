import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useNavigation } from "react-router-dom";

function Ticket() {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [bool, setBool] = useState(false);
  const [updatingTicketId, setUpdatingTicketId] = useState();

  useEffect(() => {
    const token = localStorage.getItem("authTokenAdmin");
    axios
      .get("http://127.0.0.1:8000/ticket", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setTickets(res.data);
      });
  }, []);

  function DeleteConfirm() {
    const token = localStorage.getItem("authTokenAdmin");
    axios
      .delete(`http://127.0.0.1:8000/ticket/${updatingTicketId.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.statusText === "OK") {
          navigate("/admin_ticket");
        }
      })
      .catch(() => {
        alert('Unable to delete')
      });
  }


  function DeleteTicket(id) {
    const ticket = tickets.find((item) => item.id === id);
    setUpdatingTicketId(ticket);
    setBool(true);
  }


  return (
    <div>
      <div className="mainClass">
        <div className="dept1">
          {" "}
          <button
            className="AddNew"
            onClick={() => navigate("/admin_add_ticket")}
          >
            {" "}
            Add New Ticket
          </button>
        </div>
        <div className="tableTop">
          <div className="tableMain">
            {bool ? (
              <div>
                <form className="customModalParent">
                  <div className="customModal">
                    <div>
                      <h3>
                        Are you sure, do you want to delete this department
                      </h3>
                    </div>
                    <div className="ModalOptions">
                      <div>
                        <button>Cancel</button>
                      </div>
                      <div>
                        <button onClick={DeleteConfirm} className="delete">
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            ) : (
              <div>
                <div className="ticketHeading"> All ticket issued</div>
                <table>
                  <tr>
                    <th>Name of user</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Subject</th>
                    <th>Body</th>
                    <th>Priority</th>
                    <th></th>
                  </tr>
                  {tickets.map((ticket) => {
                    return (
                      <tr>
                        <td>{ticket.user.name}</td>
                        <td>{ticket.user_phone}</td>
                        <td>{ticket.user_email}</td>
                        <td>{ticket.subject}</td>
                        <td>{ticket.body}</td>
                        <td>{ticket.priority}</td>
                        <td>
                          <button
                            onClick={() => DeleteTicket(ticket.id)}
                            className="delete"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </table>
              </div>
            )}
          </div>
          {/* )} */}
        </div>
      </div>
    </div>
  );
}

export default Ticket;

import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';


import { Link } from "react-router-dom";
import axios from "axios";

export function SignIn() {

    const signvalid = async (event) => {
        event.preventDefault();

        var datastring = new FormData(event.target);
        var config = { headers: { 'enctype': 'multipart/form-data' } }

        var username = document.getElementById('username_inp').value;
        var password = document.getElementById('password').value;

        if (username === '' || username === null) {
            alert("User Name cannot be empty");
        }
        else if (password === '' || password === null) {
            alert("Password cannot be empty")
        }
        else {
            await axios.post('http://localhost:3002/SignIn', datastring, config)
                .then(function (res) {
                    if (res.data.status === "username_error") {
                        alert("User Name error")
                        window.location.reload();
                    }
                    else if (res.data.status === "invalid_login") {
                        alert("Invalid Login")
                    }
                    else if (res.data.status === "login_success") {
                        if (res.data.role === "end_user") {
                            alert("end_user Logined")
                            window.location.reload(false);
                        }
                        
                        else {
                            alert("Please enter details again");
                        }
                    }

                })
                .catch(function (err) {
                    alert(err);



                })
        }
    }


    return (
        <>
            <div className="container-fluid">
               
                <div className="row">

                    <div className="col-lg-4">&nbsp;</div>
                    <div className="col-lg-4">
                        <form onSubmit={signvalid}>
                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <td colSpan={2}>
                                                signin
                                            </td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="mt-5" >
                                                <input type="text" name="username_inp" id="username_inp" className="form-control" placeholder="Enter your Username" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td >
                                                <input type="password" name="password" id="password" className="form-control" placeholder="Enter Password" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <button type="submit" id="signin_btn" name="signin_btn" className="btn btn-outline-info btn-block">submit</button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                 <Link to="/"> 
                                                    <button type="submit" id="signup_btn" name="signup_btn" className="btn btn-outline-info btn-block">SignIn</button>
                                                     </Link>
                                            </td>
                                        </tr>
                                    </tbody>

                                </table>
                            </div>
                        </form>
                    </div>
                    <div className="col-lg-4">
                       
                    </div>
                    



                </div>



            </div>

        </>
    )
}
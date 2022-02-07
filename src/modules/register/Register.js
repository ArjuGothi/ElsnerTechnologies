import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import { useSelector, connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import { addUsersAction } from '../../redux/modules/users/users.actions';

import '../login/Login.css';

const RegisterPage = (props) => {

    const { addUsersAction } = props;

    const [authObj, setAuthObj] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [invalidemail, setInvalidemail] = useState(false);
    const [authLoading, setAuthLoading] = useState(false);
    const [redirectVar, setRedirectVar] = useState(false);
    const [addSucces, setAddSuccess] = useState(false);

    const usersDatResp = useSelector((state) => (
        state.Users.AddUserData ? state.Users.AddUserData : []
    ));

    useEffect(() => {
        if (usersDatResp.hasOwnProperty('id') && addSucces) {
            let data = JSON.parse(localStorage.getItem('allUserData')) || [];
            data.unshift({...usersDatResp, id: data.length + 1});
            localStorage.setItem('allUserData', JSON.stringify(data));
            setAuthLoading(true);
            setSubmitted(false);
            setAuthLoading(false);
            setAddSuccess(false);
            setRedirectVar(true);;
        }

    }, [usersDatResp]);

    const setDataForAuth = (value, name) => {
        if (name === 'email') {
            let re = /[^@]+@[^@]+\.[^@]+/;
            if (re.test(value)) {
                authObj[name] = value;
                setAuthObj({ ...authObj });
                setInvalidemail(false);
            } else {
                authObj[name] = value;
                setAuthObj({ ...authObj });
                setInvalidemail(true);
            }
        } else {
            authObj[name] = value;
            setAuthObj({ ...authObj });
        }
    }

    const submit = () => {
        setSubmitted(true);
        if (!authObj.password || !authObj.email || invalidemail) {
            return;
        } else {
            let data = JSON.parse(localStorage.getItem('allUserData')) || [];
            if(data.findIndex(x => x.email.toLowerCase() === authObj.email.toLowerCase()) === -1){
                setAddSuccess(true);
                addUsersAction(authObj);
            } else {
                window.alert('Email already in use');
            }
        }

    }

    if (redirectVar) {
        return (<Redirect to="/" replace />);
    }

    return (
        <div className="signinWrapper">
            <div className="loginPage">
                <div className="loginLbl">Sign Up</div>
                <div className="spacing">
                    <div className="inputLable">
                        <label>Email</label>
                    </div>
                    <input
                        onChange={e => setDataForAuth(e.target.value, "email")}
                        autoComplete="off"
                        className="input"
                        placeholder="Enter email"
                        value={authObj.email ? authObj.email : ""}
                    />
                    {invalidemail && (
                        <div className="errorMsg">Enter a valid email</div>
                    )}
                    {submitted && !authObj.email && (
                        <div className="errorMsg">
                            Email is required<sup>*</sup>
                        </div>
                    )}
                </div>

                <div className="spacing">
                    <div className="inputLable">
                        <label>Password</label>
                    </div>
                    <input
                        onChange={e => setDataForAuth(e.target.value, "password")}
                        autoComplete="off"
                        className="input"
                        type="password"
                        placeholder="Enter password"
                        value={authObj.password ? authObj.password : ""}
                    />
                    {submitted && !authObj.password && (
                        <div className="errorMsg">
                            Password is required<sup>*</sup>
                        </div>
                    )}
                </div>

                

                <div className="spacing">
                    <button className="button" onClick={() => submit()}>
                        {authLoading ? (
                            <i className="fa fa-spinner fa-spin" size="sm"></i>
                        ) : null}{" "}
                        Sign Up
                    </button>
                </div>
                <div className="spacing">
                    <Link to="/">Login</Link>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    AddUserData: state.Users.AddUserData,
}
);

const mapDispatchToProps = (dispatch) => bindActionCreators(
    {
        addUsersAction,
    }, dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
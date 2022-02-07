import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import { useSelector, connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import { getAllUsersAction } from '../../redux/modules/users/users.actions';

import './Login.css';

const LoginPage = (props) => {

    const { getAllUsersAction } = props;

    const [authObj, setAuthObj] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [invalidemail, setInvalidemail] = useState(false);
    const [authLoading, setAuthLoading] = useState(false);
    const [redirectVar, setRedirectVar] = useState(false);
    const [usersData, setUsersData] = useState([]);
    const [errorMsg, setErrorMsg] = useState(false);
    const [getAllSuccess, setGetAllSuccess] = useState(false);

    useEffect(() => {
        if(!localStorage.getItem('allUserData')){
            setGetAllSuccess(true);
            getAllUsersAction();
          } else {
            setUsersData(JSON.parse(localStorage.getItem('allUserData')));
          }
        
    }, [])

    const usersDatResp = useSelector((state) => (
        state.Users.GetAllUserData ? state.Users.GetAllUserData : []
    ));

    useEffect(() => {
        if (usersDatResp.length > 0 && getAllSuccess) {
            setUsersData(usersDatResp);
            localStorage.setItem('allUserData', JSON.stringify(usersDatResp));
            setGetAllSuccess(false);
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
            let isExist = usersData.findIndex(x => x.email.toString().toLowerCase() === authObj.email.toString().toLowerCase());
            if (isExist !== -1) {
                localStorage.setItem('userData', JSON.stringify(usersData[isExist]));
                setAuthLoading(true);
                setSubmitted(false);
                setAuthLoading(false);
                setRedirectVar(true);
                setErrorMsg(false)
            } else {
                setErrorMsg(true);
            }
        }

    }

    if (redirectVar) {
        return (<Redirect to="/home/" replace />);
    }

    return (
        <div className="signinWrapper">
            <div className="loginPage">
                <div className="loginLbl">Sign In</div>
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

                {errorMsg && (
                    <div className="errorMsg">
                        User does not exist
                    </div>
                )}

                <div className="spacing">
                    <button className="button" onClick={() => submit()}>
                        {authLoading ? (
                            <i className="fa fa-spinner fa-spin" size="sm"></i>
                        ) : null}{" "}
                        Sign In
                    </button>
                </div>
                <div className="spacing">
                    <Link to="/register">Register new user</Link>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    GetAllUserData: state.Users.GetAllUserData,
}
);

const mapDispatchToProps = (dispatch) => bindActionCreators(
    {
        getAllUsersAction,
    }, dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
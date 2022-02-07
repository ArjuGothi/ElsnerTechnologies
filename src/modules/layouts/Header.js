import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './Layouts.css';

const Header = () => {
    const [userObj, setUserObj] = useState({});

    useEffect(()=>{
        setUserObj(JSON.parse(localStorage.getItem('userData')));
    },[])

    return (
        <div className="headerMain">
            <h3>Blogs</h3>
            <div className="logoutPart">
                <Link to={`/`}>
                    <i className="fa fa-sign-out logoutIcon" aria-hidden="true"></i>
                </Link>
                <div className="emailDetail"><span className="userEmail">Login as: </span>{userObj.email}&nbsp;&nbsp;{`(UserId: ${userObj.id})`}</div>
            </div>
        </div>
    )
}

export default Header;
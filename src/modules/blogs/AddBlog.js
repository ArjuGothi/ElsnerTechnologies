import React, { useState, useEffect } from "react"
import { Redirect, useParams } from "react-router";
import { Link } from "react-router-dom";
import { connect, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
    addBlogAction, editBlogAction
} from '../../redux/modules/blogs/blogs.actions';

import './BlogLists.css';

const AddBlogPage = (props) => {

    const { addBlogAction, editBlogAction } = props;

    const { id } = useParams();
    const [singleObj, setSingleObj] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [redirectVar, setRedirectVar] = useState(false);
    const [addSuccess, setAddSuccess] = useState(false);

    useEffect(() => {
        if (id) {
            setSingleObj(JSON.parse(localStorage.getItem('blogData')));
        }

        return () => {
            localStorage.removeItem('blogData');
        };
        // eslint-disable-next-line
    }, [id]);

    // Add blogs data
    const addBlogsDatResp = useSelector((state) => (
        state.Blogs.AddBlog ? state.Blogs.AddBlog : []
    ));

    useEffect(() => {
        if (addBlogsDatResp.hasOwnProperty('id') && addSuccess) {
            let data = JSON.parse(localStorage.getItem('allBlogs')) || [];
            data.unshift({...addBlogsDatResp, id: data.length + 1});
            localStorage.setItem('allBlogs', JSON.stringify(data));
            setSubmitted(false);
            setAddSuccess(false);
            setRedirectVar(true);
        }
    }, [addBlogsDatResp]);

    const setData = (value, name) => {
        singleObj[name] = value;
        setSingleObj({ ...singleObj });
    }

    const submit = () => {
        setSubmitted(true);
        if (!singleObj.title || !singleObj.body) {
            return
        } else {
            let data = JSON.parse(localStorage.getItem('allBlogs')) || [];
            if (id) {
                data.splice(data.findIndex(x => x.id === singleObj.id), 0, singleObj);
                localStorage.setItem('allBlogs', JSON.stringify(data));
                setSubmitted(false);
                setRedirectVar(true);
                // editBlogAction({ ...singleObj, userId: JSON.parse(localStorage.getItem('userData')).id }); 
            } else {
                setAddSuccess(true);
                addBlogAction({ ...singleObj, userId: JSON.parse(localStorage.getItem('userData')).id });
            }
        }

    }

    if (redirectVar) {
        return (<Redirect to="/home/" replace />);
    }

    return (
        <div className="blogWrapper">
            <div className="Addlbl">{id ? 'Edit Blog' : 'Add Blog'}</div>
            <div className="formContent">
                <div className="spacing">
                    <div className="formsGroup">
                        <label className="addBlogLBL">Title: </label>
                        <div style={{ width: "100%" }}>
                            <input
                                onChange={e => setData(e.target.value, "title")}
                                autoComplete="off"
                                className="input"
                                placeholder="Enter title"
                                value={singleObj.title ? singleObj.title : ""}
                            />
                            {submitted && !singleObj.title && (
                                <div className="errorMsg">
                                    Title is required<sup>*</sup>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
                <div className="spacing">
                    <div className="formsGroup">
                        <label className="addBlogLBL">Description: </label>
                        <div style={{ width: "100%" }}>
                            <textarea
                                onChange={e => setData(e.target.value, "body")}
                                autoComplete="off"
                                className="textarea"
                                placeholder="Enter description"
                                value={singleObj.body ? singleObj.body : ""}
                            />
                            {submitted && !singleObj.body && (
                                <div className="errorMsg">
                                    Description is required<sup>*</sup>
                                </div>
                            )}
                        </div>
                    </div>

                </div>

                <div className="spacing">
                    <div className="formsGroup">
                        <label className="addBlogLBL"></label>
                        <div className="displyFlex" style={{ width: "100%" }}>
                            <button className="addBtn" onClick={() => submit()}>
                                {id ? 'Edit Blog' : 'Add Blog'}
                            </button>
                            <Link to={`/home/`}>
                                <button className="addBtn" style={{ marginLeft: "5px" }}>
                                    Cancel
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    AddBlog: state.Blogs.AddBlog,
    EditBlog: state.Blogs.EditBlog
}
);

const mapDispatchToProps = (dispatch) => bindActionCreators(
    {
        addBlogAction,
        editBlogAction
    }, dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(AddBlogPage);
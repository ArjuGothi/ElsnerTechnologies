import React, { useState, useEffect } from 'react';
import { useSelector, connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';

import {
  getAllBlogDataAction, deleteBlogAction
} from '../../redux/modules/blogs/blogs.actions';

import './BlogLists.css';


const BlogsList = (props) => {
  const { getAllBlogDataAction, deleteBlogAction } = props;
  const [blogsData, setAllBlogsData] = useState([]);
  const [userObj, setUserObj] = useState({});
  const [editTrue, setEditTrue] = useState(false);
  const [blogId, setBlogId] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [getAllSuccess, setGetAllSuccess] = useState(false);

  useEffect(() => {
    if(!localStorage.getItem('allBlogs')){
      setGetAllSuccess(true);
      getAllBlogDataAction();
    } else {
      setAllBlogsData(JSON.parse(localStorage.getItem('allBlogs')));
    }
    setUserObj(JSON.parse(localStorage.getItem('userData')));

    // eslint-disable-next-line
  }, []);

  // Get all blogs data
  const blogsDatResp = useSelector((state) => (
    state.Blogs.GetAllBlogData ? state.Blogs.GetAllBlogData : []
  ));

  useEffect(() => {
    if (blogsDatResp.length > 0 && getAllSuccess) {
      localStorage.setItem('allBlogs',JSON.stringify(blogsDatResp));
      setAllBlogsData(blogsDatResp);
      setGetAllSuccess(false);
    }
  }, [blogsDatResp]);

  // Delete blog data
  const deleteBlogResp = useSelector((state) => (
    state.Blogs.DeleteBlog ? state.Blogs.DeleteBlog : []
  ));

  useEffect(() => {
    if (deleteBlogResp && deleteConfirm) {
      setDeleteConfirm(false);
      blogsData.splice(blogsData.findIndex(x => x.id === blogId), 1);
      setAllBlogsData([...blogsData]);
      localStorage.setItem('allBlogs',JSON.stringify(blogsData));
    }
  }, [deleteBlogResp]);

  const checkIsSameUser = (id, type, obj) => {
    if (userObj.id.toString() === id.toString()) {
      setBlogId(obj.id);
      if (type === 'edit') {
        localStorage.setItem('blogData', JSON.stringify(obj));
        setEditTrue(true);
      } else {
        let a = window.confirm('Are you sure you want to remove this blog?');
        if (a) {
          setDeleteConfirm(true);
          deleteBlogAction(obj.id);
        }
      }
    }
  }

  if (editTrue) {
    return (<Redirect to={`/home/editBlog/${blogId}`} replace />);
  }

  return (
    <div className="blogWrapper">
      <div className="addBlogs"><Link to={`/home/addBlog`}><button className="addBlogButton">Add Blog</button></Link></div>
      <div className="blogContainer">
        {blogsData && blogsData.length > 0 && blogsData.map((a, i) => (
          <div key={i} className="blogBox">
            <div className='flexItem'>
              <h4 className="blogTitle">{a.title}&nbsp;{`(userId - ${a.userId})`}</h4>
              <div>
                <span className='fa fa-edit cursorPointer' onClick={() => checkIsSameUser(a.userId, 'edit', a)}></span>
                <span className='fa fa-trash marginLeft cursorPointer' onClick={() => checkIsSameUser(a.userId, 'delete', a)}></span>
              </div>
            </div>
            <div className="blogDescription">{a.body}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  GetAllBlogData: state.Blogs.GetAllBlogData,
  DeleteBlog: state.Blogs.DeleteBlog
}
);

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    getAllBlogDataAction,
    deleteBlogAction,
  }, dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(BlogsList);

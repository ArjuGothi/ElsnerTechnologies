import React from 'react';
import {
  Router,
  Route,
  Switch,
} from 'react-router-dom';
import BlogsList from './blogs/BlogLists';
import AddBlogPage from './blogs/AddBlog';
import Header from './layouts/Header';
import Footer from './layouts/Footer';

const PageRouter = (props) => (
  <div className="fullHeight">
    <Header />
    <div className='contentWrapper'>
      <Router history={props.history}>
        <Switch>
          <Route exact path="/home/" component={BlogsList} />
          <Route exact path="/home/addBlog" component={AddBlogPage} />
          <Route exact path="/home/editBlog/:id" component={AddBlogPage} />
        </Switch>
      </Router>
    </div>
    <Footer />
  </div>
);

export default PageRouter;

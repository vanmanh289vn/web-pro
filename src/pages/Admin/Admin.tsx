import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch } from 'react-router';
import { AppState } from '../../store';
import { FileUpload } from './FileUpload/FileUpload';
import { Home } from './Home/Home';
// import { useDispatch } from 'react-redux';
// import { getCurrentLoginUser } from '../../store/account/actions';
import { LeftMenu } from './LeftMenu/LeftMenu';
import { TopBar } from './TopBar/TopBar';
import { AddUser } from './Users/AddUser';
import { EditUser } from './Users/EditUser';
import { Users } from './Users/Users';

export const Admin = () => {

  const alert = useSelector((state: AppState) => state.alert);

  return (
    <Fragment>
      <LeftMenu />
      {/* Content Wrapper */}
      <div id='content-wrapper' className='d-flex flex-column'>
        {/* Main Content */}
        <div id='content'>
          <TopBar />
          {/* Begin Page Content */}
          <div className='container-fluid'>
            {alert.message && (
              <div className={`alert ${alert.type}`}>{alert.message}</div>
            )}
            <Switch>
              <Route path='/file-upload'>
                <FileUpload />
              </Route>
              <Route path='/users'>
                <Users />
              </Route>
              <Route path='/user-add'>
                <AddUser />
              </Route>
              <Route path='/user-edit/:id'>
                <EditUser />
              </Route>
              <Route path='/'>
                <Home />
              </Route>
            </Switch>
          </div>
          {/* /.container-fluid */}
        </div>
        {/* End of Main Content */}
        {/* Footer */}
        <footer className='sticky-footer bg-white'>
          <div className='container my-auto'>
            <div className='copyright text-center my-auto'>
              <span>Copyright © Your Website 2020</span>
            </div>
          </div>
        </footer>
        {/* End of Footer */}
      </div>
      {/* End of Content Wrapper */}
    </Fragment>
  );
};

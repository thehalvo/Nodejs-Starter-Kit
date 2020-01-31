import React from 'react';

import ClientModule from '@gqlapp/module-client-react';
import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import loadable from '@loadable/component';

import { Route, NavLink } from 'react-router-dom';
import { MenuItem } from '@gqlapp/look-client-react';
import resources from './locales';

import { AuthRoute, IfLoggedIn } from '@gqlapp/user-client-react/containers/Auth.web';

const NavLinkWithI18n = translate('blog')(({ t }: { t: TranslateFunction }) => (
  <NavLink to="/blog/new" className="nav-link" activeClassName="active">
    {'Add New Blog'}
  </NavLink>
));
const NavLinkMyBlogsWithI18n = translate('blog')(({ t }: { t: TranslateFunction }) => (
  <NavLink to="/blog/my-blogs" className="nav-link" activeClassName="active">
    {'My Blogs'}
  </NavLink>
));
const NavLinkBlogWithI18n = translate('blog')(({ t }: { t: TranslateFunction }) => (
  <NavLink to="/blog/list" className="nav-link" activeClassName="active">
    {'All Blogs'}
  </NavLink>
));
const NavLinkMyBookmarksWithI18n = translate('blog')(({ t }: { t: TranslateFunction }) => (
  <NavLink to="/blog/bookmarks" className="nav-link" activeClassName="active">
    {'My Bookmarks'}
  </NavLink>
));
const NavLinkBlogAdminWithI18n = translate('blog')(({ t }: { t: TranslateFunction }) => (
  <NavLink to="/blog/admin-list" className="nav-link" activeClassName="active">
    {'Blogs (Admin)'}
  </NavLink>
));

export default new ClientModule({
  route: [
    <AuthRoute
      exact
      path="/blog/new"
      redirect="/profile"
      role={['user', 'admin']}
      component={loadable(() => import('./containers/NewBlog').then(c => c.default))}
    />,
    <AuthRoute
      exact
      path="/blog/edit/:id"
      redirect="/profile"
      role={['user', 'admin']}
      component={loadable(() => import('./containers/EditBlog').then(c => c.default))}
    />,
    <AuthRoute
      exact
      path="/blog/my-blogs"
      redirect="/profile"
      role={['user', 'admin']}
      component={loadable(() => import('./containers/MyBlogs').then(c => c.default))}
    />,
    <AuthRoute
      exact
      path="/blog/bookmarks"
      redirect="/profile"
      role={['user', 'admin']}
      component={loadable(() => import('./containers/MyBookmarks').then(c => c.default))}
    />,
    <Route exact path="/blog/list" component={loadable(() => import('./containers/BlogList').then(c => c.default))} />,
    <AuthRoute
      exact
      path="/blog/admin-list"
      redirect="/profile"
      role={['admin']}
      component={loadable(() => import('./containers/AdminBlogs').then(c => c.default))}
    />,
    <Route
      exact
      path="/blog/@:username"
      component={loadable(() => import('./containers/UserBlogs').then(c => c.default))}
    />,
    <Route exact path="/blog/:id" component={loadable(() => import('./containers/Blog').then(c => c.default))} />
  ],
  navItemsBlog: [
    <IfLoggedIn key="/blog/new">
      <MenuItem key="/blog/new">
        <NavLinkWithI18n />
      </MenuItem>
    </IfLoggedIn>,
    <MenuItem key="/blog/list">
      <NavLinkBlogWithI18n />
    </MenuItem>,
    <IfLoggedIn key="/blog/admin-list" role="admin">
      <MenuItem>
        <NavLinkBlogAdminWithI18n />
      </MenuItem>
    </IfLoggedIn>,
    <IfLoggedIn key="/blog/my-blogs">
      <MenuItem>
        <NavLinkMyBlogsWithI18n />
      </MenuItem>
    </IfLoggedIn>,
    <IfLoggedIn key="/blog/bookmarks">
      <MenuItem key="/blog/bookmarks">
        <NavLinkMyBookmarksWithI18n />
      </MenuItem>
    </IfLoggedIn>
  ],
  localization: [{ ns: 'blog', resources }]
});

import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <ul>
        <li> 
          <Link style={{ textDecoration: 'none', color: 'inherit' }} to="/">List</Link>
        </li>
        <li><Link style={{ textDecoration: 'none', color: 'inherit' }} to="/my-pokemon">Bookmark</Link></li>
      </ul>
    </aside>
  );
};

export default Sidebar;

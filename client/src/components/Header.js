import React, { useState } from "react";
import HighlightIcon from "@material-ui/icons/Highlight";
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import "./Header.css";
import { useEffect } from "react";
// import * as EmailValidator from 'email-validator';

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/');
  };

  const [show,setshow] = useState(false);

  useEffect(() => {

    const token = localStorage.getItem('userInfo');
    if (token){
      setshow(true);
    }
    else{
      setshow(false);
    }

  }, []);
  
 
  return (
    <header className="header">
      <div className="header-center">
        <h1>
          <HighlightIcon className="highlight-icon" />
          Keeper
        </h1>
      </div>
      <div className="header-right">
        {show && <div><LogoutIcon className="logout-icon" onClick={handleLogout} /></div>}
      </div>
    </header>
  );
}

export default Header;

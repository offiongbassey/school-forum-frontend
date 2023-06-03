import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../../services/authService';
import { useDispatch, useSelector} from "react-redux";
import { selectUser, SET_LOGIN, SET_NAME, SET_ROLE, SET_PHOTO, SET_USERNAME, selectUserName } from '../../redux/features/auth/authSlice';
import { selectName, selectRole, selectPhoto } from '../../redux/features/auth/authSlice';
import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser';



const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const role = useSelector(selectRole);
  const photo = useSelector(selectPhoto);
  const userName = useSelector(selectUserName);
  
  useRedirectLoggedOutUser("/login");
  const logout = async () => {
  await logoutUser();
  // await dispatch(SET_USER(''));
  await dispatch(SET_NAME(''));
  await dispatch(SET_ROLE(''));
  await dispatch(SET_PHOTO(''));
  await dispatch(SET_USERNAME(''));
  await dispatch(SET_LOGIN(false));
  navigate("/login");

  }
  return (
    <div className='header-profile'>
            <div class="btn-group dropstart-profile">
            <div data-bs-toggle="dropdown" aria-expanded="false" className='header-profile-pic'>
                    <img src={photo} alt="profilepic" />
                </div>
                      <ul class="dropdown-menu drop-down-icon">
                          <li><p>{userName}</p></li>
                          <li>{role}</li>
                          {/* <li><p>{profile?.firstName}</p></li> */}
                          <li>{role === "Admin" && (
                            <Link to="/admin/profile" class="dropdown-item"> Profile</Link>
                            )}
                            {role === "Lecturer" && (
                            <Link to="/profile" class="dropdown-item"> Profile</Link>
                            )}
                            {role === "Student" && (
                            <Link to="/account/profile" class="dropdown-item"> Profile</Link>
                            )}
                            </li>
                          <li><Link onClick={logout} class="dropdown-item">Logout</Link></li>
                       </ul>
              </div>
        <hr/>
        <br/>
        <br />
    </div>
  )
}

export default Header

import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/counter/userSlice';
import { auth } from '../firebase';
import Navbar from '../Navbar';
import './ProfileScreen.css'


function ProfileScreen() {

    // importing user details from the redux store to display email
    const user = useSelector(selectUser);

    return (
        <div className="profileScreen">
            <Navbar />
            <div className="profileScreen-body">
                <h1>Edit Profile</h1>
                <div className="profileScreen-info">

                    <img
                        src="https://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn_400x400.png"
                        alt="profile"
                    />

                    <div className="profileScreen-details">
                        <h2>{user.email}</h2>
                        <div className="profileScreen-plans">
                            <button
                                onClick={() => auth.signOut()}
                                className="profileScreen-signOut"
                            >
                                Sign Out</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileScreen

import React from 'react';
import User from './User';
import { useSelector } from "react-redux";

const UserList = () => {
    const userData = useSelector(state => state.users);

    return (
        <div className="users-list">
            {userData.map(user => (
                <div className="user" key={user.id} id={user.id}>
                    <User
                        id={user.id}
                        person={user}
                    />
                </div>
            ))}
        </div>
    )
};

export default UserList;
import * as React from 'react';
import { User } from './User';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const UserList: React.FC = () => {
	const userData = useSelector((state: RootState) => state.users);

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
	);
};

export default UserList;

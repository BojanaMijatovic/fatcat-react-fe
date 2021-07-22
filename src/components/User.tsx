import * as React from 'react';
import Field from './Field';

interface Props	{
	id: string,
	person:
		{
			id: string,
			isActive: boolean,
			picture: string,
			age: number,
			name: string,
			email: string,
			address: string,
			about: string
			[item: string]: any
		}
}

const User: React.FC<Props> = ({ person }) => {
	return (
		<>
			{Object.keys(person).map((item: string, i: number) => (
				<Field
					key={`${item}${person.id}`}
					index={i}
					userId={person.id}
					name={item}
					value={person[item]}
				/>
			))}
		</>
	);
};

export { User };

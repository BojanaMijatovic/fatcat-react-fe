import React from 'react';
import Field from './Field';

const User = (props) => {
    return (
        <React.Fragment>
            {Object.keys(props.person).map((item, i) => (
                <Field
                    key={i}
                    index={i}
                    userId={props.id}
                    name={item}
                    value={props.person[item]}
                />
            ))}
        </React.Fragment>
    )
}

export default User;

import * as React from 'react';
import { editField } from '../redux/userSlice';
import { connect } from 'react-redux';

class Field extends React.Component <{
	key: string,
	index: number,
	userId: string,
	name: string,
	value: any,
	editField: any
}, any> {
	constructor(props: any) {
		super(props);
		this.state = {
			value: props.value,
			name: props.value,
		};
	}

	handleBlur(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | React.MouseEvent<HTMLInputElement, MouseEvent>): void {
		const { value } = e.currentTarget;
		const { userId: id, name: userName } = this.props;
		// eslint-disable-next-line react/destructuring-assignment
		this.props.editField({ id, userName, value });
	}

	onChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | React.MouseEvent<HTMLInputElement, MouseEvent>): void {
		const { value } = e.currentTarget;

		this.setState({ value });
	}

	createField() {
		let type = '';
		let field: React.ReactElement | string = '';
		const { value } = this.state;
		const { userId, name, index } = this.props;

		const emailFormat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		const dateFormat = /(\d{4})([/-])(\d{1,2})\2(\d{1,2})/;
		const urlFormat = /(^http[s]?:\/{2})|(^www)|(^\/{1,2})/;

		if (value !== undefined && value !== null) {
			switch (typeof value) {
			case 'string':
				if (emailFormat.test(value)) {
					type = 'email';
				} else if (dateFormat.test(value)) {
					type = 'date';
				} else if (urlFormat.test(value)) {
					type = 'url';
				} else if (value.length > 255) {
					type = 'textarea';
				} else if (value === 'true' || value === 'false') {
					type = 'radio';
				} else {
					type = 'text';
				}
				if (name === 'id') {
					field = '';
				} else if (type === 'textarea') {
					field = (
						<>
							<label htmlFor={`${name}-${userId}`}>
								Field editing:
								{' '}
								{name}
							</label>
							<textarea id={`${name}-${userId}`} value={value} onChange={e => this.onChange(e)} />
						</>
					);
				} else if (type === 'radio') {
					field = (
						<>
							<label htmlFor={`${name}-true`}>
								True
								<input
									id={`${name}-true`}
									name={name}
									type={type}
									value="true"
									onClick={e => this.onChange(e)}
									onChange={e => this.handleBlur(e)}
								/>
							</label>
							<label htmlFor={`${name}-false`}>
								False

								<input
									id={`${name}-false`}
									name={name}
									type={type}
									value="false"
									onClick={e => this.onChange(e)}
									onChange={e => this.handleBlur(e)}
								/>
							</label>
						</>
					);
				} else {
					field = (
						<>
							<label htmlFor={`${name}-${userId}`}>
								Please enter:
								{name}
							</label>
							<input
								type={type}
								id={`${name}-${userId}`}
								value={value}
								onChange={e => this.onChange(e)}
								onBlur={e => this.handleBlur(e)}
							/>
						</>
					);
				}
				break;
			case 'number':
				type = 'number';
				field = (
					<>
						<label htmlFor={`${name}-${userId}`}>
							Please enter:
							{name}
						</label>
						<input
							type={type}
							id={`${name}-${userId}`}
							value={value}
							onChange={e => this.onChange(e)}
							onBlur={e => this.handleBlur(e)}
						/>
					</>
				);
				break;
			case 'boolean':
				if (value === true || value === false) {
					type = 'radio';
					field = (
						<>
							<label htmlFor={`${name}-true`}>
								True
								<input
									id={`${name}-true`}
									name={name}
									type={type}
									value="true"
									onClick={e => this.onChange(e)}
									onChange={e => this.handleBlur(e)}
								/>
							</label>
							<label htmlFor={`${name}-false`}>
								False

								<input
									id={`${name}-false`}
									name={name}
									type={type}
									value="false"
									onClick={e => this.onChange(e)}
									onChange={e => this.handleBlur(e)}
								/>
							</label>
						</>
					);
				}
				break;
			default:
				type = 'text';
				field = (
					<>
						<label htmlFor={`${name}-${userId}`}>
							Please enter:
							{name}
						</label>
						<input
							type={type}
							id={`${name}-${userId}`}
							value={value}
							onChange={e => this.onChange(e)}
							onBlur={e => this.handleBlur(e)}
						/>
					</>
				);
				break;
			}
		}

		return field;
	}

	render() {
		const field = this.createField();
		const { value, name } = this.state;

		return (
			<div className="user-field__wrapper">
				<div className="user-field__display">
					<div className="user-field__display-name">{value || value === 'false' ? name : `Please enter ${name}`}</div>
					<div className="user-field__display-value">
						Current value:
						{/* eslint-disable-next-line react/destructuring-assignment */}
						<div className="user-field__display-value--current">{value ? value.toString() : null}</div>
					</div>
				</div>
				<div className="user-field__update">
					{field}
				</div>
			</div>
		);
	}
}

export default connect(null, { editField })(Field);

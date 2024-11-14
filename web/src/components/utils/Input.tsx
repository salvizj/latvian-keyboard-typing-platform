import React from "react"

type InputProps = {
	id: string
	type: string
	value?: string
	onChange?: React.ChangeEventHandler<HTMLInputElement>
	placeholder?: string
	required?: boolean
}

const Input: React.FC<InputProps> = ({
	id,
	type,
	value = "",
	onChange,
	placeholder,
	required,
}) => {
	return (
		<input
			id={id}
			type={type}
			value={value}
			onChange={onChange}
			placeholder={placeholder}
			required={required}
			className="bg-transparent border border-primary rounded-sm p-2 w-full text-xl text-primary focus:outline-none focus:ring-2 focus:ring-secondary"
		/>
	)
}

export default Input

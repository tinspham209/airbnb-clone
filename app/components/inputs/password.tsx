import React from "react";
import Input from ".";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { IconType } from "react-icons";

interface InputProps {
	id: string;
	label: string;
	disabled?: boolean;
	formatPrice?: boolean;
	required?: boolean;
	register: UseFormRegister<FieldValues>;
	errors: FieldErrors;
	placeholder?: string;
}

const InputPassword: React.FC<InputProps> = ({
	errors,
	id = "password",
	label = "Password",
	register,
	disabled,
	formatPrice,
	placeholder,
	required,
}) => {
	const [hidden, setHidden] = React.useState<boolean>(true);
	const toggleEye = React.useCallback(() => {
		return setHidden((prev) => !prev);
	}, []);
	const inputType = hidden ? "password" : "text";
	const Icon = React.useMemo((): IconType => {
		return hidden ? AiFillEye : AiFillEyeInvisible;
	}, [hidden]);

	return (
		<Input
			id={id}
			label={label}
			type={inputType}
			disabled={disabled}
			register={register}
			placeholder={placeholder}
			errors={errors}
			required={required}
			formatPrice={formatPrice}
			icon={Icon}
			onIconClick={toggleEye}
		/>
	);
};

export default InputPassword;

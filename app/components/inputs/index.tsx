"use client";

import { DEFAULT_MESSAGE } from "@/app/utils/error";
import { ErrorMessage } from "@hookform/error-message";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { BiDollar } from "react-icons/bi";
import { IconType } from "react-icons";
interface InputProps {
	id: string;
	label: string;
	type?: string;
	disabled?: boolean;
	formatPrice?: boolean;
	required?: boolean;

	register: UseFormRegister<FieldValues>;
	errors: FieldErrors;
	placeholder?: string;
	icon?: IconType;
	onIconClick?: () => void;
}

const Input: React.FC<InputProps> = ({
	id,
	label,
	type = "text",
	disabled,
	formatPrice,
	register,
	required,
	errors,
	placeholder = " ",
	icon: Icon,
	onIconClick,
}) => {
	return (
		<>
			<div className="w-full relative">
				{formatPrice && (
					<BiDollar
						size={24}
						className="
	            text-neutral-700
	            absolute
	            top-5
	            left-2
	          "
					/>
				)}
				<input
					id={id}
					disabled={disabled}
					{...register(id, { required: DEFAULT_MESSAGE.required })}
					placeholder={placeholder}
					type={type}
					className={`
	          peer
	          w-full
	          p-4
	          pt-6 
	          font-light 
	          bg-white 
	          border-2
	          rounded-md
	          outline-none
	          transition
	          disabled:opacity-70
	          disabled:cursor-not-allowed
	          ${formatPrice ? "pl-9" : "pl-4"}
	          ${errors[id] ? "border-rose-500" : "border-neutral-300"}
	          ${errors[id] ? "focus:border-rose-500" : "focus:border-black"}
	        `}
				/>
				<label
					className={`
	          absolute 
	          text-md
	          duration-150 
	          transform 
	          -translate-y-3 
	          top-5 
	          z-10 
	          origin-[0] 
	          ${formatPrice ? "left-9" : "left-4"}
	          peer-placeholder-shown:scale-100 
	          peer-placeholder-shown:translate-y-0 
	          peer-focus:scale-75
	          peer-focus:-translate-y-4
	          ${errors[id] ? "text-rose-500" : "text-zinc-400"}
	        `}
				>
					{label}
					{required && <> *</>}
				</label>

				{Icon && (
					<Icon
						size={32}
						onClick={onIconClick}
						className={`absolute right-4 top-4 hover:bg-slate-100 cursor-pointer rounded-xl ${
							errors[id] ? "text-rose-400" : "text-zinc-400"
						}`}
					/>
				)}
				<ErrorMessage
					errors={errors}
					name={id}
					render={({ message }) => (
						<p className="text-rose-500 mt-2">{message}</p>
					)}
				/>
			</div>
		</>
	);
};

export default Input;

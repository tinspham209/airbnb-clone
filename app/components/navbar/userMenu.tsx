"use client";

import React from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../avatar";
import MenuItem from "./menuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
type Props = {};
const UserMenu: React.FC<Props> = () => {
	const [isOpen, setIsOpen] = React.useState(false);

	const toggleOpen = React.useCallback(() => {
		setIsOpen((prev) => !prev);
	}, []);

	const registerModal = useRegisterModal();

	return (
		<div className="relative">
			<div className="flex flex-row items-center gap-3">
				<button
					onClick={() => {}}
					className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
				>
					Airbnb your home
				</button>
				<button
					onClick={toggleOpen}
					className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
				>
					<AiOutlineMenu />
					<div className="hidden md:block">
						<Avatar />
					</div>
				</button>
			</div>
			{isOpen && (
				<div className="absolute rounded-xl shadow-md w-[40vw] bg-white overflow-hidden right-0 top-12 text-sm">
					<div className="flex flex-col cursor-pointer">
						{[
							{ label: "Login", onClick: () => {} },
							{ label: "Sign Up", onClick: registerModal.onOpen },
						].map((item, index) => (
							<MenuItem
								key={`${item.label}-${index}`}
								onClick={item.onClick}
								label={item.label}
							/>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default UserMenu;

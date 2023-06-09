"use client";

import { useLoginModal, useRegisterModal, useRentModal } from "@/app/hooks";
import { SafeUser } from "@/app/types";
import { signOut } from "next-auth/react";
import React from "react";
import { toast } from "react-hot-toast";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../avatar";
import MenuItem from "./menuItem";
import { useRouter } from "next/navigation";
type Props = {
	currentUser?: SafeUser | null;
};
const UserMenu: React.FC<Props> = ({ currentUser }) => {
	const router = useRouter();
	const [isOpen, setIsOpen] = React.useState(false);

	const isLoggedIn = React.useMemo(() => {
		return !!currentUser;
	}, [currentUser]);

	const toggleOpen = React.useCallback(() => {
		setIsOpen((prev) => !prev);
	}, []);

	const registerModal = useRegisterModal();
	const loginModal = useLoginModal();
	const rentModal = useRentModal();

	const menuOptions = React.useMemo(() => {
		return [
			{
				label: "Login",
				onClick: () => {
					loginModal.onOpen();
				},
				isShow: !isLoggedIn,
			},
			{
				label: "Sign Up",
				onClick: () => {
					registerModal.onOpen();
				},
				isShow: !isLoggedIn,
			},
			{
				label: "My trips",
				onClick: () => {
					router.push("/trips");
				},
				isShow: isLoggedIn,
			},
			{
				label: "My favorites",
				onClick: () => {
					router.push("/favorites");
				},
				isShow: isLoggedIn,
			},
			{
				label: "My reservations",
				onClick: () => {
					router.push("/reservations");
				},
				isShow: isLoggedIn,
			},
			{
				label: "My properties",
				onClick: () => {
					router.push("/properties");
				},
				isShow: isLoggedIn,
			},
			{
				label: "Airbnb my home",
				onClick: () => {
					rentModal.onOpen();
				},
				isShow: isLoggedIn,
			},
			{
				label: "Logout",
				onClick: () => {
					signOut();
					toast.success("Logout successfully!");
				},
				isShow: isLoggedIn,
			},
		];
	}, [isLoggedIn, loginModal, registerModal, rentModal, router]);

	const onRent = React.useCallback(() => {
		if (!currentUser) {
			return loginModal.onOpen();
		}

		// Open rent modal
		rentModal.onOpen();
	}, [currentUser, loginModal, rentModal]);

	return (
		<div className="relative">
			<div className="flex flex-row items-center gap-3">
				<button
					onClick={() => {
						onRent();
					}}
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
						<Avatar imgUrl={currentUser?.image} />
					</div>
				</button>
			</div>
			{isOpen && (
				<div className="absolute rounded-xl border-[1px] shadow-md w-[40vw] md:w-[20vw] bg-white overflow-hidden right-0 top-12 text-sm">
					<div className="flex flex-col cursor-pointer">
						{isLoggedIn && (
							<>
								<MenuItem
									label={`${currentUser?.name} | ${currentUser?.email}`}
									onClick={() => {}}
									disabled
								/>
								<hr />
							</>
						)}
						{menuOptions.map((item, index) => {
							return item.isShow ? (
								<MenuItem
									key={`${item.label}-${index}`}
									onClick={() => {
										item.onClick();
										toggleOpen();
									}}
									label={item.label}
								/>
							) : (
								<React.Fragment key={`${item.label}-${index}`}></React.Fragment>
							);
						})}
					</div>
				</div>
			)}
		</div>
	);
};

export default UserMenu;

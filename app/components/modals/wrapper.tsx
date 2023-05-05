"use client";
import React from "react";
import RegisterModal from "./registerModal";
import LoginModal from "./loginModal";
import RentModal from "./rentModal";

const ModalWrapper = () => {
	return (
		<>
			<RegisterModal />
			<LoginModal />
			<RentModal />
		</>
	);
};

export default ModalWrapper;

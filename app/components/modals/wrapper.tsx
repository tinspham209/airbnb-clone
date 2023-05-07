"use client";
import React from "react";
import RegisterModal from "./registerModal";
import LoginModal from "./loginModal";
import RentModal from "./rentModal";
import SearchModal from "./searchModal";

const ModalWrapper = () => {
	return (
		<>
			<RegisterModal />
			<LoginModal />
			<RentModal />
			<SearchModal />
		</>
	);
};

export default ModalWrapper;

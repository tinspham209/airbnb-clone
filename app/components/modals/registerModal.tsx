"use client";

import axios from "axios";
import React from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import { ROUTE } from "@/app/api/constant";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import { toast } from "react-hot-toast";
import Modal from ".";
import Heading from "../heading";
import Input from "../inputs";
import InputPassword from "../inputs/password";
import Button from "../button";
const RegisterModal = () => {
	const registerModal = useRegisterModal();
	const [isLoading, setIsLoading] = React.useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	});

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		setIsLoading(true);

		axios
			.post(ROUTE.register, data)
			.then(() => {
				registerModal.onClose();
			})
			.catch((error) => {
				toast.error(error?.message || "Something went wrong!");
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	return (
		<Modal
			disabled={isLoading}
			isOpen={registerModal.isOpen}
			title="Register"
			actionLabel="Continue"
			onClose={registerModal.onClose}
			onSubmit={handleSubmit(onSubmit)}
			body={
				<div className="flex flex-col gap-4">
					<Heading title="Welcome to Airbnb" subTitle="Create an account!" />
					<Input
						id="email"
						label="Email"
						disabled={isLoading}
						register={register}
						errors={errors}
						required
						type="email"
					/>
					<Input
						id="name"
						label="Name"
						disabled={isLoading}
						register={register}
						errors={errors}
						required
					/>
					<InputPassword
						id="password"
						label="Password"
						disabled={isLoading}
						register={register}
						errors={errors}
						required
					/>
				</div>
			}
			footer={
				<div className="flex flex-col gap-4 mt-3">
					<hr />
					<Button outline onClick={() => {}} icon={FcGoogle}>
						Continue with Google
					</Button>
					<Button outline onClick={() => {}} icon={AiFillGithub}>
						Continue with Github
					</Button>
					<div className="text-neutral-500 text-center mt-4 font-light">
						<div className="justify-center flex flex-row items-center gap-2">
							<div>Already have an account?</div>
							<div
								className="text-neutral-800 cursor-pointer hover:underline"
								onClick={() => {
									registerModal.onClose();
								}}
							>
								Login
							</div>
						</div>
					</div>
				</div>
			}
		/>
	);
};

export default RegisterModal;

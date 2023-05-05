"use client";

import axios from "axios";
import React from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import { ROUTE } from "@/app/api/constant";
import { useRegisterModal, useLoginModal } from "@/app/hooks";
import { toast } from "react-hot-toast";
import Modal from ".";
import Heading from "../heading";
import Input from "../inputs";
import InputPassword from "../inputs/password";
import Button from "../button";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
const LoginModal = () => {
	const router = useRouter();
	const registerModal = useRegisterModal();
	const loginModal = useLoginModal();
	const [isLoading, setIsLoading] = React.useState(false);

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		setIsLoading(true);

		signIn("credentials", {
			...data,
			redirect: false,
		}).then((callback) => {
			setIsLoading(false);

			if (callback?.ok) {
				toast.success("Logged in successfully!");
				router.refresh();
				loginModal.onClose();
			}
			if (callback?.error) {
				setError("password", {
					message: callback.error,
				});
			}
		});
	};

	return (
		<Modal
			disabled={isLoading}
			isLoading={isLoading}
			isOpen={loginModal.isOpen}
			title="Login"
			actionLabel="Continue"
			onClose={loginModal.onClose}
			onSubmit={handleSubmit(onSubmit)}
			body={
				<div className="flex flex-col gap-4">
					<Heading title="Welcome back" subTitle="Login to your account!" />
					<Input
						id="email"
						label="Email"
						disabled={isLoading}
						register={register}
						errors={errors}
						required
						type="email"
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

export default LoginModal;

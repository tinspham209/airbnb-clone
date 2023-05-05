"use client";

import { useLoginModal, useRegisterModal } from "@/app/hooks";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import Modal from ".";
import Button from "../button";
import Heading from "../heading";
import Input from "../inputs";
import InputPassword from "../inputs/password";

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
					{[
						{
							label: "Google",
							icon: FcGoogle,
							onClick: () => {
								setIsLoading(true);
								signIn("google")
									.then((callback) => {
										if (callback?.error) {
											toast.error(
												`Error when login with Google: ${callback.error}`
											);
										} else if (callback?.ok) {
											toast.success(JSON.stringify(callback));
											router.refresh();
										}
										setIsLoading(false);
									})
									.catch((error) => {
										toast.error(`Error when login with Google: ${error}`);
									});
							},
						},
						{
							label: "Github",
							icon: AiFillGithub,
							onClick: () => {
								setIsLoading(true);
								signIn("github")
									.then((callback) => {
										if (callback?.error) {
											toast.error(
												`Error when login with Github: ${callback.error}`
											);
										} else if (callback?.ok) {
											toast.success(JSON.stringify(callback));
											router.refresh();
										}
										setIsLoading(false);
									})
									.catch((error) => {
										toast.error(`Error when login with Github: ${error}`);
									});
							},
						},
					].map((item) => (
						<Button
							key={item.label}
							outline
							onClick={() => {
								item.onClick();
							}}
							icon={item.icon}
							disabled={isLoading}
							loading={isLoading}
						>
							Continue with {item.label}
						</Button>
					))}
					<div className="text-neutral-500 text-center mt-4 font-light">
						<div className="justify-center flex flex-row items-center gap-2">
							<div>First time using Airbnb?</div>
							<div
								className="text-neutral-800 cursor-pointer hover:underline"
								onClick={() => {
									loginModal.onClose();
									registerModal.onOpen();
								}}
							>
								Create an account
							</div>
						</div>
					</div>
				</div>
			}
		/>
	);
};

export default LoginModal;

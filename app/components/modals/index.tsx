"use client";
import React, { useCallback } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../button";
interface Props {
	isOpen?: boolean;
	onClose?: () => void;
	onSubmit?: () => void;
	title?: string;
	body?: React.ReactElement;
	footer?: React.ReactElement;
	actionLabel?: string;
	disabled?: boolean;
	secondaryAction?: () => void;
	secondaryActionLabel?: string;
	isLoading?: boolean;
}
const Modal: React.FC<Props> = ({
	actionLabel,
	onClose = () => {},
	onSubmit = () => {},
	body,
	footer,
	isLoading,
	disabled,
	isOpen,
	secondaryAction,
	secondaryActionLabel,
	title = "Modal",
}) => {
	const [isShowModal, setIsShowModal] = React.useState(isOpen);

	React.useEffect(() => {
		setIsShowModal(isOpen);
	}, [isOpen]);

	const handleClose = React.useCallback(() => {
		if (disabled) {
			return;
		}
		setIsShowModal(false);
		setTimeout(() => {
			onClose();
		}, 300);
	}, [disabled, onClose]);

	const handleSubmit = React.useCallback(() => {
		if (disabled) {
			return;
		}
		onSubmit();
	}, [disabled, onSubmit]);

	const handleSecondaryAction = React.useCallback(() => {
		if (disabled || !secondaryAction) {
			return;
		}

		secondaryAction();
	}, [disabled, secondaryAction]);

	if (!isOpen) {
		return null;
	}

	return (
		<>
			<div
				onClick={handleClose}
				className="justify-center items-center flex overflow-x-hidden fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70"
			>
				<div
					onClick={(e) => e.stopPropagation()}
					className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto"
				>
					{/* Content */}
					<div
						className={`translate duration-300 h-full ${
							isShowModal ? "translate-y-0" : "translate-y-full"
						}
            ${isShowModal ? "opacity-100" : "opacity-0"}
            `}
					>
						<div className="translate h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
							{/* Header */}
							<div className="flex items-center p-6 rounded-md justify-center relative border-b-[1px]">
								<div className="text-lg font-semibold">{title}</div>

								<button
									className="p-1 border-0 hover: opacity-70 transition absolute right-9 hover:bg-neutral-200 rounded-xl"
									onClick={handleClose}
								>
									<IoMdClose size={18} />
								</button>
							</div>

							{/* Body */}
							<div className="relative p-6 flex-auto">{body}</div>

							{/* Footer */}
							<div className="flex flex-col gap-2 p-6">
								<div className="flex flex-row items-center gap-4 w-full">
									{secondaryAction && secondaryActionLabel && (
										<Button
											onClick={handleSecondaryAction}
											disabled={disabled}
											outline
										>
											{secondaryActionLabel}
										</Button>
									)}
									<Button
										onClick={handleSubmit}
										disabled={disabled}
										loading={isLoading}
									>
										{actionLabel}
									</Button>
								</div>
								{footer}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Modal;

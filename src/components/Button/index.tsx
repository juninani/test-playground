import React from "react";
import "./style.scss";

interface ButtonProps {
	children: React.ReactNode;
	href?: string;
	onClick?: () => void;
	type?: "button" | "submit" | "reset";
	disabled?: boolean;
	variant?: "primary" | "secondary" | "outline";
	className?: string;
}

export default function Button({
	children,
	href,
	onClick,
	type = "button",
	disabled = false,
	variant = "primary",
	className = "",
}: ButtonProps) {
	const buttonClass = `btn-${variant} ${className}`.trim();

	if (href) {
		return (
			<a href={href} className={buttonClass}>
				{children}
			</a>
		);
	}

	return (
		<button type={type} onClick={onClick} disabled={disabled} className={buttonClass}>
			{children}
		</button>
	);
}

import Image from "next/image";
import React from "react";
import Linkedin from "./linkedin.png";

const LinkedinLogo = () => {
	return (
		<div className="relative h-6 w-6">
			<Image
				src={Linkedin}
				alt="Linkedin Logo"
				fill
				className="object-contain my-0!"
			/>
		</div>
	);
};

export default LinkedinLogo;

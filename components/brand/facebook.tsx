import Image from "next/image";
import React from "react";
import Facebook from "./facebook.png";

const FacebookLogo = () => {
	return (
		<div className="relative h-6 w-6">
			<Image
				src={Facebook}
				alt="Facebook Logo"
				fill
				className="object-contain my-0!"
			/>
		</div>
	);
};

export default FacebookLogo;

"use client";
import { useEffect, useState } from "react";
import { formatDate } from "@/lib/utils";

export default function ServiceDate({ date }: { date: string }) {
	const [serviceDate, setServiceDate] = useState<string>("");

	useEffect(() => {
		if (date) {
			const formattedDate = formatDate(date);
			setServiceDate(formattedDate);
		}
	}, [date]);

	return <div>{serviceDate}</div>;
}

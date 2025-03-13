const Outline = () => {
	return (
		<div className="">
			<div className="pt-16 pb-4">
				<h1 className="leading-[0] mb-4">
					<span className="text-base font-semibold font-mono">outline</span>
				</h1>
				<h2 className="text-xl md:text-3xl mb-4">会社概要</h2>
			</div>

			<div className="overflow-x-auto">
				<table className="min-w-full">
					<tbody className="divide-y divide-foreground/20 [&>tr>th]:px-6 [&>tr>th]:py-4 [&>tr>th]:text-left [&>tr>th]:text-sm [&>tr>th]:font-medium [&>tr>th]:text-foreground/70 [&>tr>th]:uppercase [&>tr>td]:px-6 [&>tr>td]:py-4 [&>tr>td]:text-sm [&>tr>td]:text-foreground/90">
						<tr>
							<th>社名</th>
							<td>imanoc株式会社</td>
						</tr>
						<tr>
							<th>所在地</th>
							<td>
								東京都中央区日本橋富沢町７番１６号ＴＨＥＧＡＴＥ日本橋人形町４階
							</td>
						</tr>
						<tr>
							<th>URL</th>
							<td>https://imanoc.com</td>
						</tr>
						<tr>
							<th>資本金</th>
							<td>5,000,000円</td>
						</tr>
						<tr>
							<th>設立</th>
							<td>2022年11月1日</td>
						</tr>
						<tr>
							<th>代表取締役</th>
							<td>南條 友馬</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Outline;

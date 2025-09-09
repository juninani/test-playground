import React from "react";

import Card from "@/components/Card";

interface Test {
	id: string;
	title: string;
	subtitle: string;
	participants: string;
	icon: string;
	cover: string;
	category: string;
}

interface TestSectionProps {
	id: string;
	title: string;
	tests: Test[];
}

export default function CategoryCard({ id, title, tests }: TestSectionProps) {
	return (
		<section id={id}>
			<h2 className="section-title">{title}</h2>
			<div className="grid">
				{tests.map((test) => (
					<Card
						key={test.id}
						id={test.id}
						title={test.title}
						desc={test.subtitle}
						participants={test.participants}
						icon={test.icon}
						cover={test.cover}
					/>
				))}
			</div>
		</section>
	);
}

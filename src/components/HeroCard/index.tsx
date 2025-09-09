import "./style.scss";

interface HeroCardProps {
	label: string;
	title: string;
	desc: string;
	participants: string;
	icon: string;
	link: string;
	best?: boolean;
}

export default function HeroCard({
	label,
	title,
	desc,

	best,
}: HeroCardProps) {
	return (
		<div className={`hero-card ${best ? "big-card" : ""}`}>
			<div className="hero-label">{label}</div>
			<h1 className="hero-title">{title}</h1>
			<p className="hero-desc">{desc}</p>
			<div className="hero-bottom">
				<span className="hero-stat"> </span>
				{/* <Button href={link} variant="primary">
					시작하기
				</Button> */}
			</div>
		</div>
	);
}

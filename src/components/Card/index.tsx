import "./styles.scss";

interface CardProps {
	id: string;
	title: string;
	desc: string;
	participants: string;
	icon: string;
}

export default function Card({ id, title, desc, participants, icon }: CardProps) {
	return (
		<a href={`/tests/${id}`} className="card">
			<div className="card-header">
				<span className="card-icon">{icon}</span>
				<span className="card-title">{title}</span>
				{/* <img src={cover} alt={title} className="card-cover" /> */}
			</div>
			<div className="card-desc">{desc}</div>
			<div className="card-footer">
				<span className="card-stat">참여 {participants}</span>
			</div>
		</a>
	);
}

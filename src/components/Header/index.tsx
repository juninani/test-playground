import React from "react";
import "./style.scss";

export default function Header() {
	return (
		<header className="header">
			<div className="header-container">
				<a href="/" className="header-brand">
					성향놀이터
				</a>
				<nav className="header-gnb" aria-label="주요 카테고리">
					<a href="/#meme">밈</a>
					<a href="/#situation">상황</a>
					<a href="/#game">게임 캐릭터</a>
					<a href="/#daily">일상</a>
					<a href="/#season">시즌</a>
				</nav>
			</div>
		</header>
	);
}

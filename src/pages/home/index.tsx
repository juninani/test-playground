import CategoryCard from "@/components/CategoryCard";
import HeroCard from "@/components/HeroCard";
import "./style.scss";
import tests from "@/data/tests/index.json";

export default function Home() {
	const memeTests = tests.filter((t) => t.category === "meme");
	return (
		<div className="home">
			<section className="hero">
				<div className="hero-container">
					<HeroCard
						label="최고의 인기"
						title="치킨 성향 테스트"
						desc="후라이드/양념/간장/마라 중 당신의 인생 치킨은?"
						participants="102k"
						icon="🍗"
						link="/tests/chicken"
						best={true}
					/>

					<div className="hero-list">
						<HeroCard
							label="인기"
							title="라면 성격 테스트"
							desc="라면 취향으로 알아보는 나의 성격 유형"
							participants="98k"
							icon="🍜"
							link="/tests/ramen"
						/>
						<HeroCard
							label="인기"
							title="라면 성격 테스트"
							desc="라면 취향으로 알아보는 나의 성격 유형"
							participants="98k"
							icon="🍜"
							link="/tests/ramen"
						/>
						<HeroCard
							label="인기"
							title="라면 성격 테스트"
							desc="라면 취향으로 알아보는 나의 성격 유형"
							participants="98k"
							icon="🍜"
							link="/tests/ramen"
						/>
						<HeroCard
							label="인기"
							title="라면 성격 테스트"
							desc="라면 취향으로 알아보는 나의 성격 유형"
							participants="98k"
							icon="🍜"
							link="/tests/ramen"
						/>
					</div>
				</div>
			</section>

			{/* 광고 영역 */}
			<div className="ad"></div>

			{/* Sections */}
			<main className="main">
				<CategoryCard id="meme" title="밈 테스트" tests={memeTests} />

				<section id="game">
					<h2 className="section-title">게임 · 캐릭터 테스트</h2>
					<div className="grid">
						<a href="/tests/rpg" className="card">
							<div className="card-header">
								<span className="card-icon">⚔️</span>
								<span className="card-title">RPG 직업 테스트</span>
							</div>
							<div className="card-desc">검사 · 마법사 · 힐러 · 도적 중 나는?</div>
							<div className="card-footer">
								<span className="card-stat">참여 120k</span>
								<button className="btn-primary">시작하기</button>
							</div>
						</a>
					</div>
				</section>
			</main>
		</div>
	);
}

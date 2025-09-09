import "./style.scss";

export default function Footer() {
	return (
		<footer className="footer">
			<div className="footer-container">
				<div>© {new Date().getFullYear()} 테스트놀이터</div>
				<div className="footer-links">
					<a href="/privacy">개인정보처리방침</a>
					<a href="/terms">이용약관</a>
					<a href="/contact">문의</a>
				</div>
			</div>
		</footer>
	);
}

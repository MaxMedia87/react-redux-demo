import {Link} from "react-router-dom";

export function Navigation() {
	return (
		<div className="header">
			<ul className="navigation">
				<li>
					<Link to="/">Главная страница</Link>
				</li>
				<li>
					<Link to="/todos">Список задач</Link>
				</li>
			</ul>
		</div>
	)
}
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import TestMe from "../components/TestMe";
import TestSon from "../components/TestSon";
import TestTien from "../components/TestTien";

const App = () => {
	return (
		<Router>
			<Link to="/me">Me</Link>
			<Link to="/tien">Tien</Link>
			<Link to="/son">Son</Link>
			<Switch>
				<Route path="/me" component={TestMe} />
				<Route path="/son" component={TestSon} />
				<Route path="/tien" component={TestTien} />
			</Switch>
		</Router>
	);
};

export default App;

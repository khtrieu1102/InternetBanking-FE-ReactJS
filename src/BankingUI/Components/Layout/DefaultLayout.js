import React, { Fragment } from "react";

import NavbarConnect from "./Navbar/NavbarConnect";
import JumbotronConnect from "./JumbotronComponent/JumbotronComponentConnect";

const DefaultLayout = ({ children }) => {
	return (
		<Fragment>
			<NavbarConnect />
			<JumbotronConnect />
			{children}
		</Fragment>
	);
};

export default DefaultLayout;

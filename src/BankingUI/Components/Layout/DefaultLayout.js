import React, { Fragment } from "react";

import NavbarConnect from "./Navbar/NavbarConnect";

const DefaultLayout = ({ children }) => {
	return (
		<Fragment>
			<NavbarConnect />
			{children}
		</Fragment>
	);
};

export default DefaultLayout;

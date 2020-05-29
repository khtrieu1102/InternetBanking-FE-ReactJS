import React, { Fragment } from "react";

import Navbar from "./Navbar/Navbar";

const DefaultLayout = ({ children }) => (
	<Fragment>
		<Navbar />
		{children}
	</Fragment>
);

export default DefaultLayout;

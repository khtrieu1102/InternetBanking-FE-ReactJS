const getBankName = (bankId) => {
	switch (bankId) {
		case 0:
			return "SAPHASAN Bank";
		case 1:
			return "3TBank";
		case 2:
			return "BAOSON Bank";
		default:
			return "SAPHASAN Bank";
	}
};

export default getBankName;

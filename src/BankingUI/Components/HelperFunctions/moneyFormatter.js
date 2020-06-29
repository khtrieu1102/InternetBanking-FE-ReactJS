const formatter = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "VND",
	minimumFractionDigits: 0,
});

export default formatter;

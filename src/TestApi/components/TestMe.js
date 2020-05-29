import React, { useEffect, useState } from "react";
import axios from "axios";
import md5 from "md5";
import NodeRSA from "node-rsa";

// const SERVER_URL = "http://localhost:5000";
const SERVER_URL = "https://qlbank1.herokuapp.com";

const TestMe = () => {
	const [customer, setCustomer] = useState("he");
	const [customerId, setCustomerId] = useState("12345");
	useEffect(() => {
		console.log(customer);
	}, [customer]);

	const handleClick = async (customerId) => {
		if (!customerId) return;
		const timeStamp = Date.now();
		const partnerCode = "3TBank"; // SAPHASANBank
		const bodyJson = { accountNumber: customerId };
		const signature = timeStamp + bodyJson + md5("dungnoiaihet");
		await axios
			.post(`${SERVER_URL}/api/external/customer`, bodyJson, {
				headers: {
					ts: timeStamp,
					partnerCode: partnerCode,
					hashedSign: md5(signature),
				},
				// data: `id=${customerId}`,
			})
			.then((result) => {
				const { data } = result;
				console.log(result);
				return setCustomer(data.name);
			})
			.catch((error) => {
				console.log(error);
			});
		// console.log(customer);
	};

	const GuiTien = async (customerId) => {
		if (!customerId) return;
		const timeStamp = Date.now();
		const partnerCode = "baoSon123";
		const bodyJson = {
			accountNumber: customerId,
			amount: 50000,
		};
		const signature = timeStamp + bodyJson + md5("dungnoiaihet");
		const privateKey = new NodeRSA(
			"-----BEGIN RSA PRIVATE KEY-----\n" +
				"MIICXwIBAAKBgQCyceITLtFoy4KzMgmr6NEnvk1VBH7pRuyyg7IkXc3kBspKs9CIErm2eJtEtduIPQK+3AgiQW+fjL1dDMQr7ENZiGzWhEPoSbU348mjg1fxFDztFB4QiqAd7UUvj1kK2/UT+D0C6Sgc0O69C9lRGahPSAX+7ZArGIodtfuOKPenEwIDAQABAoGBAKU98CvzXte8HPvziiE3Jve2scXYs+0xUF6+tWgXtWFDKHCksqZPMMpYRPALt48hcDltZ9rQ3ZzRp0lTWRWTY4kmnjUm1W4E7uFmJJc7KySZJH9XNbvlOceVIKPIWjZvvQ93wov03G2ajdv/NC2BT57xQ+YTaMe3GQkJGTX7V/KBAkEA8TQmBdaExOBF7mrGKMrrrvYnErtZWN4dLdPK+ipfmeSM/oD25/UHfPHbh8tkHbt9vfz4PF/3NdAWcZiMNzAKPwJBAL1kLC/SM9NFfxCLfQrmP1qTASWs4IVsxeYU4+dUVcUwL0g4WlUgCjrVCFYomWen1wCbqCvlGpON9H7CLR7fpi0CQQDI3cXAXNoqXh6+orqtI/fLt3/okI6ifC5OiK7jUEBXF0b3dwynNJ3sxjksyAty2z2m5zEOjlh/vu/B3+j82IvfAkEAqlR2PQgCnicpkPqymePb5JzDclvZjYX3Medl1L4PaYndbElqTJbFPIYtujdHSGc1wZE8nUWuMjiARKRkKhkgfQJBAIqWxELwATG3541h/7MKI2tnTC0F3g7nTLJWtgIiqYfyw/jFdsVGWZUlJriyS6LxYh+0zMdRtdscw4iWEPJ2vM4=\n" +
				"-----END RSA PRIVATE KEY-----"
		);
		const sign = privateKey.sign(bodyJson, "base64", "base64");
		await axios
			.post(`${SERVER_URL}/api/external/transaction`, bodyJson, {
				headers: {
					ts: timeStamp,
					partnerCode: partnerCode,
					hashedSign: md5(signature),
					sign: sign,
				},
				// data: `id=${customerId}`,
			})
			.then((result) => {
				const { data } = result;
				console.log(result);
				// return setCustomer(data);
			})
			.catch((error) => {
				console.log(error);
			});
		// console.log(customer);
	};

	const FullUsers = async () => {
		await axios
			.get(`${SERVER_URL}/api/users`)
			.then((result) => {
				console.log(result);
			})
			.catch((error) => {
				console.log(error);
			});
		// console.log(customer);
	};

	return (
		<>
			<h1>App Banking</h1>
			<input type="text" onChange={(e) => setCustomerId(e.target.value)} />
			{customer.user ? <p>{customer.user}</p> : <p>{customer}</p>}

			<button type="button" onClick={() => FullUsers()}>
				INTERNAL - lấy hết users
			</button>
			<button type="button" onClick={() => handleClick(customerId)}>
				Lấy thông tin user
			</button>
			<button type="button" onClick={() => GuiTien(customerId)}>
				Nạp tiền
			</button>
		</>
	);
};

export default TestMe;

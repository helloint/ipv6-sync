const env = {
	ROUTER_IP: process.env.ROUTER_IP,
	ROUTER_KEY: process.env.ROUTER_KEY,
	ROUTER_USERNAME: process.env.ROUTER_USERNAME,
	ROUTER_PASSWORD: process.env.ROUTER_PASSWORD,
}
export const checkEnv = () => {
	let valid = true;
	Object.entries(env).forEach(([key, value]) => {
		if (!env[key]) {
			console.log(`${key} required`);
			valid = false;
		}
	});

	return valid;
}

export const getEnv = (key) => {
	return env[key];
}

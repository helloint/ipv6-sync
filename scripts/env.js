const env = {
	ROUTER_IP: process.env.ROUTER_IP,
	ROUTER_USERNAME: process.env.ROUTER_USERNAME,
	ROUTER_PASSWORD: process.env.ROUTER_PASSWORD,
}
export const checkEnv = () => {
	if (!env.ROUTER_IP) console.log('ROUTER_IP required');
	if (!env.ROUTER_USERNAME) console.log('ROUTER_USERNAME required');
	if (!env.ROUTER_PASSWORD) console.log('ROUTER_PASSWORD required');

	return !(!env.ROUTER_IP || !env.ROUTER_USERNAME || !env.ROUTER_PASSWORD);
}

export const getEnv = (key) => {
	return env[key];
}

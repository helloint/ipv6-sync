import {checkEnv} from "./env.js";
import {disableIpV6, enableIpV6, getIpV6, renewToken} from "./api.js";
import {sleep} from "./util.js";

const main = async () => {
	if (!checkEnv()) return;

	await detect();
};
const detect = async () => {
	const ipV6 = await getIpV6();
	if (!ipV6) {
		console.log(`IPv6 lost, restart Xiaomi Router IPv6 module.`);
		await disableIpV6();
		await enableIpV6();
		await sleep(5000);
		console.log(`IPv6 module restarted. IPv6: ${await getIpV6()}`);
	} else {
		console.log(`IPv6 normal.`);
	}
}

main();

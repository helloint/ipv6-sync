import {checkEnv} from "./env.js";
import {disableIpV6, enableIpV6, getIpV6, getWanInfo, renewToken} from "./api.js";
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
		let disabled = false;
		do {
			const wanInfo = await getWanInfo();
			if (wanInfo.info.ipv6_info.wanType === 'off') {
				disabled = true;
			} else {
				console.log('Waiting IPv6 being turned off...');
				await sleep(1000);
			}
		} while (!disabled);

		await enableIpV6();
		let enabled = false;
		do {
			const wanInfo = await getWanInfo();
			if (wanInfo.info.ipv6_info.wanType === 'native') {
				enabled = true;
			} else {
				console.log('Waiting IPv6 being turned on...');
				await sleep(1000);
			}
		} while (!enabled);

		console.log(`IPv6 module restarted.`);
		console.log(`IPv6: ${await getIpV6()}`);
	} else {
		console.log(`IPv6 normal.`);
	}
}

main();

import {getCache, setCache} from "./cache.js";
import {getEnv} from "./env.js";
import {createNonce, hashPassword} from "./util.js";

export const getIpV6 = async () => {
	try {
		return await (await fetch('https://6.ipw.cn')).text();
	} catch (error) {
		console.log(error);
		return null;
	}
}

export const enableIpV6 = async () => {
	return await fetchApi(`xqnetwork/set_wan6`, 'wanType=native&autosetipv6=0', 'POST');
}

export const disableIpV6 = async () => {
	return await fetchApi(`xqnetwork/set_wan6`, 'wanType=off', 'POST');
}

const fetchApi = async (url, body, method, retries = 1) => {
	try {
		const response = await fetch(`http://${getEnv('ROUTER_IP')}/cgi-bin/luci/;stok=${getCache('TOKEN')}/api/${url}`, {
			headers: generateHeader(),
			method: method ?? 'POST',
			body,
		});
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}

		try {
			const contentType = response.headers.get('Content-Type');
			if (isJsonResponse(contentType)) {
				const responseJson = await response.json();
				if (responseJson.code !== 0) {
					// {"code":401,"msg":"Invalid token"}%
					if (responseJson.code === 401 && responseJson.msg === 'Invalid token' && retries > 0) {
						const result = await renewToken();
						if (result) {
							return await fetchApi(url, body, method, retries - 1);
						}
						throw new Error('Renew token failed.');
					} else {
						throw new Error('Response was not ok.');
					}
				}
				return responseJson;
			} else {
				return await response.text();
			}
		} catch (error) {
			console.error('There was a problem with your fetch operation:', error);
		}
	} catch (error) {
		console.error('There was a problem with your fetch operation:', error);
	}

	return null;
}

export const renewToken = async () => {
	const url = `http://${getEnv('ROUTER_IP')}/cgi-bin/luci/api/xqsystem/login`;
	const nonce = createNonce();
	const password = await hashPassword(getEnv('ROUTER_PASSWORD'), nonce, getEnv('ROUTER_KEY'));
	const options = {
		method: 'POST',
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: `username=${getEnv('ROUTER_USERNAME')}&password=${password}&nonce=${nonce}&logtype=2`,
	};

	console.log(options.body);

	const response = await fetch(url, options);
	if (!response.ok) {
		throw new Error('Network response was not ok');
	}

	try {
		const contentType = response.headers.get('Content-Type');
		if (isJsonResponse(contentType)) {
			const responseJson = await response.json();
			if (responseJson.code !== 0) {
				// {"code":401,"msg":"not auth"}
				console.error(JSON.stringify(responseJson));
				throw new Error('Login was not ok.');
			}

			// {
			// 	"url": "/cgi-bin/luci/;stok=c54c9574dd5ad8f946f9588bdc54fe48/web/home",
			// 	"token": "c54c9574dd5ad8f946f9588bdc54fe48",
			// 	"code": 0
			// }
			setCache('TOKEN', responseJson.token);
			return responseJson;
		} else {
			return await response.text();
		}
	} catch (error) {
		console.error('There was a problem with your fetch operation:', error);
	}

	return null;
}

const generateHeader = () => {
	const token = getCache('TOKEN');
	return {
		"Accept": "application/json, text/javascript, */*; q=0.01",
		'Accept-Language': 'en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7,pt-BR;q=0.6,pt;q=0.5',
		'Connection': 'keep-alive',
		'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
		'Origin': `http://${getEnv('ROUTER_IP')}`,
		'Referer': `http://${getEnv('ROUTER_IP')}/cgi-bin/luci/;stok=${token}/web/setting/wan`,
		'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
		'X-Requested-With': 'XMLHttpRequest',
	};
}

const isJsonResponse = (contentType) => {
	return contentType && (contentType.includes('application/json') || contentType.includes('text/html'));
}

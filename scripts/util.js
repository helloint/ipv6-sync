export const sleep = async (delay) => {
	await new Promise(resolve =>
		setTimeout(resolve, delay)
	)
}

export async function hashPassword(pwd, nonce, key) {
	const pwdKey = pwd + key;
	const pwdKeyHash = await crypto.subtle.digest('SHA-1', new TextEncoder().encode(pwdKey));
	const pwdKeyHashStr = Array.from(new Uint8Array(pwdKeyHash))
		.map(b => b.toString(16).padStart(2, '0'))
		.join('');

	const noncePwdKey = nonce + pwdKeyHashStr;
	const noncePwdKeyHash = await crypto.subtle.digest('SHA-1', new TextEncoder().encode(noncePwdKey));
	const noncePwdKeyHashStr = Array.from(new Uint8Array(noncePwdKeyHash))
		.map(b => b.toString(16).padStart(2, '0'))
		.join('');

	return noncePwdKeyHashStr;
}

export async function newHashPassword(pwd, nonce, key) {
	const pwdKey = pwd + key;
	const pwdKeyHash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(pwdKey));
	const pwdKeyHashStr = Array.from(new Uint8Array(pwdKeyHash))
		.map(b => b.toString(16).padStart(2, '0'))
		.join('');

	const noncePwdKey = nonce + pwdKeyHashStr;
	const noncePwdKeyHash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(noncePwdKey));
	const noncePwdKeyHashStr = Array.from(new Uint8Array(noncePwdKeyHash))
		.map(b => b.toString(16).padStart(2, '0'))
		.join('');

	return noncePwdKeyHashStr;
}

export function createNonce() {
	const typeVar = 0;
	const deviceID = 'bot';
	const timeVar = Math.floor(Date.now() / 1000);
	const randomVar = Math.floor(Math.random() * 10000);
	return `${typeVar}_${deviceID}_${timeVar}_${randomVar}`;
}

import fs from 'fs';
import path from 'path';

const configFilePath = path.join(path.dirname(new URL(import.meta.url).pathname), 'cache.json');

// 读取配置文件并返回指定 key 的值
export function getCache(key) {
	try {
		const data = fs.readFileSync(configFilePath, 'utf8');
		const config = JSON.parse(data);
		return config[key];
	} catch (err) {
		console.error(`Error reading config file: ${err}`);
		return null;
	}
}

// 更新配置文件中的指定 key 的值
export function setCache(key, value) {
	try {
		const data = fs.readFileSync(configFilePath, 'utf8');
		const config = JSON.parse(data);
		config[key] = value;
		fs.writeFileSync(configFilePath, JSON.stringify(config, null, 2), 'utf8');
		console.log(`Successfully updated ${key} in config file.`);
	} catch (err) {
		console.error(`Error writing to config file: ${err}`);
	}
}

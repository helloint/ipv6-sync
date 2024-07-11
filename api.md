获取IPv6地址. 有就会返回IPv6地址, 没有就会报错
```shell
curl "6.ipw.cn"
```

登陆路由器
```shell
ROUTER_IP=192.168.31.1
USERNAME=admin
PASSWORD=695692da0abb19137a30153d23334624827e174b
NONCE=0__1720490682_1862
curl "http://$ROUTER_IP/cgi-bin/luci/api/xqsystem/login" \
  -H "Content-Type: application/x-www-form-urlencoded; charset=UTF-8" \
  --data-raw "username=$USERNAME&password=$PASSWORD&nonce=$NONCE&logtype=2"
```

关闭IPv6
```shell
ROUTER_IP=192.168.31.1
TOKEN=c54c9574dd5ad8f946f9588bdc54fe48
curl "http://$ROUTER_IP/cgi-bin/luci/;stok=$TOKEN/api/xqnetwork/set_wan6" \
  -H "Accept: application/json, text/javascript, */*; q=0.01" \
  -H "Accept-Language: en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7,pt-BR;q=0.6,pt;q=0.5" \
  -H "Connection: keep-alive" \
  -H "Content-Type: application/x-www-form-urlencoded; charset=UTF-8" \
  -H "Origin: http://$ROUTER_IP" \
  -H "Referer: http://$ROUTER_IP/cgi-bin/luci/;stok=$TOKEN/web/setting/wan" \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36" \
  -H "X-Requested-With: XMLHttpRequest" \
  --data-raw "wanType=off"
```

开启IPv6
```shell
ROUTER_IP=192.168.31.1
TOKEN=c54c9574dd5ad8f946f9588bdc54fe48
curl "http://$ROUTER_IP/cgi-bin/luci/;stok=$TOKEN/api/xqnetwork/set_wan6" \
  -H "Accept: application/json, text/javascript, */*; q=0.01" \
  -H "Accept-Language: en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7,pt-BR;q=0.6,pt;q=0.5" \
  -H "Connection: keep-alive" \
  -H "Content-Type: application/x-www-form-urlencoded; charset=UTF-8" \
  -H "Origin: http://$ROUTER_IP" \
  -H "Referer: http://$ROUTER_IP/cgi-bin/luci/;stok=$TOKEN/web/setting/wan" \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36" \
  -H "X-Requested-With: XMLHttpRequest" \
  --data-raw "wanType=native&autosetipv6=0"
```

检查ipv6状态
```shell
ROUTER_IP=192.168.31.1
TOKEN=c54c9574dd5ad8f946f9588bdc54fe48
curl "http://$ROUTER_IP/cgi-bin/luci/;stok=$TOKEN/api/xqnetwork/wan_info"
	-H "Accept: application/json, text/javascript, */*; q=0.01" \
	-H "Accept-Language: en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7,pt-BR;q=0.6,pt;q=0.5" \
	-H "Host: $ROUTER_IP" \
	-H "Referer: http://$ROUTER_IP/cgi-bin/luci/;stok=$TOKEN/web/setting/wan" \
	-H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36" \
	-H "X-Requested-With: XMLHttpRequest" \
	--compressed
```

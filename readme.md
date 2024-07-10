# 小米路由器保持IPv6
## 面对的问题
小米路由器在开启IPv6的情况下, 每当光猫重启, 公网IP变化后, 内网会拿不到IPv6. 重启一下小米路由器的IPv6功能后, 问题解决.

## 解决方法
在内网部署一个应用, 定时检测IPv6是否正常, 如果不正常, 调用小米路由器的接口, 自动重启IPv6功能.

## Config
修改`.env`文件, 参数说明:
* ROUTER_IP=192.168.31.1 你的路由器IP
* ROUTER_KEY=a2ffa5c9be07488bbb04a3a47dabcdef 你的路由器登陆key. 查看登陆页面网页源代码, 搜索:`var Encrypt = {`, 就是下面一行的`key`
* ROUTER_USERNAME=admin	路由器固定的登陆用户名
* ROUTER_PASSWORD=123456  你的路由器登陆密码

## 部署
直接部署到Docker

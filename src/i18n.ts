import { generateI18n } from "@lib";

export const i18n = generateI18n({
  'zh-CN': {
    'UDP Broker configurations.': 'UDP Broker 配置',
    'IP to bind for UDP broker': 'UDP 代理绑定 IP',
    'Port to bind for UDP broker': 'UDP 代理绑定端口',
    'Max Number of Subscribers. Zero for unlimited': '最大订阅数量。0 为不限制。',
    'Post outdated tags': '发送过期信标数据',
    'Post offline locators': '发送离线基站',
    'Subscriber Lifetime (s). 0 for disabled': '订阅者生命周期（秒）。0 为禁用。',
    'Subscribers': '订阅者',
    'Default Data Format': '默认数据格式',
    'JSON (Compressed by Deflate)': 'JSON (使用 Deflate 压缩数据)',
    'JSON (Compressed by GZip)': 'JSON (使用 GZip 压缩数据)',
    'Binary': '二进制',
    'Post beacons': '发送信标',
    'Post locators': '发送基站',
  },
});
<!-- lang zh-CN begin -->
# 数据格式 (JSON)
<!-- lang zh-CN end -->

<!-- lang en-US begin -->
# Data structure (JSON)
<!-- lang en-US end -->

<!-- lang zh-CN begin -->
## 信标
### 格式
```ts
{
  type: 'sensors',
  data: {
    [mac: string]: {
      x: number; // 位置 x 值
      y: number; // 位置 y 值
      z: number; // 位置 z 值
      mapId: string; // 地图图层 ID
      zoneId: string; // 区域 ID
      gps: null | { // WGS-84 坐标
        lat: number; // 纬度
        lon: number; // 经度
      };
      updatedAt: number; // 最后一包的时间戳
      calculatedAt: number; // 计算后的时间戳
      userData: {
        0: {
          channel: number; // 信道
          frequency: number; // 频率
          recv: boolean;
          power: { // 
            type: 'TI' | 'Nordic' | 'iOS' | 'APP'; // 
            value: number; //
          };
          sos: boolean; // 报警开关
          battery: number; // 电量百分比
          lastPressedTS: number; // 报警开关按下时间戳
        };
      };
      userDataTs: {
        [cmd: number]: number; // 用户数据更新时间戳
      }
      lastGateway: string; // 最后一次发包的基站 MAC
      nearestGateway: string; // 最近的基站 MAC
    }
  };
  timestamp: number; // 发送数据时间戳
}
```
<!-- lang zh-CN end -->

<!-- lang en-US begin -->
## Beacons
### Data structure
```ts
{
  type: 'sensors',
  data: {
    [mac: string]: {
      x: number; // Coordinate X
      y: number; // Coordinate Y
      z: number; // Coordinate Z
      mapId: string; // Map ID
      zoneId: string; // Zone ID
      gps: null | { // WGS-84 coordinate system
        lat: number; // Latitude
        lon: number; // Longitude
      };
      updatedAt: number; // Timestamp for the beacon synchronized
      calculatedAt: number; // Timestamp for the beacon located successfully
      userData: {
        0: {
          channel: number; // Working channel of the beacon
          frequency: number; // Frequency of the beacon
          recv: boolean; // Whether it receives configuration message without pressing the alarm button
          power: { // 
            type: 'TI' | 'Nordic' | 'iOS' | 'APP'; // 
            value: number | string; //
          };
          sos: boolean; // Whether the alarm button is pressed
          battery: number; // Battery in percentage
          lastPressedTS: number; // Timestamp for alarm button pressed
        };
      };
      userDataTs: {
        [cmd: number]: number; // Timestamp for this command updated 
      }
      lastGateway: string; // The last locator which received package from the beacon
      nearestGateway: string; // The nearest locator to the beacon
    }
  };
  timestamp: number; // 发送数据时间戳
}
```
<!-- lang en-US end -->

<!-- lang zh-CN begin -->
### 示例
<!-- lang zh-CN end -->

<!-- lang en-US begin -->
### Sample
<!-- lang en-US end -->
```json
{
  "type": "sensors",
  "data": {
    "3cfad3b00001": {
      "x": 1.2475358247756958,
      "y": 2.3795104026794434,
      "z": 0.75,
      "rssi": -49.79572978797052,
      "mapId": "BavVBMPeO4",
      "zoneId": "BmEr3GEeA",
      "lastGateway": "3cfad3b09ffe",
      "nearestGateway": "3cfad3b09fcc",
      "updatedAt": 1692424350520,
      "calculatedAt": 1692424350519,
      "userData": {
        "0": {
          "frequency": 5,
          "battery": 90,
          "power": {
            "type": "Nordic",
            "value": 0
          },
          "sos": false,
          "recv": false,
          "channel": 2402,
          "method": 0
        },
        "8": {
          "gSensors": [
            1,
            254,
            62
          ]
        }
      },
      "userDataTs": {
        "0": 1692424349496,
        "8": 1692424350519
      }
    }
  },
  "timestamp": 1692424350522
}
```

<!-- lang zh-CN begin -->
## 基站
### 格式
```ts
{
  type: 'locators',
  data: {
    [IpAddressV4: string]: { // 基站 IPv4 地址
      mac: string; // 基站 mac
      angles: number[]; // 基站角度
      updatedAt: number; // 最后一包时间戳
      online: boolean; // 在线
      info?: {
        name: string; // 基站名称
        type: string; // 基站类型
        mapId: string; // 地图 ID
        zoneId: string; // 区域 ID
        channel: string; // 工作信道
        elevation: number; // AOA 算法的 Elevation
        azimuth: number; // AOA 算法的 Azimuth
        rotation: number; // AOA 算法的 Rotation
        errorDegree: number; // AOA 算法的 Error Degree
        x: number; // 位置 x 值
        y: number; // 位置 y 值
        z: number; // 位置 z 值
        modelName: string; // 基站配置型号
        realModelName: string; // 基站真实型号
        channels: { // 基站工作信道
          value: number; // 信道值
          whitening: boolean; // 是否白化
        }[];
        LAN: { // 基站局域网配置信息
          ip: string; // IP 地址
          mode: 'dhcp' | 'static' // IP 分配模式
          subnetMask: string; // 子网掩码
          defaultGateway: string; // 默认网关
        };
      };
    };
  };
  timestamp: number; // 发送数据时间戳
}
```
<!-- lang zh-CN end -->

<!-- lang en-US begin -->
## Locators
### Data structure
```ts
{
  type: 'locators',
  data: {
    [IpAddressV4: string]: { // IPv4 address
      mac: string; // MAC of the locator
      angles: number[]; // Angles of the locator
      updatedAt: number; // Timestamp for last updated
      online: boolean; // Whether it is online
      info?: {
        name: string; // Name
        type: string; // Type
        mapId: string; // Map ID
        zoneId: string; // Zone ID
        elevation: number; // Elevation of AOA algorithim
        azimuth: number; // Azimuth of AOA algorithim
        rotation: number; // Rotation of AOA algorithim
        errorDegree: number; // Error Degree of AOA algorithim
        x: number; // Coordinate X
        y: number; // Coordinate Y
        z: number; // Coordinate Z
        modelName: string; // Configured model name of the locator
        realModelName: string; // Real model name of the locator
        channels: { // Working channels
          value: number; // Value
          whitening: boolean; // Whitening
        }[];
        LAN: { // LAN info
          ip: string; // IP address
          mode: 'dhcp' | 'static' // IP mode
          subnetMask: string; // Subnet mask
          defaultGateway: string; // Default gateway
        };
      };
    };
  };
  timestamp: number; // Timestamp when this message sent
}
```
<!-- lang en-US end -->

<!-- lang zh-CN begin -->
### 示例
<!-- lang zh-CN end -->

<!-- lang en-US begin -->
### Sample
<!-- lang en-US end -->
```json
{
  "type": "locators",
  "data": {
    "192.168.123.232": {
      "mac": "3c:fa:d3:b0:9f:fe",
      "angles": [],
      "info": {
        "version": "1.2.9",
        "name": "1.2.9",
        "type": "AOA",
        "mapId": "BavVBMPeO4",
        "zoneId": "SM7sMy96Z",
        "elevation": 0,
        "azimuth": 0,
        "rotation": 0,
        "errorDegree": 5.076,
        "x": -1.85,
        "y": 6.5,
        "z": 2.73,
        "modelName": "CL-GA25-P2",
        "realModelName": "CL-GA25-P2",
        "channels": [
          {
            "value": 2402,
            "whitening": true
          }
        ],
        "LAN": {
          "ip": "192.168.123.232",
          "mode": "dhcp",
          "subnetMask": "255.255.255.0",
          "defaultGateway": "192.168.123.1"
        }
      },
      "updatedAt": 1692424942144,
      "online": true
    },
    ...
  },
  "timestamp": 1692424942182
}
```

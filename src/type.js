/** @typedef {Object} IPlugin
 * @property {string} name
 * @property {string} version
 * @property {string} jsPath
 * @property {string} json5Path
 * @property {boolean} enabled
 * @property {boolean} debug 
 * @property {object} status 
 * @property {Logger} logger 
 */

/** @typedef {Object} Logger
 * @property {(...args: any[])=>void} info
 * @property {(...args: any[])=>void} warn
 * @property {(...args: any[])=>void} error
 * @property {(...args: any[])=>void} debug
 * @property {(...args: any[])=>void} trace
 */

/** @typedef {Object} IEnv
 * @property {string} name
 * @property {string} version
 * @property {string} jsPath
 * @property {string} json5Path
 * @property {boolean} enabled
 * @property {boolean} debug 
 */

/** @typedef {Object} IGateway
 * @property {string} mac
 * @property {number[]} angles
 * @property {number} updatedAt
 * @property {Object} [info]
 * @property {string} [info.version]
 * @property {string} info.name
 * @property {string} info.type
 * @property {string} info.mapId
 * @property {string} info.zoneId
 * @property {Array<{value:string;whitening:boolean;}>} info.channels
 * @property {number} info.elevation
 * @property {number} info.azimuth
 * @property {number} info.rotation
 * @property {number} info.errorDegree
 * @property {number} info.x
 * @property {number} info.y
 * @property {number} info.z
 * @property {string} info.modelName
 * @property {Object} [info.wireless]
 * @property {string} info.wireless.status
 * @property {string} info.wireless.type
 * @property {number} info.wireless.rssiLevel
 * @property {number} info.wireless.channel
 * @property {string} [info.wireless.ssid]
 * @property {Object} [info.LAN]
 * @property {string} info.LAN.ip
 * @property {string} info.LAN.mode
 * @property {string} info.LAN.subnetMask
 * @property {string} info.LAN.defaultGateway 
 */
/** @typedef {Object.<string, IGateway>} IGateways */

/** @typedef {Object} IBeaconAoaUserData
 * @property {Object} [0x00]
 * @property {number} 0x00.channel
 * @property {number} 0x00.frequency
 * @property {boolean} 0x00.recv
 * @property {Object} 0x00.power
 * @property {string} 0x00.power.type
 * @property {number} 0x00.power.value
 * @property {boolean} 0x00.sos
 * @property {number} 0x00.battery
 * @property {number} 0x00.lastPressedTS
 * @property {number} [0x00.method]
 * @property {number[]} [0x07]
 * @property {Object} [0x08]
 * @property {number[]} 0x08.gSensors
 * @property {number[]} [0x09]
 * @property {number[]} [0x0a]
 * @property {number[]} [0x0b]
 * @property {number[]} [0x0c]
 * @property {number[]} [0x0d]
 * @property {number[]} [0x0e]
 * @property {number[]} [0x0f] 
 */
/** @typedef {Object} IBeacon
 * @property {number} x
 * @property {number} y
 * @property {number} z
 * @property {string} mapId
 * @property {string} zoneId
 * @property {string} zoneName
 * @property {number} updatedAt
 * @property {number} calculatedAt
 * @property {number} pushedAt
 * @property {IBeaconAoaUserData} userData
 * @property {{[k:number]:number}} userDataTs
 * @property {string} lastGateway
 * @property {string} nearestGateway
 * @property {Object} gps
 * @property {number} gps.lat
 * @property {number} gps.lon 
 */
/** @typedef {Object.<string, IBeacon>} IBeacons */

/**
 * @typedef {import('koa-router')<any, {}>} Router
 */

/** @typedef {Object} IUtils
 * @property {IModules} modules
 * @property {IHttp} http
 * @property {Object} [cpk]
 * @property {(buf:Buffer)=>Buffer} [decryptData]
 * @property {(buf:Buffer)=>Buffer} [encryptData]
 * @property {(plugin:IPlugin)=>Promise<Object>} loadConfig
 * @property {(plugin:IPlugin,config:Object)=>Promise<void>} saveConfig
 * @property {(plugin:IPlugin)=>Promise<void>} updateStatus
 */

/** @typedef {Object} IModules
 * @property {import('glob')} glob
 * @property {import('json5')} json5
 * @property {import('colors/safe')} colors
 * @property {import('moment')} moment
 * @property {import('nanoid')} nanoid
 */

/** @typedef {Object} IHttp
 * @property {Array<(router:Router)=>void} apis
 * @property {(ctx: Context, next: any) => Promise<void>} isAuthenticated
 */
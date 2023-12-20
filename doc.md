<!-- import doc 'docs/clientSideCodeExample.md' -->

<!-- lang zh-CN begin -->
# 订阅
## 订阅格式
> 订阅
```txt
subscribe[:数据格式][:订阅者 ID]

e.g. subscribe:json:John
```
> 取消订阅
```txt
unsubscribe[:订阅者 ID]

e.g. unsubscribe:John
```
## 数据格式
|数据格式|说明|
|---|---|
|json|默认。原始 JSON 格式|
|deflate|使用 deflate 压缩 JSON|
|gzip|使用 gzip 压缩 JSON|
|zlib|同 `deflate`|
|bin|二进制格式|

## 订阅者 ID
默认为 `客户端的 IP`:`客户端的端口`
<!-- lang zh-CN end -->

<!-- lang en-US begin -->
# Subscribe
## Subscribe Structrue
> Subscribe
```txt
subscribe[:Data Format][:Subscriber ID]

e.g. subscribe:json:John
```
> Unsubscribe
```txt
unsubscribe[:Subscriber ID]

e.g. unsubscribe:John
```
## Data Format
|Data Format|Description|
|---|---|
|json|Default. Raw JSON format|
|deflate|Use `deflate` to compress JSON|
|gzip|Use `gzip` to compress JSON|
|zlib|Same as `deflate`|
|bin|Binary format|

## Subscriber ID
Default to `Client side IP`:`Client side port`.
<!-- lang en-US end -->


<!-- import doc 'docs/dataStructureJSON.md' -->
<!-- import doc 'docs/dataStructureBinary.md' -->
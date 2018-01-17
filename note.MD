### 解决native-base 在webStorm不认的方法：
````
In \node_modules\native-base\index.d.ts: comment the imports:

//import * as React from "react";
//import * as ReactNative from "react-native";

declare module "native-base" {

````


https://intellij-support.jetbrains.com/hc/en-us/community/posts/115000489950-JavaScript-Modules-with-Namespaces-Cannot-resolve-symbol


### android 默认的键盘弹出方式是把布局上移，需要调整至和IOS一致，键盘呼出只是覆盖布局。
```
整体上移
android:windowSoftInputMode="adjustResize"

覆盖
android:windowSoftInputMode="adjustPan"

```


### 路由只能嵌套路由，其他嵌套方式会出错


### fetch formData 穿数据的时候，一定要制定 type，如果不指定 android会出错
```
    type:image/*
```

# krry_wall
# 高清壁纸的api，壁纸下载

## 采用瀑布流展示壁纸
### 可下载

- 接入是360浏览器图片api，自动更新，种类繁多
- js瀑布流（纯css瀑布流不支持横向排列展示）
- ajax 更新

## 项目截图
![](https://github.com/Krryxa/krry_wallpaper/blob/master/WebRoot/images/cutImg/1.jpg)
![](https://github.com/Krryxa/krry_wallpaper/blob/master/WebRoot/images/cutImg/2.jpg)


## 接口描述

- 获取壁纸分类
> http://cdn.apc.360.cn/index.php?c=WallPaper&a=getAllCategoriesV2&from=360chrome 
这个接口很简单，直接请求上述网址，就可以得到 json 数据。返回的数据中有个 data 数组，其中的“name”就是获取到的壁纸分类名，“id”就是这个分类对应的ID值。
<br><br><br>


- 根据壁纸分类ID获取分类下壁纸图片
> http://wallpaper.apc.360.cn/index.php?c=WallPaper&a=getAppsByCategory&cid=${分类ID}&start=${从第几张图开始}&count=${每次加载的数量}&from=360chrome
通过这个接口获取到的数据很多，但主要要用到的只有几个。一是 data 数组中的 url 值，就是我们要获取的图片链接。
<br>
它的格式类似于：http://p15.qhimg.com/bdr/__85/t0151ad4ac41239cb58.jpg  
<br>
我们可以根据它来获取这张图片的指定分辨率以及指定画质的图片，以上图为例，如果我们要获取分辨率为 1024*768 ，画质为 80 (最高为100)的图片，只需将上述链接的 “bdr/__85” 替换为 “bdm/1024_768_80” 即可。替换后的图片链接如下：
> http://p19.qhimg.com/bdm/1024_768_80/t0151ad4ac41239cb58.jpg  
除去 url 值，data 数组中的 tag 是图片对应的标签，如果需要也可以进行获取。
<br><br><br>


- 获取最近更新的壁纸
> http://wallpaper.apc.360.cn/index.php?c=WallPaper&a=getAppsByOrder&order=create_time&start=${从第几张图开始}&count=${每次加载的数量}&from=360chrome
这个接口的参数是固定的，并且获取到的数据格式与上面一个接口一样。这里就不再描述了
<br><br><br>


- 项目地址：https://www.ainyi.com/krry_wallpaper
- My blog：https://www.ainyi.com

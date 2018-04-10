
/*
	加载图片
*/


var krryimg = {
	start:0, //从第0张图片开始
	count:20,//每次加载20张图片
	timer:null, //加载的定时器
	cid:false, //分类id，默认是false 不分类
	//加载图片
	pics360:function(start,count,cid){
		//小图片展示的尺寸数据
		var pxarr = {"1":"512_384_85","2":"640_400_85","3":"720_450_85","4":"800_450_85"};
		var url = "";
		//如果cid不存在，则加载360最新图片
		if(!cid) url = `http://wallpaper.apc.360.cn/index.php?c=WallPaper&a=getAppsByOrder&order=create_time&start=${start}&count=${count}&from=360chrome`;
		//否则加载360分类中的图片
		else url = `http://wallpaper.apc.360.cn/index.php?c=WallPaper&a=getAppsByCategory&cid=${cid}&start=${start}&count=${count}&from=360chrome`;

		$.ajax({
			url:"krry/WallPaper",
			type:"get",
			data:{url:url},
			success:function(data){
				var obj = eval('(' + data + ')');
				var pic = obj.data;
				if(pic.length == 0){
					loading("全部加载完了哦~",5);
					return;
				}
				var html = "";
				for(pics of pic){
					//获取标签
					var rag = pics["utag"];
					//获取图片地址
					var picurl = pics["img_1600_900"];
					//随机数取一半的像素
					var ram = Math.floor(Math.random()*4)+1;
					var pxwh = pxarr[""+ram+""];
					//替换成小图片展示
					var smallpicurl = picurl.replace("1600_900_85",pxwh);
					//截取宽度高度字符串
					var height = pxwh.substring(4,7);
					var width = pxwh.substring(0,3);
					//1920x1080
					var berpic = picurl.replace("1600_900_85","1920_1080_100");
					//1440x900
					var bigpic = picurl.replace("1600_900_85","1440_900_100");
					//1024x768
					var midpic = picurl.replace("1600_900_85","1024_768_100");
					//800x600
					var smapic = picurl.replace("1600_900_85","800_600_100");
					//原图
					var orapic = pics["url_thumb"];
					html += 
						`<div class="item" data-hei="${height}" data-wid="${width}"> 
							<img class="lazy" data-original=${smallpicurl} alt="${rag}" onclick="layerbigImg(this);"/>
							<ul class="down" title="下载壁纸">
								<li>
									<a href="http://image.baidu.com/search/down?tn=download&word=download&ie=utf8&fr=detail&url=${berpic}" target="_blank">1920x1080</a>
								</li>
								<li>
									<a href="http://image.baidu.com/search/down?tn=download&word=download&ie=utf8&fr=detail&url=${bigpic}" target="_blank">1440x900</a>
								</li>
								<li>
									<a href="http://image.baidu.com/search/down?tn=download&word=download&ie=utf8&fr=detail&url=${midpic}" target="_blank">1024x768</a>
								</li>
								<li>
									<a href="http://image.baidu.com/search/down?tn=download&word=download&ie=utf8&fr=detail&url=${smapic}" target="_blank">800x600</a>
								</li>
								<li>
									<a href="http://image.baidu.com/search/down?tn=download&word=download&ie=utf8&fr=detail&url=${orapic}" target="_blank" title="下载原图">原图</a>
								</li>
							</ul>
						</div>`;
				}
				//如果是下拉滚动条加载，就从后面append，
				if(krryimg.start>0) $("#masonry").append(html);
				//否则是点击了一个按钮，重新加载
				else $("#masonry").html(html);
				
				$(".lazy").lazyload({
					effect:'fadeIn',
					threshold: 200 // 提前开始加载
				});
				//执行瀑布流
				waterFall();
			}
			
		});
		
	}
};


//ajax加载360壁纸分类
function ajax360Tags(){
	var url = "http://cdn.apc.360.cn/index.php?c=WallPaper&a=getAllCategoriesV2&from=360chrome";
    $.ajax({
        type: "get", 
        url: "krry/WallPaper",
        data:{url:url},
        dataType : "json",
        success: function(jsonData){
            var newHtml = '';
            for (var i = 0; i < jsonData.data.length; i++){
                newHtml += `<li data-id="${jsonData.data[i].id}" onclick="loadTagData(${jsonData.data[i].id});changeTitle('${jsonData.data[i].name}')">${jsonData.data[i].name}</li>`;
            }
            newHtml += `<div class="clearfix"></div>`;
            $("#tags").append(newHtml);
        }
    });
    return true;
}


//鼠标滑到分类标签。展开分类列表
$(".notag").hover(function(){
	$("#tags").stop(true).toggle(300);
});

//改变页面顶部的小标题
function changeTitle(title){
	$(".header .h_left").text(title);
}

//点击加载最新壁纸
$(".new360").click(function(){
	//设置krryimg中的cid
	krryimg.cid = false;
	//改变标题
	changeTitle($(this).text());
	krryimg.start = 0;
	krryimg.pics360(krryimg.start,krryimg.count,krryimg.cid);//加载360分类中的图片
	$("body").animate({scrollTop: 0}, 200);//滚动条置顶
});


//加载360分类中的图片
function loadTagData(cid){
	//设置krryimg中的cid
	krryimg.cid = cid;
	krryimg.start = 0;
	krryimg.pics360(krryimg.start,krryimg.count,krryimg.cid);//加载360分类中的图片
	$("body").animate({scrollTop: 0}, 200);//滚动条置顶
}


//点击图片变大
function layerbigImg(obj){
	var url = $(obj).attr("src");
	var index = url.lastIndexOf("/");
	url = url.substring(index,url.length); //截取到一个文件名
	url = `http://p18.qhimg.com/bdm/940_600_100${url}`; //拼接上路径，并设置大小为940x600，画质100
	//页面层-自定义
	layer.open({
		type: 1,
		title: false,
		closeBtn: 2,
		shadeClose: true,
		area: ['940px', '600px'],
		content: `<img class="lazy" src="${url}" style="display: inline;">`
	});
}



//瀑布流效果
//这里有一个坑（已经修复）：
//因为是动态加载远程图片，在未加载完全无法获取图片宽高
//未加载完全就无法设定每一个item(包裹图片)的top。

//item的top值：第一行：top为0
//			   其他行：必须算出图片宽度在item宽度的缩小比例，与获取的图片高度相乘，从而获得item的高度
//				       就可以设置每张图片在瀑布流中每块item的top值（每一行中最小的item高度，数组查找）
//item的left值：第一行：按照每块item的宽度值*块数，
//		 	      其他行：与自身上面一块的left值相等

//因为无法获取未加载的图片宽高，所以我的方法是：
//获取的图片高度方法：在加载图片时，我已经设置宽高的数组pxarr，随机数获取不同的尺寸来展示
//这里获取的宽度和高度是小图片展示的宽高，
//然后截取字符串，获得图片宽度和高度，放进item标签的data数据中，
//再在瀑布流的item标签循环中得到这个data数据中的宽高
function waterFall() {
    // 1- 确定图片的宽度 - 滚动条宽度
    var pageWidth = getClient().width-8;
    var columns = 3; //3列
    var itemWidth = parseInt(pageWidth/columns); //得到item的宽度
    $(".item").width(itemWidth); //设置到item的宽度
    
    var arr = [];

    $("#masonry .item").each(function(i){
    	var height = $(this).data("hei");
    	var width = $(this).data("wid");
    	var bi = itemWidth/width; //获取缩小的比值
    	var boxheight = parseInt(height*bi); //图片的高度*比值 = item的高度

    	if (i < columns) {
            // 2- 确定第一行
        	$(this).css({
        		top:0,
        		left:(itemWidth) * i
        	});
            arr.push(boxheight);

        } else {
            // 其他行
            // 3- 找到数组中最小高度  和 它的索引
            var minHeight = arr[0];
            var index = 0;
            for (var j = 0; j < arr.length; j++) {
                if (minHeight > arr[j]) {
                    minHeight = arr[j];
                    index = j;
                }
            }
            // 4- 设置下一行的第一个盒子位置
            // top值就是最小列的高度 
            $(this).css({
        		top:arr[index],
        		left:$("#masonry .item").eq(index).css("left")
        	});

            // 5- 修改最小列的高度 
            // 最小列的高度 = 当前自己的高度 + 拼接过来的高度
            arr[index] = arr[index] + boxheight;
        }
    });
    //加载动画消失
    tzUtil.animates($("#tzloading"),"slideUp");
}


//当滚动条到达距离底部180px时
$(window).scroll(function(){
	//清除定时器
	clearTimeout(krryimg.timer);
	//可视高度
    var cheight = window.innerHeight;
    // 滚动条高度
    var ctop = document.body.scrollTop;

   //文档的高度，到达底部
   	if(cheight+ctop+10 > document.body.scrollHeight){
   		loading("加载中...",5);
   		krryimg.timer = setTimeout(function(){
   			//每次加载20张，每次加载的起点增加20
   	   		krryimg.start += 20;
   	   		krryimg.pics360(krryimg.start,krryimg.count,krryimg.cid);
   		},200);
 		
   	}
});


//clientWidth 处理兼容性
function getClient() {
    return {
        width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
        height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    }
}



 // 页面尺寸改变时实时触发
window.onresize = function() {
	//重新定义瀑布流
	waterFall();
};



//初始化
window.onload = function(){
	loading("加载中...",5);
	krryimg.pics360(krryimg.start,krryimg.count,false); //加载最新图片,false代表加载最新图片
	ajax360Tags();//360图片分类
}


//判断非空
function isEmpty(val) {
    val = $.trim(val);
    if (val == null)
        return true;
    if (val == undefined || val == 'undefined')
        return true;
    if (val == "")
        return true;
    if (val.length == 0)
        return true;
    if (!/[^(^\s*)|(\s*$)]/.test(val))
        return true;
    return false;
}


<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<!doctype html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
		<meta name="Keywords" content="关键词,关键词">
		<meta name="Description" content="网页描述">
		<title>桌面壁纸</title>
	
		<!--通用样式-->
		<link rel="stylesheet" href="css/comment.css"/>
		<!--本页面样式-->
		<link rel="stylesheet" type="text/css" href="css/style.css">
		<!--加载动画样式-->
		<link rel="stylesheet" type="text/css" href="css/kr-loading.css">
		<!-- layer弹窗插件 -->
		<link rel="stylesheet" href="js/layer/skin/default/layer.css?v=3.0.2302" id="layuicss-skinlayercss">
		<!-- jQuery -->
	    <script src="js/jquery-1.11.2.min.js"></script>
	</head>
	<body>
		<div class="header">
			<div class="h_left">最新壁纸</div>
			<ul class="h_right">
				<li class="h_r_no new360">最新壁纸</li>
				<li class="h_r_no notag">
					分类
					<ul id="tags"></ul>
				</li>
				<li class="h_r_no"><a href="https://ainyi.com" target="_blank">Krryblog</a></li>
			</ul>
		</div>
		<!-- 放图片 -->
		<div id="masonry"> 
			
		</div>

		<!--加载动画js-->
		<script type="text/javascript" src="js/util/kr_util.js"></script>
		<script type="text/javascript" src="js/util/sg.js"></script>

	    <!--滚动延迟加载-->
	    <script type="text/javascript" src="js/jquery.lazyload.min.js"></script>
		<!-- layer弹窗插件 -->
		<script src="js/layer/layer.js"></script>
	    <!--本页面js-->
		<script type="text/javascript" src="js/krry.js"></script>
	</body>
</html>

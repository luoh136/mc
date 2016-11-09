$(function(){
	//播放暂停按钮
	$(".play").on('touchend',function(){
		if($(".audio")[0].paused){
			$(".audio")[0].play();
			$(".play i").html("&#xe602;").css("lineHeight","1.2rem");
		}else{
			$(".audio")[0].pause();
			$(".play i").html("&#xe62e;").css("lineHeight","1.3rem");
		}	
	})
	
	//音量显隐
	$(".vol-btn").on("touchstart",function(){
		$('.volume').toggle();
		return false;
	})
	//静音切换
	$(".jingyin").on("touchstart",function(){
		if($(this).attr("data-v")){
			$(".audio")[0].volume=$(this).attr("data-v");
			$(this).removeAttr("data-v");
			$(this).children("i").html("&#xe63d;")
		}else{
			$(this).attr("data-v",$(".audio")[0].volume);
			$(".audio")[0].volume=0;
			$(this).children("i").html("&#xe63b;")
		}
		return false;
	})
	//点击控制音量
	$('.volume').on("touchstart",function(e){
		var h=$('.volume').height()-(e.originalEvent.changedTouches[0].clientY-$('.volume').offset().top);
		$(".audio")[0].volume=h / $('.volume').height();
		//清除静音设置的值
		$(".jingyin").removeAttr("data-v");
		return false;
	})
	$(".v-i").on("touchstart",function(e){
		//var star=e.offset().top-$(".v-i").width()/2;
		
		$(document).on("touchmove",function(e){
			var top=$('.volume').height()-(e.originalEvent.changedTouches[0].clientY-$('.volume').offset().top);			
			if(top / $('.volume').height()>1||top / $('.volume').height()<0){
				return;
			}	
			$(".audio")[0].volume=top / $('.volume').height();
		})
		return false;
	})
	$(document).on("touchend",function(){
		$(document).off("touchmove")
	})
	$('.v-i').css("top",-($('.v-i').width()/2));
	$(".audio").on("volumechange",function(){
		$('.v-i').css("top",$('.volume').height()-$('.volume').height() * $(".audio")[0].volume - $('.v-i').width()/2);
	})
	//点击控制播放时间
	$(".progress").on("touchstart",function(e){
		var left=e.originalEvent.changedTouches[0].clientX-$(".progress").offset().left;
		$(".audio")[0].currentTime=$(".audio")[0].duration*(left/ $(".progress").width());
	})
	$('.p-i').on("touchstart", function(e) {
		$(document).on("touchmove", function(e) {
			var m = e.originalEvent.changedTouches[0].clientX;
			var left = m - $(".progress").offset().left;
			var c = left / $(".progress").width() * $(".audio")[0].duration;
			if (c >= $(".audio")[0].duration) {
				return;
			}
			$(".audio")[0].currentTime = c;
		})
		return false;
	})	
	//歌曲列表
	var active=0;
	var musics=[
		{name:'safe and sound',author:'Taylor Swift',src:'./music/ts.mp3'},
		{name:'花开半夏',author:'爱朵女孩',src:'./music/ts1.mp3'},
		{name:'夜空中最亮的星',author:'逃跑计划',src:'./music/ts3.mp3'}
	];
	//歌曲输出到页面
	function render(){
		$(".mc").empty();
		for(var i=0;i<musics.length;i++){	
			$(".audio")[0].src=musics[active].src
			var cl=(i===active)?"current-music":"";
			$(".hmid").html(musics[active].name);
			$(".hbottom span").html(musics[active].author);	
			$("<li class='plist "+cl+"'><span class='geming'>"+musics[i].name+"</span><span class='zuoz'>"+musics[i].author+"</span><span class='shanc'>x</span></li>").appendTo($(".mc"));
	    }
	}
	render()
	
	//播放列表
	$(".lists").on("touchend",function(){
		$(".play-lists").slideToggle("fast");	
	})
	$(".close").on("touchend",function(){
		$(".play-lists").slideToggle("fast");
		return false;
	})
	$('.mc').on("touchend","li",function(){
		active=$(this).index();
		$('.mc li').removeClass('current-music')
		$(this).addClass('current-music')
		$(".audio")[0].src=musics[active].src;
	})
	
	//点击上下按钮切换歌曲
	$(".pre i").on("touchend",function(){
		active--;
		if(active<0){
			active=musics.length-1;
		}
		render();	
		return false;
	})
	$(".next i").on("touchend",function(){
		active++;
		if(active>=musics.length){
			active=0;
		}
		render();
		return false;
	})
	
	//删歌
	$(".mc").on("touchend", ".shanc", function() {
		var li = $(this).closest("li");
		var index = li.index();
		musics.splice(index, 1);
		if (index == active) {
			if (musics[active]) {
				$(".audio")[0].src = musics[active].src;
			} else {
				$(".audio")[0].src = " ";
			}
		} else if (index > active) {

		} else if (index < active) {
			active -= 1;
		}
		render();
		return false;
	})
	
	$(".audio").on("loadstart",function(){
		$(".play i").html("&#xe602;").css("lineHeight","1.2rem");
		$(".mtop").css("backgroundImage","url(./img/"+active+".jpg)")
	})
	
	//设置进度条
	$(".audio").on('timeupdate',function(){
		//总时间
		var s=Math.floor($(".audio")[0].currentTime % 60);
		var sec=(s<10)?("0"+s):s;
		var m=Math.floor($(".audio")[0].currentTime / 60);
		$(".current-time").html(m+':'+sec);
		//播放时间
		var t=Math.floor($(".audio")[0].duration % 60);
		var st=(t<10)?("0"+t):t;
		var mt=Math.floor($(".audio")[0].duration / 60);
		$(".duration").html(mt+':'+st);
		//播放时间条
		$(".p-ib").css("width",$(".audio")[0].currentTime / $(".audio")[0].duration * $(".progress").width());    
		$(".p-i").css("left",$(".audio")[0].currentTime / $(".audio")[0].duration * $(".progress").width());
	})
})

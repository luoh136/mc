$(function(){
	//切换播放状态
	$(".play").on('touchend',function(){
		if($(".audio")[0].paused){
			$(".audio")[0].play();
			$(".play i").html("&#xe602;").css("lineHeight","1.2rem");
		}else{
			$(".audio")[0].pause();
			$(".play i").html("&#xe62e;").css("lineHeight","1.3rem");
		}	
	})
	$(".love").on('touchend',function(){
		$(this).toggleClass("xinh");
	})
	//获取设置播放时间  改变播放进度条
	$(".audio").on('timeupdate',function(){
		var s=Math.floor($(".audio")[0].currentTime % 60);
		var sec=(s<10)?("0"+s):s;
		var m=Math.floor($(".audio")[0].currentTime / 60);
		$(".current-time").html(m+':'+sec);
		
		var t=Math.floor($(".audio")[0].duration % 60);
		var st=(t<10)?("0"+t):t;
		var mt=Math.floor($(".audio")[0].duration / 60);
		$(".duration").html(mt+':'+st);
	    
		$(".p-i").css("left",$(".audio")[0].currentTime / $(".audio")[0].duration * $(".progress").width());
	    //自动播放下一首  有点时间差问题
		if($(".audio")[0].currentTime>$(".audio")[0].duration-1){
			active++;
			if(active>=musics.length){
				active=0;
			}
			$(".audio")[0].src=musics[active].src;
			$('.music li').removeClass('current-music');
			$('.music li').eq(active).addClass('current-music');
			localStorage.music=JSON.stringify(active);
		}
	})
	//音量
	$(".vol-btn").on("touchend",function(){
		$('.volume').toggle("fast");
	})
	$(".vol-btn").children('div').on("touchend",false)
	//声音设置
	$('.volume').on("touchend",function(e){
		var h=e.originalEvent.changedTouches[0].clientY-$('.volume').offset().top;
		$(".audio")[0].volume=h / $('.volume').height();
		//清除静音设置的值
		$(".jingyin").removeAttr("data-v");
	})
	
	$(".progress").on("touchend",function(e){
		$(".audio")[0].currentTime=e.offsetY / $(".progress").height() * $(".audio")[0].duration;
	})
	//给静音按钮设置自定属性
	$(".jingyin").on("touchend",function(){
		if($(this).attr("data-v")){
			$(".audio")[0].volume=$(this).attr("data-v");
			$(this).removeAttr("data-v")
		}else{
			$(this).attr("data-v",$(".audio")[0].volume);
			$(".audio")[0].volume=0;
		}
	})
	
	$('.v-i').on("click",false);
	//拖动声音按钮
	$(".v-i").on("mousedown",function(e){
		var star=e.offsetX;
		$(document).on("mousemove",function(e){
			var left=e.clientX-$('.volume').offset().left;
			
			if(left / $('.volume').width()>1||left / $('.volume').width()<0){
				return;
			}
			$(".audio")[0].volume=left / $('.volume').width();
		})
		return false;
	})
	$('.p-i').on("click",false)
	//拖动播放条按钮
	$(".p-i").on("mousedown",function(e){
		var star=e.offsetX;
		$(document).on("mousemove",function(e){
			var left=e.clientX-star-$(".progress").offset().left;
			if(left / $(".progress").width()>1){
				return;
			}
			$(".audio")[0].currentTime=$(".audio")[0].duration*(left / $(".progress").width());
		})
		return false;
	})
	$(document).on("mouseup",function(){
		$(document).off("mousemove")
	})
	//改变声音按钮位置
	$('.v-i').css("left",$('.volume').width() * $(".audio")[0].volume - $('.v-i').width()/2);
	$(".audio").on("volumechange",function(){
		$('.v-i').css("left",$('.volume').width() * $(".audio")[0].volume - $('.v-i').width()/2);
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
		$(".music").empty();
		$('.mc')
		for(var i=0;i<musics.length;i++){	
			if(localStorage.music){
				active=JSON.parse(localStorage.music)
			}
			$(".audio")[0].src=musics[active].src
			var cl=(i===active)?"current-music":"";
			
			$("<li class='plist "+cl+"'><span class='geming'>"+musics[i].name+"</span><span class='zuoz'>"+musics[i].author+"</span><span class='shanc'>x</span></li>").appendTo($(".mc"))
			$("<li class="+cl+"><span>"+musics[i].name+"</span><span>"+musics[i].author+"</span></li>").appendTo($(".music"))
	    }
	}
	render()
	
	//点击列表切换歌曲
	$('.music').on("touchend","li",function(){
		active=$(this).index();
		$('.music li').removeClass('current-music')
		$(this).addClass('current-music')
		$(".audio")[0].src=musics[active].src;
		localStorage.music=JSON.stringify(active);
	})
	$('.mc').on("touchend","li",function(){
		active=$(this).index();
		$('.mc li').removeClass('current-music')
		$(this).addClass('current-music')
		$(".audio")[0].src=musics[active].src;
		localStorage.music=JSON.stringify(active);
	})
	//点击上下按钮切换歌曲
	$(".pre").on("click",function(){
		active--;
		if(active<0){
			active=musics.length-1;
		}
		$(".audio")[0].src=musics[active].src;
		$('.music li').removeClass('current-music');
		$('.music li').eq(active).addClass('current-music');
		localStorage.music=JSON.stringify(active);	
		return false;
	})
	$(".next").on("click",function(){
		active++;
		if(active>=musics.length){
			active=0;
		}
		$(".audio")[0].src=musics[active].src;
		$('.music li').removeClass('current-music');
		$('.music li').eq(active).addClass('current-music');
		localStorage.music=JSON.stringify(active);
		return false;
	})
	
	//播放列表
	$(".lists").on("touchend",function(){
		$(".play-lists").css("display","block")
		$(".mtop").css("background","url(img/"+active".jpg)")
	})
	$(".close").on("touchend",function(){
		$(".play-lists").css("display","none");
		return false;
	})
})

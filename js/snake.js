$(function(){
	var s='';
	for (var i=0;i<20;i++){
		for (var j=0;j<20;j++){
			var id=i+'_'+j;
			s+='<div id="'+id+'" class="block"><div class="box"></div></div>'
		}
	}
	$('#sence').html(s);
	snake=[{x:10,y:9},{x:10,y:10},{x:10,y:11}];
	var data={'10_9':true,'10_10':true,'10_11':true};
	var huashe  = function(){
		$.each(snake,function(index,value){
			$('#'+ value.x + '_'+ value.y).css({border:'2px solid #880e4f',opacity:1});
		})
	}
	huashe();
	var dropFood = function() {
		var x = Math.floor(Math.random()*20);		
		var y = Math.floor(Math.random()*20);		
		while( data[x+'_'+y] ){
			x = Math.floor(Math.random()*20);		
			y = Math.floor(Math.random()*20);		
		}
		$('#'+x+'_'+y).css({border:'2px solid purple',opacity:1});
		return {x:x,y:y};
	}	
	var food = dropFood();
	var fangxiang=39;
	var move=function(){
		var oldTou=snake[snake.length-1];
		if (fangxiang=='39') {
			var newTou={x:oldTou.x,y:oldTou.y+1};
		}
		if(fangxiang == 40 ){
			var newTou = {x:oldTou.x+1,y:oldTou.y};
		}
		if(fangxiang == 37){
			var newTou = {x:oldTou.x,y:oldTou.y-1};
		}
		if(fangxiang == 38){
			var newTou = {x:oldTou.x-1,y:oldTou.y};
		}
		if(newTou.x<0||newTou.y<0||newTou.x>19||newTou.y>19||data[newTou.x+'_'+newTou.y]){
			alert('GAME OVER!');
			clearInterval(timerId);
			return;
		}
		if(newTou.x == food.x && newTou.y == food.y){
			food = dropFood();
		}else{
			var weiba = snake.shift();
			delete data[weiba.x+'_'+weiba.y];
			$('#'+weiba.x+'_'+weiba.y).css({border:'2px solid #880e4f',opacity:0.2});
		}
		snake.push(newTou);
		data[newTou.x + '_' + newTou.y] = true;
		$('#'+newTou.x + '_' + newTou.y).css({border:'2px solid #880e4f',opacity:1});
	}

	var kaiguan = false;
	$(document).keydown(function(e){
		if( Math.abs(e.keyCode - fangxiang) == 2 ){
			return;
		}
		if( !(e.keyCode>=37 && e.keyCode<=40 ) ){
			return;
		}
		if(!kaiguan){
			timerId = setInterval(move,150);
			kaiguan = !kaiguan;
		}
	    fangxiang = e.keyCode;
	})

	//-----------------------------------------------------------
	
	$('#inGame').click(function(){
	      $('#home').css({transform:'translateY(-700px)',transition:' all 1s cubic-bezier(1, 0.08, 0.24, 1.1)'});
	});
	$('#home').bind('mousedown',function(ev){
        ev.preventDefault();
    })
})
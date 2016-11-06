$(function(){
  var todos=[];
  // var str='LXQ1220';
  var first=$('.first');
  var second=$('.second');
  var cover=$('.cover');
  var pas=cover.find('input');
  var feedin=second.find('input');
  var login=cover.find('.c-login');
  var adds=second.find('.n-add');
  var lists=second.find('.list');
  var v;
  var  left=null;
  var index;
  var date=new Date();
  var m=date.getMonth()+1;
  var d=date.getDate();
  var security=first.find('.header-right');
  security.on('click',function(){
      cover.find('.c-write').addClass('active');
    })
  cover.find('.c-write .can').on('click',function(){
      var vt=cover.find('.set').blur().val();
      var ft=cover.find('.config').blur().val();
      if(vt===ft&&!ft.type(undefined)){
          cover.find('.c-write').removeClass('active');
          localStorage.userpwd=ft;
      }else{
          alert('密码输入不一致！');
      }
  })
  cover.find('.c-write .cancel').on('click',function(){
      cover.find('.c-write').removeClass('active');
    })
  login.on('click',function(){
      var ct=pas.blur().val();
      if(ct===localStorage.userpwd){
          first.addClass('leave');
          second.addClass('right');
      }else if(ct===''){
          alert('请输入密码！');
      }else{
          alert('密码错误！');
      }

    })
  adds.on('click',function(){
      $('.show').addClass('active');
      // $('.show').css('display','block');
    })
  feedin.on('blur',function (){
      v=feedin.val();
    })
    if(localStorage.todo_data){
        todos=JSON.parse(localStorage.todo_data);
        render();
    }else{
        localStorage.todo_data=JSON.stringify(todos);
    }
    function  render(){
        lists.empty();
        $.each(todos,function(i,v){
            $('<li><span>'+v.title+'</span><div class="time">'+v.time+'</div></li>')
                .appendTo(lists);
        })
    }
    function add(){
        todos.push({title:v,time:m+'/'+d});
        localStorage.todo_data=JSON.stringify(todos);
    }
  $('.show').find('.can').on('click',function(){
      $('.show').removeClass('active');
      if(v===''){
          return;
      }else{
          add();
          feedin.val('');
      }
    })
  $('.show').find('.cancel').on('click',function(){
      $('.show').removeClass('active');
    })
  lists.on('click','li',function(){
      $('.n-del').addClass('active');
      index=$(this).index();
  })
  $('.n-del').find('.can').on('click',function(){
        $('.n-del').removeClass('active');
        lists.find('li').eq(index).addClass('dele').delay(500).queue(function(){
            $(this).removeClass().dequeue();
            $(this).remove();
        })
      todos.splice(index,1);
      localStorage.todo_data=JSON.stringify(todos);
    })
  $('.n-del').find('.all').on('click',function(){
        $('.n-del').removeClass('active');
        lists.find('li').remove();
        todos=[];
        localStorage.todo_data=JSON.stringify(todos);
    })
  $('.n-del').find('.change').on('click',function(){
        $('.n-del').removeClass('active');
        $('.amend').addClass('active');
        $('.amend').find('input').val(lists.find('li').eq(index).find('span').text());
    })
  $('.amend').find('.can').on('click',function(){
        $('.amend').removeClass('active');
        var con=$('.amend').find('input').blur().val();
        lists.find('li').eq(index).find('span').text(con);
        todos[index].title=con;
        lists.find('li').eq(index).find('.time').text(m+'/'+d);
        localStorage.todo_data=JSON.stringify(todos);
    })
  $('.amend').find('.cancel').on('click',function(){
        $('.amend').removeClass('active');
    })
  $('.n-del').find('.cancel').on('click',function(){
      $('.n-del').removeClass('active');
    })
  lists.on('touchstart','li',function(e){
      left=e.originalEvent.changedTouches[0].pageX;
  })
  lists.on('touchmove','li',function(e){
     var n=e.originalEvent.changedTouches[0].pageX;
          $(this).css('transform','translate3d('+n+'px,0,0)');
    })
  lists.on('touchend','li',function(e){
        var n=e.originalEvent.changedTouches[0].pageX;
        var x=n-left;
        if(x>140){
            lists.find('li').eq(index).addClass('dele').delay(500).queue(function(){
                $(this).removeClass().dequeue();
                $(this).remove();
            })
            todos.splice(index,1);
            localStorage.todo_data=JSON.stringify(todos);
        }else{
        $(this).css('transform','translate3d(0,0,0)');
        $(this).css('transition','transform .8s ease');
        $(this).delay(800).queue(function(){
            $(this).css('transition','none').dequeue();
        })
        }
    })
})
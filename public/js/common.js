define(['jquery','template','cookie'],function($,template){

    // NProgress.start();
    // NProgress.done();

    // 控制左侧导航菜单折叠和展开
    $('.navs ul').prev('a').on('click', function () {
        $(this).next().slideToggle();
    });

        // 实现退出功能

     $('#logoutBtn').click(function(){
            $.ajax({
                type : 'post',
                url : '/api/logout',
                dataType : 'json',
                success : function(data){
                    if(data.code == 200){
                        // 退出成功
                        location.href = '/main/login';
                    }
                }
            });
              return false;
        });

     //     验证是否登录
     var sessionId = $.cookie('PHPSESSID');
      // console.log(sessionId); 
     if(!sessionId && location.pathname != '/main/login'){
        location.href = '/main/login';
     }

     // 获取用户信息 并填充页面
     // 判断一下是否有cookie
     var cookie = $.cookie('loginInfo');
     var loginInfo = cookie?JSON.parse(cookie):{};
     // console.log(loginInfo);
    // $('.profile img').attr('src',loginInfo.tc_avatar);
    // $('.profile h4').html(loginInfo.tc_name);

    // 头像处理
    var tpl = '<div class="avatar img-circle"><img src="{{tc_avatar}}"></div><h4>{{tc_name}}</h4>'

    var html = template.render(tpl,loginInfo);
    $('#profileId').html(html);
});
	




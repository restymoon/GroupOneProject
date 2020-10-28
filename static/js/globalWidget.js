// 右侧组件
$('.new-global-widget .to-top').click(function(){
    $('body,html').animate({'scrollTop':0},500)
})
var windowHeight = window.screen.availHeight;

if($(window).scrollTop() >= windowHeight){
        $(".new-global-widget .to-top").css('display','block');
    }else{
        $(".new-global-widget .to-top").css('display','none');
}
$(window).scroll(function(){
    if($(window).scrollTop()>=windowHeight){
        $(".new-global-widget .to-top").css('display','block');
    }else{
        $(".new-global-widget .to-top").css('display','none');
    }
})
// 如果入口是 在iframe中 ，就隐藏页头，并且在 在iframe中 显示内容
if (self != top) { 
    $('.new-global-widget').hide();
}
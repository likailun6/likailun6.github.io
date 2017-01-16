ready(function(){
  
        $('#section_wrap').fullpage({
            anchors: ['1', '2', '3', '4', '5', 'footer'],
            'navigation': true,
            'resize': false,
            'verticalCentered': false
        });
        for (var i = 0; i < 5; i++) {
            $('#fp-nav ul li').eq(i).addClass('li_' + i)
        }

        // 第二屏我的专业技能
        $(".skill_list b").click(function () {
            $(".skill_int").each(function () {
                if ($(this).is(":visible")) {
                    $(this).slideUp(200);
                    $(this).prev().removeClass("skill_flag_scale");
                }
            });
            if ($(this).siblings(".skill_int").is(":hidden")) {
                $(this).siblings(".skill_int").slideDown(600);
                $(this).siblings(".skill_flag").addClass("skill_flag_scale");
            } else {
                $(this).siblings(".skill_int").slideUp(200);
                $(this).siblings(".skill_flag").removeClass("skill_flag_scale");
            }
        });

        //第四屏--我的特效切换

        var page = 1;
        $("#js_timeline a").click(function () {
            $(".js_list_content").stop(true, false).animate({left: -$(".js_list").width() * $(this).index()}, 1000);
            page = $(this).index() + 1;
        })
        //上一个
        $('#prev').click(function () {
            if (!$(".js_list_content").is(":animated")) {
                if (page == 1) {
                    $(".js_list_content").animate({
                        left: "+=50"
                    }, 200, function () {
                        $(this).animate({
                            left: "-=50"
                        }, 200);
                    });
                    return false;
                }
                $(".js_list_content").animate({
                    left: "+=" + $(".js_list").width()
                });
                page--;
            }
        });

        //下一个
        $('#next').click(function () {
            if (!$(".js_list_content").is(":animated")) {
                if (page == 3) {
                    $(".js_list_content").animate({
                        left: "-=50"
                    }, 200, function () {
                        $(this).animate({
                            left: "+=50"
                        }, 200);
                    });
                    return;
                }
                $(".js_list_content").animate({
                    left: "-=" + $(".js_list").width()
                });
                page++;
            }
        });
   


    //第五屏--我的作品（拉钩效果）
    ;(function(){
        var oUl=document.querySelector('#demo_content');
        var aLi=oUl.querySelectorAll('li');

        for(var i=0;i<aLi.length;i++)
        {
            enter(aLi[i]);
            leave(aLi[i]);
        }

        function enter(obj){
            var olgSpan=obj.getElementsByClassName('lg')[0];
            obj.onmouseenter=function(ev){
                var oEvent=ev||event;
                var n=getN(obj, oEvent);

                switch (n)
                {
                    case 0:
                        olgSpan.style.left=obj.offsetWidth+'px';
                        olgSpan.style.top=0;

                        break;

                    case 1:
                        olgSpan.style.left=0;
                        olgSpan.style.top=obj.offsetHeight+'px';
                        break;

                    case 2:
                        olgSpan.style.left=-obj.offsetWidth+'px';
                        olgSpan.style.top=0;
                        break;

                    case 3:
                        olgSpan.style.left=0;
                        olgSpan.style.top=-obj.offsetHeight+'px';
                        break;
                }

                move(olgSpan, {top:0, left:0},{duration:300});
            }
        }

        function leave(obj){
            var olgSpan=obj.getElementsByClassName('lg')[0];

            obj.onmouseleave=function (ev){
                var oEvent=ev || event;
                var n=getN(obj, oEvent);
                switch (n)
                {
                    case 0: // right
                        move(olgSpan, {left:300, top:0},{duration:300});
                        break;

                    case 1: // bottom
                        move(olgSpan, {top:200, left:0},{duration:300});
                        break;

                    case 2: // left
                        move(olgSpan, {top:0, left:-300},{duration:300});
                        break;

                    case 3: // top
                        move(olgSpan, {top:-200, left:0},{duration:300});
                        break;
                }
            };
        }

        function getN(obj, ev)
        {
            var x=obj.offsetLeft+obj.offsetWidth/2-ev.clientX;
            var y=obj.offsetTop+obj.offsetHeight/2-ev.clientY;
            return Math.round((d2a(Math.atan2(y, x))+180)/90)%4;
        }
        function d2a(d)
        {
            return d*180/Math.PI;
        }
    })();
});
//ready
function ready(fn)
{
    if (document.addEventListener)
    {
        document.addEventListener('DOMContentLoaded', fn, false);
    }
    else
    {
        document.onreadystatechange=function (){
            if (document.readyState == 'complete')
            {
                fn();
            }
        };
    }
}
//运动
function move(obj,json,options)
{
    options=options||{};
    var duration=options.duration||1000;
    var easing=options.easing||Tween.Linear;

    var start={};
    var dis={};
    for(var name in json)
    {
        start[name]=parseFloat(getStyle(obj,name));
        if(isNaN(start[name])){
            switch(name){
                case 'left':
                    start[name]=obj.offsetLeft;
                    break;
                case 'top':
                    start[name]=obj.offsetTop;
                    break;
                case 'width':
                    start[name]=obj.offsetWidth;
                    break;
                case 'height':
                    start[name]=obj.offsetHeight;
                    break;
                case 'opacity':
                    start[name]=1;
                    break;
                //borderWidth fontSize paddingLeft marginLeft
                //.....
            }
        }
        dis[name]=json[name]-start[name];
    }
    var count=Math.floor(duration/30);
    var n=0;
    clearInterval(obj.timer);
    obj.timer=setInterval(function(){
        n++;
        for(var name in json)
        {
            var cur=easing(duration*n/count,start[name],dis[name],duration);
            if(name == 'opacity'){
                obj.style[name]=cur;
            }else{
                obj.style[name]=cur+'px';
            }
        }
        if(n==count)
        {
            clearInterval(obj.timer);
            options.complete && options.complete();
        }
    },30);
}
//getStyle
function getStyle(obj,sName)
{
    return (obj.currentStyle||getComputedStyle(obj,false))[sName]
}
//运动形式
var Tween={Linear:function(t,b,c,d){return c*t/d+b},Quad:{easeIn:function(t,b,c,d){return c*(t/=d)*t+b},easeOut:function(t,b,c,d){return -c*(t/=d)*(t-2)+b},easeInOut:function(t,b,c,d){if((t/=d/2)<1){return c/2*t*t+b}return -c/2*((--t)*(t-2)-1)+b}},Cubic:{easeIn:function(t,b,c,d){return c*(t/=d)*t*t+b},easeOut:function(t,b,c,d){return c*((t=t/d-1)*t*t+1)+b},easeInOut:function(t,b,c,d){if((t/=d/2)<1){return c/2*t*t*t+b}return c/2*((t-=2)*t*t+2)+b}},Quart:{easeIn:function(t,b,c,d){return c*(t/=d)*t*t*t+b},easeOut:function(t,b,c,d){return -c*((t=t/d-1)*t*t*t-1)+b},easeInOut:function(t,b,c,d){if((t/=d/2)<1){return c/2*t*t*t*t+b}return -c/2*((t-=2)*t*t*t-2)+b}},Quint:{easeIn:function(t,b,c,d){return c*(t/=d)*t*t*t*t+b},easeOut:function(t,b,c,d){return c*((t=t/d-1)*t*t*t*t+1)+b},easeInOut:function(t,b,c,d){if((t/=d/2)<1){return c/2*t*t*t*t*t+b}return c/2*((t-=2)*t*t*t*t+2)+b}},Sine:{easeIn:function(t,b,c,d){return -c*Math.cos(t/d*(Math.PI/2))+c+b},easeOut:function(t,b,c,d){return c*Math.sin(t/d*(Math.PI/2))+b},easeInOut:function(t,b,c,d){return -c/2*(Math.cos(Math.PI*t/d)-1)+b}},Expo:{easeIn:function(t,b,c,d){return(t==0)?b:c*Math.pow(2,10*(t/d-1))+b},easeOut:function(t,b,c,d){return(t==d)?b+c:c*(-Math.pow(2,-10*t/d)+1)+b},easeInOut:function(t,b,c,d){if(t==0){return b}if(t==d){return b+c}if((t/=d/2)<1){return c/2*Math.pow(2,10*(t-1))+b}return c/2*(-Math.pow(2,-10*--t)+2)+b}},Circ:{easeIn:function(t,b,c,d){return -c*(Math.sqrt(1-(t/=d)*t)-1)+b},easeOut:function(t,b,c,d){return c*Math.sqrt(1-(t=t/d-1)*t)+b},easeInOut:function(t,b,c,d){if((t/=d/2)<1){return -c/2*(Math.sqrt(1-t*t)-1)+b}return c/2*(Math.sqrt(1-(t-=2)*t)+1)+b}},Elastic:{easeIn:function(t,b,c,d,a,p){if(t==0){return b}if((t/=d)==1){return b+c}if(!p){p=d*0.3}if(!a||a<Math.abs(c)){a=c;var s=p/4}else{var s=p/(2*Math.PI)*Math.asin(c/a)}return -(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b},easeOut:function(t,b,c,d,a,p){if(t==0){return b}if((t/=d)==1){return b+c}if(!p){p=d*0.3}if(!a||a<Math.abs(c)){a=c;var s=p/4}else{var s=p/(2*Math.PI)*Math.asin(c/a)}return(a*Math.pow(2,-10*t)*Math.sin((t*d-s)*(2*Math.PI)/p)+c+b)},easeInOut:function(t,b,c,d,a,p){if(t==0){return b}if((t/=d/2)==2){return b+c}if(!p){p=d*(0.3*1.5)}if(!a||a<Math.abs(c)){a=c;var s=p/4}else{var s=p/(2*Math.PI)*Math.asin(c/a)}if(t<1){return -0.5*(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b}return a*Math.pow(2,-10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p)*0.5+c+b}},Back:{easeIn:function(t,b,c,d,s){if(s==undefined){s=1.70158}return c*(t/=d)*t*((s+1)*t-s)+b},easeOut:function(t,b,c,d,s){if(s==undefined){s=1.70158}return c*((t=t/d-1)*t*((s+1)*t+s)+1)+b},easeInOut:function(t,b,c,d,s){if(s==undefined){s=1.70158}if((t/=d/2)<1){return c/2*(t*t*(((s*=(1.525))+1)*t-s))+b}return c/2*((t-=2)*t*(((s*=(1.525))+1)*t+s)+2)+b}},Bounce:{easeIn:function(t,b,c,d){return c-Tween.Bounce.easeOut(d-t,0,c,d)+b},easeOut:function(t,b,c,d){if((t/=d)<(1/2.75)){return c*(7.5625*t*t)+b}else{if(t<(2/2.75)){return c*(7.5625*(t-=(1.5/2.75))*t+0.75)+b}else{if(t<(2.5/2.75)){return c*(7.5625*(t-=(2.25/2.75))*t+0.9375)+b}else{return c*(7.5625*(t-=(2.625/2.75))*t+0.984375)+b}}}},easeInOut:function(t,b,c,d){if(t<d/2){return Tween.Bounce.easeIn(t*2,0,c,d)*0.5+b}else{return Tween.Bounce.easeOut(t*2-d,0,c,d)*0.5+c*0.5+b}}}};
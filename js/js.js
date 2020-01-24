//Toggle TitleBar's Classes and "Scroll To the Top" Bottom's Classes
var whetherChange = 0;
var metaColor = $("meta[name='theme-color']");
var colorEnabled = false;
var now_color = '';
var openFromTwoRows = false;
if(metaColor.length != 0){
    now_color = $("meta[name='mdx-main-color']").attr('content');
    colorEnabled = true;
}
var ticking = false;
var mdx_style = 1;
var barHight = $(".theFirstPage").height() - $(".titleBarGobal").height() - 1;
var totalHight = $(".theFirstPage").height()*.37 - 20;
window.ifTwoStyle = false;
var windowWidth = document.body.clientWidth;
window.tworowStyleClass = (document.getElementsByTagName("body")[0].className.indexOf('mdx-first-tworows') === -1) ? false : true;
if(window.tworowStyleClass && (windowWidth > window.innerHeight && windowWidth > 750)){
    window.ifTwoStyle = true;
}
if($(".theFirstPage").length == 0){
    mdx_style = 0;
}
window.onload = function(){
    let indexBgDom = document.getElementsByClassName('theFirstPage');
    if(indexBgDom.length > 0){
        setTimeout(() => {
            indexBgDom[0].classList.add("mdx-anmi-loaded");
        }, 500);
    }
}
window.onscroll = function(){
    if(!ticking) {
        requestAnimationFrame(scrollDiff);
        ticking = true;
    }
}
window.onresize = function(){
    barHight = $(".theFirstPage").height() - $(".titleBarGobal").height() - 1;
    totalHight = $(".theFirstPage").height()*.37 - 20;
    if(styleChanged()){
        closeSearch();
    }
}
function styleChanged(){
    if(!window.tworowStyleClass){
        return false;
    }
    var currentWidth = document.body.clientWidth;
    var tworowStyle = false;
    if(currentWidth > window.innerHeight && currentWidth > 750){
        tworowStyle = true;
    }
    if(tworowStyle !== window.ifTwoStyle){
        window.ifTwoStyle = tworowStyle;
        return true;
    }else{
        window.ifTwoStyle = tworowStyle;
        return false;
    }
}
function scrollDiff(){
    if(mdx_style){
        var howFar = document.documentElement.scrollTop || document.body.scrollTop;
        if(howFar > barHight & whetherChange == 0){
            $(".mdui-toolbar-self").toggleClass("mdui-color-theme");
            $("#titleBar").toggleClass("mdui-shadow-2");
            $(".scrollToTop").toggleClass("mdui-fab-hide");
            whetherChange = 1;
        }
        if(howFar <= barHight & whetherChange == 1){
            $(".mdui-toolbar-self").toggleClass("mdui-color-theme");
            $("#titleBar").toggleClass("mdui-shadow-2");
            $(".scrollToTop").toggleClass("mdui-fab-hide");
            whetherChange = 0;
        }
        if(howFar <= barHight){
            opacityHeight = (barHight - howFar)/totalHight;
            if(opacityHeight > 1){
                opacityHeight = 1;
            }
        }else if(howFar > barHight){
            opacityHeight = 0;
        }else{
            opacityHeight = 1;
        }
        $(".theFirstPage").css('opacity',opacityHeight);
    }else if(!mdx_style){
        var howFar = document.documentElement.scrollTop || document.body.scrollTop;
        if(howFar > 20 & whetherChange == 0){
            $(".mdui-toolbar-self").toggleClass("mdui-color-theme");
            $("#titleBar").toggleClass("mdui-shadow-2");
            $(".scrollToTop").toggleClass("mdui-fab-hide");
            whetherChange = 1;
        }
        if(howFar <= 20 & whetherChange == 1){
            $(".mdui-toolbar-self").toggleClass("mdui-color-theme");
            $("#titleBar").toggleClass("mdui-shadow-2");
            $(".scrollToTop").toggleClass("mdui-fab-hide");
            whetherChange = 0;
        }
    }
    ticking = false;
};

//Scroll To the Top
$(".scrollToTop").click(function(){
    $("body,html").animate({scrollTop:0},500);
});

//Night Styles
$("#tgns").click(function(){
    $("body").toggleClass("mdui-theme-layout-dark");
    if(!sessionStorage.getItem('ns_night-styles') || sessionStorage.getItem('ns_night-styles')=='false'){
        sessionStorage.setItem('ns_night-styles', 'true');
        if(colorEnabled){
            metaColor.attr('content',"#212121");
        }
    }else{
        sessionStorage.setItem('ns_night-styles', 'false');
        if(colorEnabled){
            metaColor.attr('content',now_color);
        }
    }
});
$(function(){
    //hot posts
    if($(".mdx-hot-posts").length!=0){
        $('.mdx-hp-g-r').show();
        var mdx_change = 1;
        var mdx_change2 = 1;
        var mdx_sp_w = (210 + parseInt(getComputedStyle(document.querySelector("a>div.mdx-li.mdui-card"), null).marginRight))*$("a>div.mdx-li.mdui-card").length+10;
        var mdx_sp_ww = 0;
        var mdx_sp_s = 0;
        var ele = document.getElementById("mdx-sp-out-c");
        ele.onscroll=function(){
            mdx_sp_ww = $('#mdx-sp-out-c').width();
            mdx_sp_s = ele.scrollLeft;
            if(mdx_sp_s>5 && mdx_change){
                $('.mdx-hp-g-l').fadeIn(200);
                mdx_change = 0;
            }
            else if(mdx_sp_s<=5 && !mdx_change){
                $('.mdx-hp-g-l').fadeOut(200);
                mdx_change = 1;
            }
            if((mdx_sp_w - mdx_sp_ww - mdx_sp_s)<=1 && mdx_change2){
                $('.mdx-hp-g-r').fadeOut(200);
                mdx_change2 = 0;
            }else if((mdx_sp_w - mdx_sp_ww - mdx_sp_s)>1 && !mdx_change2){
                $('.mdx-hp-g-r').fadeIn(200);
                mdx_change2 = 1;
            }
        }
    }

    //Lazyload
    $("div.LazyLoad").lazyload({
        effect : "fadeIn",
        threshold : 700,
    });
    $(".LazyLoadListImg").lazyload({
        threshold : 300,
    });
    $("img.LazyLoadPost").lazyload({
        effect : "fadeIn",
        threshold : 400,
    });
    $(".LazyLoadSamePost").lazyload({
        effect : "fadeIn",
        threshold : 400,
        container: $("#mdx-sp-out-c")
    });

    scrollDiff();
})

//Search
$(".seai").click(function(){
    $("#SearchBar").show();
    $(".OutOfsearchBox").fadeIn(300);
    $("#SearchBar").addClass("mdui-color-theme");
    $(".fullScreen").fadeIn(300);
    $("#SearchBar > *").animate({opacity:'1'},200);
    $(".outOfSearch").css('width','75%');
    $(".seainput").focus();
    $('body').toggleClass('mdx-search-lock');
    if(mdx_offline_mode){
        $('.OutOfsearchBox').html('<div class="searchBoxFill"></div><div class="underRes">'+tipMutiOff+'</div>');
        $('.OutOfsearchBox').css('pointer-events','auto');
        $(".seainput").attr('disabled','disabled');
    }
});
$(".mdx-tworow-search").click(function(){
    setTimeout(() => {
        $('body').toggleClass('mdx-search-lock');
    }, 500);
    $("#mdx-search-anim").css({'width': $(this).width() + 'px', 'top': $(this)[0].getBoundingClientRect().top + 'px', 'left': $(this)[0].getBoundingClientRect().left + 'px'}).addClass('mdx-search-anim-show');
    $(this).css('visibility', 'hidden');
    $("#SearchBar").show();
    var searchDom = $('.outOfSearch')
    $("#mdx-search-anim").css({'width': $('#searchform').width()*.75 - 12 + 'px', 'height': searchDom.height() + 'px', 'top': searchDom[0].getBoundingClientRect().top + 'px', 'left': '7px', 'backgroundColor': 'rgba(255, 255, 255, 0.3)', 'color': 'rgba(255, 255, 255, .3)'});
    setTimeout(() => {
        $('#searchform').addClass("mdx-searchform-show");
        $("#mdx-search-anim").removeClass('mdx-search-anim-show');
        $('a.mdui-btn.mdui-btn-icon.sea-close').css('opacity', '1');
    }, 500);
    $("#mdx-search-anim i").css({'color': '#fff'});
    $(".OutOfsearchBox").fadeIn(500);
    $("#SearchBar").addClass("mdui-color-theme");
    $(".fullScreen").fadeIn(500);
    $(".seainput").focus();
    if(mdx_offline_mode){
        $('.OutOfsearchBox').html('<div class="searchBoxFill"></div><div class="underRes">'+tipMutiOff+'</div>');
        $('.OutOfsearchBox').css('pointer-events','auto');
        $(".seainput").attr('disabled','disabled');
    }
    openFromTwoRows = true;
});
$(".sea-close").click(function(){
    closeSearch();
})

function closeSearch(){
    $(".seainput").blur();
    if(openFromTwoRows){
        var searchAnimDom = $(".mdx-tworow-search");
        $(".fullScreen").fadeOut(500);
        document.querySelector('a.mdui-btn.mdui-btn-icon.sea-close').removeAttribute('style');
        $('#searchform').removeClass("mdx-searchform-show");
        $("#mdx-search-anim").addClass('mdx-search-anim-show').removeClass('mdx-search-opened').css({'width': searchAnimDom.width() + 12 + 'px', 'height': '50px', 'top': searchAnimDom[0].getBoundingClientRect().top + 'px', 'left': searchAnimDom[0].getBoundingClientRect().left + 'px', 'backgroundColor': searchAnimDom.css('background-color'), 'color': searchAnimDom.css('color')});
        $("#mdx-search-anim i").css({'color': $(".mdx-tworow-search").css('color')});
        $(".OutOfsearchBox").fadeOut(500);
        window.setTimeout("hideBar()",500);
        $("#SearchBar").removeClass("mdui-color-theme");
        setTimeout(() => {
            if(document.getElementsByTagName("body")[0].className.indexOf('mdx-search-lock') !== -1){
                $('body').toggleClass('mdx-search-lock');
            }
            $("#mdx-search-anim").removeClass('mdx-search-anim-show');
            $(".mdx-tworow-search").css('visibility', 'visible');
        }, 500);
    }else{
        $("#SearchBar > *").animate({opacity:'0'},200);
        $(".fullScreen").fadeOut(300);
        $(".OutOfsearchBox").fadeOut(300);
        $(".outOfSearch").css('width','30%');
        window.setTimeout("hideBar()",300);
        $("#SearchBar").removeClass("mdui-color-theme");
        setTimeout(() => {
            if(document.getElementsByTagName("body")[0].className.indexOf('mdx-search-lock') !== -1){
                $('body').toggleClass('mdx-search-lock');
            }
            document.getElementsByClassName("outOfSearch")[0].removeAttribute("style");
        }, 300);
    }
    openFromTwoRows = false;
};

function hideBar(){
    $("#SearchBar").hide();
}

 //tap tp top
 $('.mdui-typo-headline').click(function(){
     if(mdx_tapToTop==1){
         $("body,html").animate({scrollTop:0},500);
     }
 })

//init menu
$(function(){
    var mdx_haveChild = 0;
    var mdx_is_c = 0;
    $('#mdx_menu > li').each(function(){
        if($(this).hasClass('menu-item-has-children')){
            $(this).addClass('mdui-collapse-item');
            $(this).removeClass('mdui-list-item');
            $(this).html('<div class="mdui-collapse-item-header mdui-list-item mdui-ripple"><div class="mdui-list-item-content"><a class="mdx-sub-menu-a" href="'+$(this).children("a").attr('href')+'">'+$(this).children("a").html()+'</a></div><i class="mdui-collapse-item-arrow mdui-icon material-icons">keyboard_arrow_down</i></div><ul class="mdui-collapse-item-body mdui-list mdui-list-dense">'+$(this).children("ul").html()+'</ul>');
             mdx_haveChild = 1;
            $(this).children("ul").children("li").each(function(){
                if($(this).hasClass('current-menu-item')){
                    mdx_is_c = 1;
                }
            })
            if(mdx_is_c){
                $(this).removeClass('current-menu-item');
                $(this).removeClass('current_page_item');
                $(this).addClass('mdui-collapse-item-open');
            }
            mdx_is_c = 0;
        }
        if(mdx_haveChild){
            $('#mdx_menu').addClass('mdui-collapse');
            $('#mdx_menu').attr('mdui-collapse','');
        }
    })
    new mdui.Collapse("#mdx_menu");
})
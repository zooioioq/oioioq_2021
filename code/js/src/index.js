// js/src/index.js



(function($){
  
  // 최상단에서 scroll시 100vh 이동
  var win = $(window);
  var viewDoc = $('html,body');
  var viewBox = $('#viewBox');
  var recommend = true;
  var countScroll = 0;
  var winH = win.outerHeight();

  var setWinHFn = function(){
    viewBox.css({height:winH + 'px'});
  };
  
  var setScrollFn = function(n){
    recommend = false;
    var moveH = winH * n;
    viewDoc.animate({scrollTop:moveH + 'px'}, function(){
      recommend = true;
    });
  };

  setWinHFn();
  setScrollFn(0);

  viewDoc.on('mousewheel DOMMouseScroll', function(e){
    var winScrollTop = win.scrollTop();
                           
    var evt = e.originalEvent;
    var delta = 0;
    (e.type === 'DOMMouseScroll') ? delta = evt.detail * -40 :  delta = evt.wheelDelta;
    
    if(recommend){
      if(delta < 0 && winScrollTop >= 0 && countScroll <= 0){
        countScroll += 1;
        setScrollFn(countScroll);
      }else if(winScrollTop <= winH && delta > 0 && countScroll > 0){
        countScroll = 0;
        setScrollFn(countScroll);
      }
    }
  
  });





  // 320px ~ 1279px viewBox 영상 변경
  var winWidth = $(window).outerWidth();
  console.log(winWidth);
  var video = $('video');
  var mobileLink = './multi/mobile.mp4';
  var pcLink = './multi/other.mp4';

  if(winWidth < 1280){
    console.log('mobile');
    video.attr('src', mobileLink);
  }else if(winWidth > 1280){
    console.log('pc');
    video.attr('src', pcLink);
  }





  // aboutmeBox 내부 skills tab menu 
  var aboutme = $('#aboutMeBox');
  var skills = aboutme.find('.skills');
  var skillsCateUl = skills.children('.skills_category');
  var skillsCateLi = skillsCateUl.children('li');
  var skillsDetail = skills.children('div');
  var skillsDetailUl = skillsDetail.children('ul');

  skillsCateLi.eq(0).addClass('act');
  skillsDetailUl.eq(1).css({display : 'none'});

  skillsCateLi.on('click focus',function(){
    var _this = $(this).index();

    skillsCateLi.eq(_this).siblings().removeClass('act');
    skillsCateLi.eq(_this).addClass('act');
    skillsDetailUl.eq(_this).siblings().hide();
    skillsDetailUl.eq(_this).show();
  });





  // aboutmeBox 내부 대표 img landing
  var meImg = $('.me_img');

  win.on('scroll',function(){
    var meImgOffset = meImg.offset().Top;
    var meWinScrollTop = win.scrollTop();
    var meMoveImg = meImgOffset - winH;

    if(meMoveImg = meWinScrollTop){
      meImg.addClass('act');
    }
  });





  // projectBox slide 처리
  var projectBox = $('#projectBox');
  var projectButton = $('.project_button');
  var proNextBtn = projectButton.find('.next');
  var proPrevBtn = projectButton.find('.prev');
  var projectList = projectBox.find('.project_list');
  var proListLi = projectList.children('li');
  var proLiLen = proListLi.length;
  var proLiWid = proListLi.outerWidth(true);
  var p = 0;
  var propermission = true;

  var proLiClone = projectList.children('li').eq(-1).clone();
  projectList.prepend(proLiClone);
  projectList.css({'left' : -proLiWid + 'px'});

  proNextBtn.on('click', function(e){
    e.preventDefault();
    if(propermission){
      propermission = false;
      p += 1;
      if(p > proLiLen-1){
        p = 0;
        projectList.stop().css({marginLeft : proLiWid +'px'});
      }
      projectList.stop().animate({marginLeft : -(proLiWid * p) + 'px'},function(){
        propermission = true;
      })
    }
  });

  proPrevBtn.on('click', function(e){
    e.preventDefault();
    if(propermission){
      propermission = false;
      p -= 1;
      projectList.stop().animate({marginLeft : -(proLiWid * p) + 'px'},function(){
        if(p < 0){
          p = proLiLen -1;
          projectList.stop().css({marginLeft : -(proLiWid * p) + 'px'});
        }
        propermission = true;
      })
    }
  });





  // gallery slide banner 
  var gallery = $('#galleryBox');
  var galImgArea = gallery.find('.gallery_img_area');
  var galImgUl = galImgArea.children('ul');
  var galLiLen = galImgUl.children('li').length;
  var galLiWid = galImgUl.children('li').outerWidth(true);
  var galBtn = gallery.find('.gallery_btn');
  var galPrevBtn = galBtn.find('.prev');
  var galNextBtn = galBtn.find('.next');
  var permission = true;
  var i = 0;

  var cloneLiLast = galImgUl.children('li').eq(-1).clone();
  var cloneLiFirst = galImgUl.children('li').eq(0).clone();
  galImgUl.prepend(cloneLiLast);
  galImgUl.append(cloneLiFirst);

  galNextBtn.on('click', function(e){
    e.preventDefault();
    if(permission){
      permission = false;
      i += 1;
      if(i > galLiLen-1){
        i = 0;
        galImgUl.stop().css({marginLeft : galLiWid +'px'});
      }
      galImgUl.stop().animate({marginLeft : -(galLiWid * i) + 'px'},function(){
        permission = true;
      })
    }
  });

  galPrevBtn.on('click', function(e){
    e.preventDefault();
    if(permission){
      permission = false;
      i -= 1;
      galImgUl.stop().animate({marginLeft : -(galLiWid * i) + 'px'},function(){
        if(i < 0){
          i = galLiLen -1;
          galImgUl.stop().css({marginLeft : -(galLiWid * i) + 'px'});
        }
        permission = true;
      })
    }
  });





})(jQuery);
/* 
  初始化轮播图
*/
$(function() {
  // 渲染轮播图数据
  renderBanner()
  // 渲染导航数据
  renderNav()
  // 初始化京东新闻轮播图
  initNewsSwiper()
  // 秒杀的区域滚动功能
  initSecSkill()
  // 渲染楼层数据
  renderFloor()
})
// 滚动改变透明度
$(window).scroll(function() {
  let scrollTop = $(this).scrollTop()
  let opacity = 0
  if (scrollTop < 500) {
    opacity = (scrollTop / 500) * 0.9
  } else {
    opacity = 0.9
  }
  $('.jd_header').css('backgroundColor', 'rgba(222, 24, 27, ' + opacity + ')')
  // console.log(opacity)
})

// 发送ajax请求，获取轮播图数据
function renderBanner() {
  $.ajax({
    url: 'http://localhost:3000/home/getBannerList',
    success: function(info) {
      if (info.status === 200) {
        // 渲染轮播图数据
        var html = template('banner_tpl', info)
        $('.jd_banner .swiper-wrapper').html(html)
        // 初始化轮播图
        initSwiper()
      }
    }
  })
}
// 初始化轮播图
function initSwiper() {
  new Swiper('#jd_banner', {
    loop: true, // 循环模式选项
    // 如果需要分页器
    pagination: {
      el: '.swiper-pagination',
      bulletClass: 'pagination-item',
      bulletActiveClass: 'pagination-item-active'
    },
    autoplay: {
      delay: 3000,
      stopOnLastSlide: false,
      disableOnInteraction: false
    }
  })
}
// 发送ajax请求，获取导航数据
function renderNav() {
  $.ajax({
    url: 'http://localhost:3000/home/getNavList',
    success: function(info) {
      if (info.status === 200) {
        // 渲染轮播图数据
        var html = template('nav_tpl', info)
        $('.jd_nav ul').html(html)
      }
    }
  })
}
function initNewsSwiper() {
  new Swiper('#jd_news', {
    loop: true, // 循环模式选项
    direction: 'vertical',
    autoplay: {
      delay: 1000,
      stopOnLastSlide: false,
      disableOnInteraction: false
    }
  })
}
// 初始化秒杀区域滚动功能
function initSecSkill() {
  // 计算并设置ul的宽度
  let liWidth = $('.seckill_content li').width()
  let length = $('.seckill_content li').length
  $('.seckill_content ul').width(liWidth * length)
  // 初始化区域滚动
  let content = document.querySelector('.seckill_content')
  new BScroll(content, {
    scrollX: true,
    scrollY: false
  })
}
function renderFloor() {
  $.ajax({
    url: 'http://localhost:3000/home/getFloorList',
    success: function(info) {
      if (info.status === 200) {
        // console.log(info)
        // 渲染轮播图数据
        var html = template('floor_tpl', info)
        $('.jd_floor').html(html)
      }
    }
  })
}

$(function() {
  // 获取地址id
  var id = decodeURI(location.href).split('=')[1]
  // 渲染详情页
  $.ajax({
    type: 'get',
    url: '/api/product/queryProductDetail',
    data: {
      id: id
    },
    success: function(info) {
      // console.log(info)
      var html = template('tpl', info)
      $('.product_info').html(html)
      initSwiper()
    }
  })

  // 加入购物车功能
  $('.add_cart').on('click', function() {
    // 发送ajax请求，添加购物车
    $.ajax({
      type: 'post',
      url: '/api/cart/addCart',
      data: {
        productId: id,
        num: 1
      },
      success: function(info) {
        console.log(info)
        if (info.error === 400) {
          // 没有登录，跳转到登录页面
          location.href = 'login.html?from=' + location.href
        } else {
          layer.confirm(
            '添加购物车成功',
            {
              icon: 1,
              title: '温馨提示',
              btn: ['去购物车', '继续购买']
            },
            function() {
              location.href = 'cart.html'
            },
            function() {
              console.log('那你继续买吧')
            }
          )
        }
      }
    })
  })

  function initSwiper() {
    new Swiper('.swiper-container', {
      loop: true, // 循环模式选项
      // 如果需要分页器
      pagination: {
        el: '.swiper-pagination'
      },
      autoplay: {
        delay: 3000,
        stopOnLastSlide: false,
        disableOnInteraction: false
      }
    })
  }
})

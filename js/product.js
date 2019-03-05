$(function() {
  // 获取地址id
  let id = decodeURI(location.href).split('=')[1]
  // 渲染详情页
  $.ajax({
    type: 'get',
    url: 'http://localhost:3000/product/queryProductDetail',
    data: {
      id: id
    },
    success: function(info) {
      // console.log(info)
      let html = template('tpl', info)
      $('.product_info').html(html)
      initSwiper()
    }
  })

  // 加入购物车功能
  $('.add_cart').on('click', function() {
    console.log('哈哈')
    // 发送ajax请求，添加购物车
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

$(function() {
  // 获取地址栏参数
  var page = 1
  var pageSize = 4
  var hasMore = true
  var href = decodeURI(location.href)
  var key = href.split('=')[1]
  $('.search_key').val(key)
  render(function(info) {
    total = info.total
    var html = template('item_tpl', info)
    $('.product_list').html(html)
  })

  // 处理区域滚动效果
  var bs = new BScroll('.jd_main', {
    probeType: 1,
    click: true,
    pullDownRefresh: {
      // 下拉距离超过50的时候，会触发pullingDown事件
      threshold: 50,
      // 回弹停留的距离
      stop: 40
    },
    pullUpLoad: {
      threshold: -50
    }
  })

  bs.on('pullingDown', function() {
    // 下拉刷新，修改提示消息
    $('.top_tips').html('数据正在加载中...')
    // 只要是下拉刷新，就是重新加载第一页的数据
    page = 1
    render(function(info) {
      var html = template('item_tpl', info)
      $('.product_list').html(html)
      bs.refresh()
      bs.finishPullDown()
      setTimeout(function() {
        $('.top_tips').html('下拉刷新')
      }, 500)
    })

    // 重置上拉加载
    hasMore = true
    $('.bottom_tips').html('上拉加载')
  })

  bs.on('pullingUp', function() {
    console.log(hasMore, '执行了没')
    if (hasMore === false) {
      bs.finishPullUp()
      return
    }
    // 加载更多数据
    $('.bottom_tips').html('数据正在加载中...')
    page++
    render(function(info) {
      var html = template('item_tpl', info)
      $('.product_list').append(html)
      bs.refresh()
      bs.finishPullUp()
      // 结束上拉加载
      if (info.data.length === 0) {
        $('.bottom_tips').html('没有更多数据了，别拉了')
        hasMore = false
      } else {
        $('.bottom_tips').html('上拉加载')
        hasMore = true
      }
    })
  })

  $('.sort li[data-type]').on('click', function() {
    if ($(this).hasClass('now')) {
      //让下面的span换箭头
      $(this)
        .find('i')
        .toggleClass('icon-arrow-down')
        .toggleClass('icon-arrow-up')
    } else {
      $(this)
        .addClass('now')
        .siblings()
        .removeClass('now')
      //让所有的span的箭头都向下
      $('.lt_sort span')
        .removeClass('icon-arrow-up')
        .addClass('icon-arrow-down')
    }
    bs.autoPullDownRefresh()
  })

  // 发送ajax请求，渲染数据的功能
  function render(callback) {
    var params = {
      page: page,
      pageSize: pageSize,
      productName: key,
      num: '',
      price: ''
    }
    var $select = $('.sort li.now')
    if ($select.length > 0) {
      //拿到type  拿到value
      var type = $select.data('type')
      var value = $select.find('i').hasClass('icon-arrow-up') ? 1 : 2
      //给发送的参数增加了一个值
      params[type] = value
      console.log(params[type])
    }

    $.ajax({
      type: 'get',
      url: '/api/product/queryProduct',
      data: params,
      success: function(info) {
        setTimeout(function() {
          callback && callback(info)
        }, 1000)
      }
    })
  }
})

$(function() {
  var left = new IScroll('.jd_main_left')
  var right = new IScroll('.jd_main_right')
  // 渲染一级分类
  $.ajax({
    type: 'get',
    url: 'http://localhost:3000/category/queryTopCategory',
    success: function(info) {
      // 使用模板引擎渲染页面
      let html = template('first_tpl', info)
      $('.jd_main_left ul').html(html)
      left.refresh()
      // 渲染二级分类
      renderSecond(info.rows[0].id)
    }
  })

  // 一级分类切换功能
  $('.jd_main_left').on('click', 'li', function() {
    // 根据一级分类获取二级分类
    $(this)
      .addClass('now')
      .siblings()
      .removeClass('now')
    let id = $(this).data('id')
    renderSecond(id)
  })

  function renderSecond(id) {
    $.ajax({
      type: 'get',
      url: 'http://localhost:3000/category/querySecondCategory',
      data: {
        id: id
      },
      success: function(info) {
        // console.log(info)
        // 使用模板引擎渲染页面
        let html = template('second_tpl', info)
        $('.jd_main_right ul').html(html)
        right.refresh()
      }
    })
  }
})

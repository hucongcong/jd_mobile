$(function() {
  // 查看密码功能
  $('.check_password').on('click', function() {
    // 替换类名
    var isShow = $(this).hasClass('icon-eye-open')
    if (isShow) {
      $(this)
        .addClass('icon-eye-close')
        .removeClass('icon-eye-open')
      $(this)
        .prev()
        .attr('type', 'password')
    } else {
      $(this)
        .addClass('icon-eye-open')
        .removeClass('icon-eye-close')
      $(this)
        .prev()
        .attr('type', 'text')
    }
  })

  // 登录功能
  $('.login_btn').on('click', function() {
    // 校验用户民和密码
    var username = $('.username').val()
    var password = $('.password').val()
    if (!username) {
      var index = layer.msg('请输入用户名')
      layer.style(index, {
        top: 'auto',
        bottom: '40px'
      })
      return
    }
    if (!password) {
      layer.msg('请输入密码')
      return
    }
    $.ajax({
      type: 'post',
      url: '/api/user/login',
      data: {
        username: username,
        password: password
      },
      success: function(info) {
        console.log(info)
        if (info.success) {
          // 登录成功了
          // 地址回跳
          var from = location.search.replace('?from=', '')
          location.href = from
        } else {
          layer.msg(info.message)
        }
      }
    })
  })
})

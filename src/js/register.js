$(function() {
  // 获取短信验证码功能、
  $('.get_code').click(function() {
    var $this = $(this)
    if ($(this).hasClass('disabled')) {
      return
    }
    // 验证手机号
    var phone = $('.phone').val()
    if (!/^1\d{10}$/.test(phone)) {
      layer.msg('请输入正确的手机号')
      return
    }
    // 禁用功能
    $(this).addClass('disabled')

    // 开启定时器
    var total = 5
    var timeId = setInterval(function() {
      total--
      $this.text(total)
      if (total <= 0) {
        $this.removeClass('disabled')
        clearInterval(timeId)
        $this.text('再次发送')
      }
    }, 1000)

    // 发送ajax请求，获取短信验证码
    $.ajax({
      url: '/api/user/vCode',
      type: 'get',
      data: {
        phone: phone
      },
      success: function(info) {
        console.log(info)
      }
    })
  })
  // 密码显示功能
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
  // 注册功能
  $('.login_register').on('click', function() {
    var username = $('.username').val()
    // 校验
    if (!username) {
      layer.msg('用户名不能为空')
      return
    }
    var password = $('.password').val()
    // 校验
    if (!password) {
      layer.msg('用户密码不能为空')
      return
    }
    var repassword = $('.repassword').val()
    if (password !== repassword) {
      layer.msg('用户密码和确认密码不一致')
      return
    }
    // 校验手机号
    var phone = $('.phone').val()
    if (!/^1\d{10}$/.test(phone)) {
      layer.msg('请输入正确的手机号')
      return
    }
    // 校验验证码
    var vcode = $('.vcode').val()
    if (!/\d{6}/.test(vcode)) {
      layer.msg('验证码格式错误')
      return
    }

    // 发送ajax请求，注册
    $.ajax({
      type: 'POST',
      url: '/api/user/register',
      data: {
        username: username,
        password: password,
        mobile: phone,
        vCode: vcode
      },
      success: function(info) {
        if (info.success) {
          location.href = 'login.html'
        } else {
          layer.msg(info.message)
        }
      }
    })
  })
})

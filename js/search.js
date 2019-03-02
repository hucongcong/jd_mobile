$(function() {
  // 本地缓存列表展示功能
  render()

  // 本地缓存添加功能
  $('.search_button').click(function() {
    // 获取搜索的关键字
    var key = $('.search_key').val()
    // 把关键字加入本地缓存中
    var history = getHistory()
    // 如果记录中已经存在这个，应该删除
    let index = history.indexOf(key)
    if (index != -1) {
      history.splice(index, 1)
    }
    history.unshift(key)
    setHistory(history)
    render()
    $('.search_key').val('')
    location.href = 'searchList.html?key=' + key
  })

  $('.search_key').on('focus', function() {
    if ($('.search_key').val() === '电脑') {
      $('.search_key').val('')
    }
  })
  $('.search_key').on('blur', function() {
    if ($('.search_key').val() === '') {
      $('.search_key').val('电脑')
    }
  })

  // 清空搜索记录的功能
  $('.history').on('click', '.trash', function() {
    $('.jd_mask').show()
  })
  $('.no').on('click', function() {
    $('.jd_mask').hide()
  })
  $('.yes').on('click', function() {
    // 清空所有的记录
    localStorage.removeItem('history')
    $('.jd_mask').hide()
    render()
  })

  // 热门搜索功能
  // 发送ajax请求，获取热门搜索内容
  $.ajax({
    type: 'get',
    url: 'http://localhost:3000/search/getHotSearch',
    success: function(info) {
      let html = template('hot_tpl', info)
      $('.hot .search_content').html(html)
    }
  })
})

function getHistory() {
  return JSON.parse(localStorage.getItem('history')) || []
}

function setHistory(data) {
  localStorage.setItem('history', JSON.stringify(data))
}

function render() {
  let history = getHistory()
  let html = template('search_tpl', { list: history })
  $('.history').html(html)
}

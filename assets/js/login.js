$(function () {
    $('#gotoLogin').click(function () {
        $('.loginBox').hide()
        $('.registBox').show()
    });
    $('#gotoRegist').click(function () {
        $('.registBox').hide()
        $('.loginBox').show()
    })

    let form = layui.form

    form.verify({
        repass: function(value, item){
          let pwd = $('.registBox input[name=password]').val()

          if (value !== pwd) {
              return '两次密码不一致'
          }
        }
        
        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        ,pass: [
          /^[\S]{6,12}$/
          ,'密码必须6到12位，且不能出现空格'
        ] 
    });  
})

$('#registForm').on('submit', function (e) {
    e.preventDefault()
    let data = $(this).serialize();
    $.ajax({
        type: 'POST',
        url: '/api/reguser',
        data,
        success: function (res) {
            console.log( res );
            if ( res.status !== 0 ) {
                return layer.msg(res.message)
            }
            layer.msg(res.message)
            $('#gotoRegist').click()
        }
    })
})

$('#loginForm').on('submit', function (e) {
    e.preventDefault()
    let data = $(this).serialize()
    $.ajax({
        type: 'POST',
        url: '/api/login',
        data,
        success: function (res) {
            console.log( res );
            if ( res.status !== 0 ) {
                return layer.msg(res.message)
            }
            localStorage.setItem('token', res.token)
            layer.msg(res.message, {
                time: 0,
                },
                function () {
                    location.href = 'index.html';
                }
            )
        }
    })
})


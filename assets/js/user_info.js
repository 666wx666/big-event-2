$(function () {

    let form = layui.form
    let layer = layui.layer
    
    getInfo()
    function getInfo() {
        $.ajax({
            url: '/my/userinfo',
            success: function (res) {
                //  console.log( res );
                if ( res.status !== 0 ) {
                    return layer.msg('fail')
                }
                form.val('userForm', res.data)
            }
        })
    }

    $('#resetBtn').on('click', function (e) {
        e.preventDefault()
        getInfo()
    })

    $('#userForm').on('submit', function (e) {
        e.preventDefault()
        let data = $(this).serialize()
        $.ajax({
            type: 'POST',
            url: '/my/userinfo',
            data,
            success: function (res) {
                if ( res.status !== 0 ) {
                    return layer.msg('change failed')
                }
                layer.msg('change success')
                window.parent.getAvatarAndName()
                }
        })
    })

    console.log( '123' );
    form.verify({
        nikename: function (value, item) {
            if ( value.length >6 ) {
                return '昵称长度必须在1-6字符之间'
            }
        }
    }); 
})


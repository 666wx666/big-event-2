$(function () {
    getAvatarAndName()
    $('#logoutBtn').click(function () {
        layer.confirm('确定退出', {icon: 3, title:'提示'}, function(index){
            //do something
            localStorage.removeItem('token')
            location.href = 'login.html'
            layer.close(index);
        }); 
    })
})

function getAvatarAndName() {
    $.ajax({
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token')
        // },
        success: function (res) {
             console.log( res );
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            let name = res.data.nikename || res.data.username
            $('#welcome').text('欢迎' + name)
            if ( res.data.user_pic ) {
                $('.layui-nav-img').attr('src', res.data.user_pic).show()
                $('#welcome').hide()
            } else {
                $('.layui-nav-img').hide()
                $('.text-avatar').text(name[0].toUpperCase()).show()
            }
        },
        // complete: function (xhr) {
        //     console.log( xhr );
        //     if ( 
        //         xhr.responseJSON.status === 1 &&
        //         xhr.responseJSON.message === "身份认证失败！"
        //         ) {
        //         localStorage.removeItem(token)
        //         location.href = 'login.html'
        //     }
        // }

       
    })
}
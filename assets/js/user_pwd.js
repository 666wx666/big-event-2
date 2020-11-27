$(function () {
    let form = layui.form
    form.verify({
      //我们既支持上述函数式的方式，也支持下述数组的形式
      //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
      // pass: [
      //   /^[\S]{6,12}$/
      //   ,'密码必须6到12位，且不能出现空格'
      // ],

      // newpwd: function (value, item) {
      //   let oldpwd = $('input[name=oldpwd]').val()
      //   if ( value === oldpwd ) {
      //     return '新密码不能和原密码一样！'
      //   }
      // },

      // samepwd: function (value, item) {
      //   let newpwd = $('input[name=newpwd]').val()
      //   if ( value !== newpwd ) {
      //     return '两次输入的新密码不一致'
      //   }
      // }
    }); 

    $('#pwdForm').on('submit', function (e) {
       e.preventDefault()
      let data = $(this).serialize()
       $.ajax({
         type: 'POST',
         url: '/my/updatepwd',
         data,
         success: function (res) {
            console.log( res );
            // if (  ) {
              
            // }
         }
       })
    })
})
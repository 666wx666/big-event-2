$(function () {
    let layer = layui.layer
    let form = layui.form
    getCate()
    function getCate() {
        $.ajax({
            url: '/my/article/cates',
            success: function (res) {
                 console.log( res );
                 let strTpl = template('trTpl', res)
                 $('tbody').html(strTpl)
            }
        })
    }
    let index
    $('#addBtn').on('click', function () {
        index = layer.open({
            type: 1,
            title: '添加文章分类',
            area: '500px',
            content: $('#addForm').html()
        });
    })

    $('body').on('submit', '#form', function (e) {
        e.preventDefault()
         $.ajax({
             type: 'POST',
             url: '/my/article/addcates',
             data: $(this).serialize(),
             success: function (res) {
                console.log( res );
                if ( res.status !== 0 ) {
                    return layer.msg('新增文章分类失败！')
                }
                layer.msg('新增文章分类成功！')
                layer.close(index)
                getCate()
             }
         })
    })
    let editIndex
    $('tbody').on('click', '.editBtn', function () {
        let id = $(this).attr('data-id')
        editIndex = layer.open({
            type: 1,
            title: '添加文章分类',
            area: '500px',
            content: $('#editForm').html()
        });

        $.ajax({
            url: '/my/article/cates/' + id,
            success: function (res) {
                if ( res.status !== 0 ) {
                    return layer.msg('获取文章分类数据失败！')
                }
                form.val('editForm', res.data)
            }
        })
    })

    $('body').on('submit', '#editForm', function (e) {
         e.preventDefault()
         $.ajax({
             type: 'POST',
             url: '/my/article/updatecate',
             data: $(this).serialize(),
             success: function (res) {
                  if ( res.status !== 0 ) {
                      console.log( res );
                      return layer.msg('获取文章分类列表失败！')
                  }
                  layer.msg('获取文章分类列表成功！')
                  layer.close(editIndex)
                  getCate()
             }
         })
    })

    $('tbody').on('click', '.delBtn', function () {
        let id = $(this).attr('data-id') 

        layer.confirm('确认删除吗', {icon: 3, title:'提示'}, function(index){
        //do something
            $.ajax({
                url: '/my/article/deletecate/' + id,
                success: function (res) {
                    console.log( id );
                    console.log( res );
                    if ( res.status !== 0 ) {
                        return layer.msg('删除分类失败！')
                    }
                    layer.msg('删除分类成功！')
                    getCate()
                }
            })
            layer.close(index);
        });
    })
})

$(function() {

    if ($('.content').hasClass('schedule')) {

        window.onscroll = function() {
            if ($(window).scrollTop() < 120) {
                $('section > div > header').removeClass('sticky');
                $('footer').removeClass('shadow');
            } else {
                $('section > div > header').addClass('sticky');
                $('footer').addClass('shadow');
            }
        }
    }

    //Registration form
    $('#registration-form').on('submit', function(e) {
        e.preventDefault();

        var data = {
            name: $('#registration-form input[name="name"]').val(),
            id: $('#registration-form input[name="email"]').val(),
            idea: $('#registration-form textarea[name="description"]').val(),
            phone_number: $('#registration-form input[name="telephone"]').val(),
            github_username: $('#registration-form input[name="github_username"]').val(),
        };

        $.ajax({
            type: 'POST',
            url: '/addAttendee',
            data: data,
            success: function(res) {
                console.log(res);
            }

        })
    });


})
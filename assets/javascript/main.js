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
            email: $('#registration-form input[name="email"]').val(),
            idea: $('#registration-form textarea[name="description"]').val(),
            phone_number: $('#registration-form input[name="telephone"]').val(),
            github_username: $('#registration-form input[name="github_username"]').val(),
        };

        var name = data.name;
            name = name.split(" ")[0];

        var noticeDiv = '<div class="notice"></div>';

        $.ajax({
            type: 'POST',
            url: '/addAttendee',
            data: data,
            success: function(res) {
                console.log(res);
                var noticeText = "Hey <b>"+ name +"</b>! You have been added to our list of attendees, we&rsquo;ve sent you an email to verify your attendance";
                $('.main').prepend(noticeDiv);
                $('.notice').html(noticeText);

                $('#registration-form textarea, #registration-form input').val();
            },
            error: function(res) {
                var noticeText = "Ummm&hellip; sorry " + name + ", that Email appears to have already been used";
                $('.main').prepend(noticeDiv);
                $('notice').addClass('error').html(noticeText);
            }
        })
    });

    //Showdown support in Guide Page
    // var converter = new Showdown.converter();
    // converter.makeHTML(markdown);
})

$(document).ready(function () {


    $(window).scroll(function () {
      
        //$(document).height() - $(window).height()

        var scrollPos = $(document).scrollTop();
        
        if ($(document).height() - $(window).height() - scrollPos < 100) {
            var offset = $("#todo-list").data("offset-count");

            $.ajax({
                url: "/Home/List",
                method: "Get",
                dataType: "json",
                data: {
                    "offset": offset
                },
                success: function (response) {
                  
                    $.each(response, function (ind, value) {
                        console.log(value);
                        var completedClass = value.Tamamlanib ? "bg-info" : "bg-warning";
                        console.log(completedClass);

                        var newItem = `<div class="col-md-4 mb-3">
                                        <div class="card">
                                            <div class="card-body ${completedClass}">
                                                <h5 class="card-title">${value.Title}</h5>
                                                <h6 class="card-subtitle mb-2">${value.Id}</h6>
                                            </div>
                                        </div>
                                    </div>`;
                        $("#todo-list").append(newItem);

                        $("#todo-list").data("offset-count", offset + 300);
                    });



                }
            });


        }
    });



    $("#load-more").click(function () {
        var loadButton = $(this);
        var offset = $("#todo-list").data("offset-count");

        $.ajax({
            url: "/Home/List",
            method : "Get",
            dataType :"json",
            data : {
                "offset": offset
            },
            success: function (response) {
                if (response.length < 300) {
                    $("#load-more").hide();
                }
                $.each(response, function (ind, value) {
                    console.log(value);
                    var completedClass = value.Tamamlanib ? "bg-info" : "bg-warning";
                    console.log(completedClass);

                    var newItem = `<div class="col-md-4 mb-3">
                                        <div class="card">
                                            <div class="card-body ${completedClass}">
                                                <h5 class="card-title">${value.Title}</h5>
                                                <h6 class="card-subtitle mb-2">${value.Id}</h6>
                                            </div>
                                        </div>
                                    </div>`;
                    loadButton.parent().before(newItem);

                    $("#todo-list").data("offset-count", offset + 300);
                });

               
              
            }
        });


    });

});
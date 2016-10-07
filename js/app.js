$( document ).ready(function() {

    var $input = $("input");

    // hide error message if there is one
    $input.focus(function(){
        $('.error').hide();
    });
    
    $("#add").click(function(){
        var isComplete = true;
        var formData = {};

        // loop through inputted values, if empty, show error message
        $input.each(function(){
            var $current = $(this);
            if($current.val() ==''){
                isComplete = false;
                var $error = $('<div />', {
                    class: "error",
                    text: "Please enter a " + $current.attr("id")
                });
                $current.after($error); 
            }
            // create an object with 'input id' as 'key', 'input value' as 'value'
            else{
                var id = $current.attr("id");
                var val = $current.val();
              // formData[$current.attr("id")] = $current.val(); 
              formData[id] = val;
              localStorage.setItem(id, val);
            }

        });


        if(isComplete) {
            console.log(formData);
            //localStorage.setItem('formData', JSON.stringify(formData));
            // create a div with class 'block'
            $input.val('');
            var $div = $('<div />', {
                class: "block"
            });

            // create divs with class of 'key', text of 'value', add to the DOM
            $.each(formData, function(key, value){
                var $inner = $('<div />', {
                    class: key,
                    text: value
                });
                $($div).append($inner);
            });
            var $remove = $('<div />', {
                class: "remove",
                text: "x"
            });
            $($div).append($remove);
            $('.list').append($div);
        }
                 
    });

    // delegated events - allows the click event from the descendant element (.remove) that is added to the document at a later time
     $( ".list" ).on( "click", ".remove", function() {
        console.log("remove");
        $( this ).parent().remove();
    });

    for(var i = 0; i < localStorage.length; i++){
        console.log(localStorage.key(i));
    }
    
});
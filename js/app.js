$( document ).ready(function() {

    var $input = $("input"),
        $clearAll = $(".clearAll");

    // check to see if anything is saved in local storage 
    // if so, loop through, save each value, and parse, 
    // call function addItem on each 

    if(localStorage.length){
        for(var i = 0; i < localStorage.length; ++i) {
            var savedItem = localStorage.getItem(localStorage.key(i));
            var savedItemObj = JSON.parse(savedItem);
            addItem(savedItemObj);
        } 
        $clearAll.removeClass('hide');
    }

    $clearAll.click(function(){
        localStorage.clear();
         $(".block").slideUp(function(){
            $(this).remove();
         }); 
         $clearAll.addClass('hide');

    });
    
    // on click, create a time stamp for a unique number, 
    // create a new object, formData and add id with the unique number
    $("#add").click(function(){
        var isComplete = true,
            uniqueID = new Date().getTime(), 
            formData = {
                id: uniqueID
            };

        // loop through each input, check if fields are complete,
        // if not, error

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

            // add properties from input to formData object 
            // input id as object key, input entered value as object value

            else{
                var key = $current.attr("id");
                var value = $current.val();
                formData[$current.attr("id")] = $current.val(); 
            }
        }); 

        // send to local storage
        // use the unique id as key, stringify the formData object

       if(isComplete) {
            localStorage.setItem(uniqueID, JSON.stringify(formData));
            addItem(formData);
        }
                 
    });

    function addItem(obj){
        $input.val('');
        $clearAll.removeClass('hide');

        // create a parent div with class block
        // make element id the unique id#

        var $div = $('<div />', {
            class: "block",
            id: obj.id
        });

        // loop through the object, ignore the id, create divs for the other properties 
        // making the object key the class name, and the object value the html text

        $.each(obj, function(i, elem){
            if(i !== "id"){
                var $inner = $('<div />', {
                    class: i,
                    text: elem
                });
                $($div).append($inner);
            } 
        });

        // add a remove button

        var $remove = $('<div />', {
            class: "remove",
            text: "x"
        });

        // add to the DOM

        $($div).append($remove);
        $('.list').append($div);
        $(".block").slideDown();
    }

    // hide error message if there is one

    $input.focus(function(){
        $('.error').hide();
    });

    // delegated events - allows the click event from the descendant element (.remove) that is added to the document at a later time

     $( ".list" ).on( "click", ".remove", function() {

        // find the id of the parent item clicked, remove from local storage and the DOM 

        var deletedItem = $(this).parent().attr("id");
        localStorage.removeItem(deletedItem);
        $(this).parent().slideUp(function(){
            $(this).remove();
        });  
        if(localStorage.length == 0){
            $clearAll.addClass('hide');
        }
    });  
    
});
    var user1 = "";
    var user2 = "";
    
    $(".add-chat").on("click", function(event){
        //prevents refresh on form submission
        event.preventDefault();

        //grabs user chat input
        var userChat = $(".chat").val().trim();
        console.log(userChat);

        //Create a new variable that will hold a <p>
        var chatItem = $("<p>");

        chatItem.attr("player-name", "User: " + user1);
        chatItem.append(userChat);

        //Add <p> to chat-log
        $(".chat-log").append(chatItem);

        //Clear textbox when done
        $(".chat").val("");
        console.log("Made to end of function");
    });
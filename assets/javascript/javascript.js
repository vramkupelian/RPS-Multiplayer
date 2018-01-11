    database.ref().get({
        player1,
        player2,
    });


    console.log($(".p2-name").text().length);
    $(".add-name").on("click", function(event){
        //prevents refresh on form submission
        event.preventDefault();

        //grabs user chat input
        var userName = $(".name").val().trim();

        //Create a new variable that will hold a <p>
        var nameItem = $("<p>");
        nameItem.addClass("player");

        
        nameItem.append(userName);

       
        //If there is no final player, add name
        if(!$("p").hasClass("final-player")){
            if($("p").hasClass("player")){
                $(".p2-name").append(nameItem);
                $("p").addClass("final-player");

                database.ref().update({
                    player2: userName,
                    p2Wins: 0,
                    p2Losses: 0,
                });

            }
            else{
                $(".p1-name").append(nameItem);
                
                database.ref().set({
                    player1: userName,
                    p1Wins: 0,
                    p1Losses: 0,
                });
            }
        }
        else{
            $(".name").val("");
            return;
        }

        //Clear textbox when done
        $(".name").val("");
    
    });

    





    $(".add-chat").on("click", function(event){
        //prevents refresh on form submission
        event.preventDefault();

        //grabs user chat input
        var userChat = $(".chat").val().trim();

        //Create a new variable that will hold a <p>
        var chatItem = $("<p>");

        
        chatItem.append(userChat);

        //Add <p> to chat-log
        $(".chat-log").append(chatItem);

        //Clear textbox when done
        $(".chat").val("");
    
    });

    
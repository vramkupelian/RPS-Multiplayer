
var config = {
            apiKey: "AIzaSyCAIt42NvpFwzSNogdJvFTMUeHNf-jPxWY",
            authDomain: "rock-paper-scissors-mp-79a33.firebaseapp.com",
            databaseURL: "https://rock-paper-scissors-mp-79a33.firebaseio.com",
            projectId: "rock-paper-scissors-mp-79a33",
            storageBucket: "",
            messagingSenderId: "153941745547"
};
firebase.initializeApp(config);
   
var database = firebase.database();


database.ref().on("value" , function(snapshot){


});

// var user1 ={
//     name:"",
//     wins: 0,
//     losses: 0,
// }

// var user2 ={
//     name:"",
//     wins: 0,
//     losses,
// }

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
                
                database.ref().update({
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

        database.ref().update({
            chat1: userChat,
        });
    
    });

    
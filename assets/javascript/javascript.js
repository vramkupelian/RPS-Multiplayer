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
// var connections = database.ref("connections");
// console.log(connections);

// database.ref().on("value" , function(snapshot){
// // user1 = snapshot.val().
// });

// var user1 ={
//     name:"",
//     wins: 0,
//     losses: 0,
//     choice: "",
// }

// var user2 ={
//     name:"",
//     wins: 0,
//     losses:0,
//     choice:"",
// }


//Adding names, only 2 people
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
        // if(!$("p").hasClass("final-player")){
        if($(".p1-name").is(":empty")){
            console.log("P1 is empty,lets add");
            // if($("p").hasClass("player")){
            //     $(".p2-name").append(nameItem);
            //     $("p").addClass("final-player");
            //     user2 = userName;

            //     database.ref().push({
            //         user: userName,
            //         wins:0,
            //         losses: 0,
            //         choice:"",
            //     });
            
            // user1 = userName;
            database.ref().push({
                user: userName,
                wins: 0,
                losses: 0,
                choice:"",
            });

            }
            else if($(".p2-name").is(":empty")){
                
                // user1 = userName;
                database.ref().push({
                    user: userName,
                    wins: 0,
                    losses: 0,
                    choice:"",
                });
            }
        // }
        // else{
        //     $(".name").val("");
        //     return;
        // }

        //Clear textbox when done
        $(".name").val("");   
});

//chat
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

        database.ref().push({
            chat: userChat,
        });
    
    });

    //retrieve from database
    database.ref().on("child_added", function(snapshot){

        var newName = $("<p>").text("Player: " + snapshot.val().user);
        var winCount = $("<p>").text("Wins: " + snapshot.val().wins);
        var lossCount = $("<p>").text("Losses: " + snapshot.val().losses);

        if($(".p1-name").is(":empty")){
                   $(".p1-name").append(newName).append(winCount).append(lossCount);
 
        }
        else{
            $(".p2-name").append(newName).append(winCount).append(lossCount);
        }
    });

    
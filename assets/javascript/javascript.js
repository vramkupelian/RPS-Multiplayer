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

// connectionsRef references a specific location in our database.
// All of our connections will be stored in this directory.
var connectionsRef = database.ref("/connections");

// '.info/connected' is a special location provided by Firebase that is updated every time
// the client's connection state changes.
// '.info/connected' is a boolean value, true if the client is connected and false if they are not.
var connectedRef = database.ref(".info/connected");
console.log("connectedRef: " + connectedRef);
var myTurn;

// database.ref().on("value" , function(snapshot){
// // user1 = snapshot.val().
// });

//When client's connection state changes
connectedRef.on("value", function(snap){
    
    //If they are connected
    if(snap.val()){

        //Add user to connections list
        var isConnected = connectionsRef.push(true);
        
        //Remove user from connection list when they disconnect
        isConnected.onDisconnect().remove();
    }

});


database.ref().on("value", function(snapshot){

const player1exists = snapshot.child("Player1").exists();
const player2exists = snapshot.child("Player2").exists();

if(player1exists && player2exists){

    $(".name-form").addClass("hidden");
}

});

// database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
//     var snapValue = snapshot.val();

//     console.log(snapValue.dateAdded);
// });


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
        if($(".p1-name").is(":empty")){
            console.log("P1 is empty,lets add");
                
            // user1 = userName;
            database.ref("/players/Player1").update({
                user: userName,
                wins: 0,
                losses: 0,
                choice:"",
                // dateAdded: firebase.database.ServerValue.TIMESTAMP
            });

            }
            else if($(".p2-name").is(":empty")){
                
                // user1 = userName;
                database.ref("/players/Player2").update({
                    user: userName,
                    wins: 0,
                    losses: 0,
                    choice:"",
                    // dateAdded: firebase.database.ServerValue.TIMESTAMP
                });
            }

        //Clear textbox when done
        $(".name").val("");   
        $(".name-form").addClass("hidden");

});

//if there are p1 and p2, hide name form
if (!$(".p1-name").is(":empty") && !$(".p2-name").is(":empty")){

    $(".name-form").addClass("hidden");

}

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
        // $(".chat-log").append(chatItem);

        //Clear textbox when done
        $(".chat").val("");

        database.ref("chat").update({
            chat: userChat,
        });
    
    });

    //retrieve from database
    database.ref("/players").on("child_added", function(snapshot){

        console.log(snapshot);
        var newName = $("<p>").text("Player: " + snapshot.val().user);
        var winCount = $("<p>").text("Wins: " + snapshot.val().wins);
        var lossCount = $("<p>").text("Losses: " + snapshot.val().losses);

        if($(".p1-name").is(":empty")){
                   $(".p1-name").append(newName).append(winCount).append(lossCount);
 
        }
        else if ($(".p2-name").is(":empty")){
            $(".p2-name").append(newName).append(winCount).append(lossCount);
        }
        else{
            var trashTalk = $("<p>").text(snapshot.val().chat);
            $(".chat-log").append(trashTalk);
        }
    });

    //when they choose rock, paper or scissors.
$("input:button").on("click",function(){
    
console.log("You clicked a button");
console.log($(this).val());

var myChoice = $(this).val();

database.ref("Player1").update({
    choice: myChoice,
});

});
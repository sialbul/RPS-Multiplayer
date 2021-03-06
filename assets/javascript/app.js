$(document).ready(function () {

    var config = {
        apiKey: "AIzaSyDocCD0P5oWg1anphLCAEPSViPtSzuCxLE",
        authDomain: "example1-74ba2.firebaseapp.com",
        databaseURL: "https://example1-74ba2.firebaseio.com",
        projectId: "example1-74ba2",
        storageBucket: "example1-74ba2.appspot.com",
        messagingSenderId: "587925387610"
    };

    firebase.initializeApp(config);

    //VARIABLES
    //-------------------------------------------------

    var user1 = {};
    var user2 = {};
    var user1Choice = "";
    var user2Choice = "";
    var user1Score = 0;
    var user2Score = 0;
    var turn = 1


    var database = firebase.database();

    database.ref("/players/").on("value", function (snapshot) {
        if (snapshot.child("user1").exists()) {
            console.log("Player 1 exists");

            user1 = snapshot.val().user1;
            $("#user1Score").text(user1.win)
            $("#user1-view").html("Take Your Pick");
            $("#user1Name").html(user1.name);
            $(".container2").hide();
        } else {
            console.log("Player 1 does NOt exist");
            user1 = null;

        }

        if (snapshot.child("user2").exists()) {
            user2 = snapshot.val().user2;
            $("#user2Score").text(user2.win)
            $("#user2-view").html("Take Your Pick");
            $("#user2Name").html(user2.name);
            $(".container3").hide();

        }
        else {
            console.log("Player 2 does NOt exist");
            user1 = null;

        }
    });

   
    $("#submitBtn").click(function (startGame) {
        event.preventDefault();
        var user1Name = $("#userName1-input").val().trim().toUpperCase();
        var user1Ref = database.ref("players/user1");
        user1Ref.set({
            name: user1Name,
            win: 0,
            choice: ""
        });
        user1Ref.onDisconnect().remove();
    });
    $("#submitBtn2").click(function (startGame) {
        event.preventDefault();
        var user2Name = $("#userName2-input").val().trim().toUpperCase();
        var user2Ref = database.ref("players/user2");
        user2Ref.set({
            name: user2Name,
            win: 0,
            choice: ""
        });
        user2Ref.onDisconnect().remove();

    });

    // $(document).on("click", "#submitBtn", function (event) {
    //     event.preventDefault()
    //     user1 = {
    //         name: user1.name,
    //         win: 0,
    //         choice: ""
    //     }; console.log("user1");
    //     database.ref("/players/user1").set(user1);
    //     database.ref().child("turn").set(1);
    // });

    // $(document).on("click", "#submitBtn2", function (event) {
    //     event.preventDefault()
    //     user2 = {
    //         name: user2.name,
    //         win: 0,
    //         choice: ""
    //     }; console.log("user2");
    //     database.ref("/players/user2").set(user2);
    //     $("#action").text("Player 1 goes first.")
    // });



    $(document).on("click", ".choice1", function () {
        user1Choice = $(this).attr("value");
        console.log(user1Choice);
        database.ref("players/user1").child("choice").set(user1Choice);
        turn = 2;
        database.ref().child("turn").set(2);
        $("#action").text("Player 2 goes.")
    });

    $(document).on("click", ".choice2", function () {
        user2Choice = $(this).attr("value");
        console.log(user2Choice);
        database.ref("players/user2").child("choice").set(user2Choice);
        resultCompare();
        $("#action").text("Player 1 goes.")
    });

    function resultCompare() {
        if (user1Choice === "rock") {
            if (user2Choice === "rock") {
                //tie
                $("#message").text("Tie, try again.")
            } else if (user2Choice === "paper") {
                //user2 wins
                $("#message").text("Paper covers rock, Player2 wins")
                $("#user2Score").text(user2.win + 1)
                database.ref().child("players/user2/win").set(user2.win + 1);

            } else { //scissors
                $("#message").text("Rock smashes scissors, Player1 wins")
                $("#user1Score").text(user1.win + 1)
                database.ref().child("players/user1/win").set(user1.win + 1);
            }
        } else if (user1Choice === "paper") {
            if (user2Choice === "rock") {
                //user1 wins
                $("#message").text("Paper covers rock, Player1 wins")
                $("#user1Score").text(user1.win + 1)
                database.ref().child("players/user1/win").set(user1.win + 1);
            } else if (user2Choice === "paper") {
                //tie
                $("#message").text("Tie, try again.")
            } else { //scissors
                //user2 wins
                $("#message").text("Scissors cuts paper, Player2 wins")
                $("#user2Score").text(user2.win + 1)
                database.ref().child("players/user2/win").set(user2.win + 1);
            }
        } else if (user1Choice === "scissors") {
            if (user2Choice === "rock") {
                //user2 wins
                $("#message").text("Rock smashes scissors, Player2 wins")
                $("#user2Score").text(user2.win + 1)
                database.ref().child("players/user2/win").set(user2.win + 1);
            } else if (user2Choice === "paper") {
                //user1 wins
                $("#message").text("Scissors cuts paper, Player1 wins")
                $("#user1Score").text(user1.win + 1)
                database.ref().child("players/user1/win").set(user1.win + 1);
            } else {
                //tie
                $("#message").text("Tie, try again.")
            };
        };
        turn = 1
        database.ref().child("/turn").set(1);





    };
})
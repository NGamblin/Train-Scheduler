function test(){
console.log("hi")
}
test();


var config = {
    apiKey: "AIzaSyA0bQpRvj22zD_ziftaEwsejcxOQFoG7W4",
    authDomain: "nickdb-6dea5.firebaseapp.com",
    databaseURL: "https://nickdb-6dea5.firebaseio.com",
    projectId: "nickdb-6dea5",
    storageBucket: "nickdb-6dea5.appspot.com",
    messagingSenderId: "161121778808"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

//  Button for adding trains
$("#addTrain").on("click", function(event) {
  event.preventDefault();

  // store user input
  var routeName = $("#route").val().trim();
  var endDestination = $("#endDestination").val().trim();
  var firstRun = $("#firstRun").val().trim();
  var frequency = $("#frequency").val().trim();

  var newTrain = {
    routeName: routeName,
    endDestination: endDestination,
    firstRun: firstRun,
    frequency: frequency
  };

  //  train data to the firebase
  database.ref().push(newTrain);

  // console.log(newTrain.routeName);
  // console.log(newTrain.endDest);
  // console.log(newTrain.firstRun);
  // console.log(newTrain.frequency);

  // Clears form
  $("#route").val("");
  $("#endDestination").val("");
  $("#firstRun").val("");
  $("#frequency").val("");
});

// add train to firebase and then row to train table
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  var routeName = childSnapshot.val().routeName;
  var endDestination = childSnapshot.val().endDestination;
  var firstRun = childSnapshot.val().firstRun;
  var frequency = childSnapshot.val().frequency;

// console.log(routeName);
// console.log(endDestination);
// console.log(firstRun);
// console.log(frequency);

  var newRow = $("<tr>").append(
    $("<td>").text(routeName),
    $("<td>").text(endDestination),
    $("<td>").text(frequency),
    // $("<td>").text(),
    // $("<td>").text(),

 
  );

  // Append the new row to the table
  $("#trainSchedule > tbody").append(newRow);
});
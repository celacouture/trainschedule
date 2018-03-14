var config = {
  apiKey: "AIzaSyDEE78QpDSKv1tspHu3DdQ-f0kjS4-kNL8",
  authDomain: "traintracker-cfad0.firebaseapp.com",
  databaseURL: "https://traintracker-cfad0.firebaseio.com",
  projectId: "traintracker-cfad0",
  storageBucket: "",
  messagingSenderId: "682315758723"
};
firebase.initializeApp(config);
//creating a database to carry firebase
var trainDatabase=firebase.database();

$("#add-train").on('click', function(){
  event.preventDefault();

  //grab train information
//pulling from the input
  var trainName=$("#trainName").val().trim();
  var destination=$("#destination").val().trim();
  var firstTrain=$("#firstTrain").val().trim();
  var frequency=$("#frequency").val().trim();


  // var newTrain={
  //   trainName:trainName,
  //   destination:destination,
  //   firstTrain:firstTrain,
  //   frequency:frequency
  //
  // };
//pushing train variables to firebase
  trainDatabase.ref().push({
    trainName:trainName,
    destination:destination,
    firstTrain:firstTrain,
    frequency:frequency,
    // dateAdded:firebase.SuperValue.TIMESTAMP


  });

  // console.log(newTrain.trainName);
  // console.log(newTrain.destination);
  // console.log(newTrain.firstTrain);
  // console.log(newTrain.frequency);
//resetting the input forms
  $("#trainName").val("");
  $("#destination").val("");
  $("#firstTrain").val("");
  $("#frequency").val("");

});

trainDatabase.ref().on("child_added", function(childSnapshot, prevChildKey){
  var trainName=childSnapshot.val().trainName;
  var destination=childSnapshot.val().destination;
  var firstTrain=childSnapshot.val().firstTrain;
  var frequency=childSnapshot.val().frequency;

//calculatting arrival of the next train

var firstTimeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
console.log(firstTimeConverted);
// Current Time
var currentTime = moment();
console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
// Difference between the times
var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
console.log("DIFFERENCE IN TIME: " + diffTime);
// Time apart (remainder)
var tRemainder = diffTime % frequency;
console.log(tRemainder);
// Minute Until Train
var tMinutesTillTrain = frequency - tRemainder;
console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
// Next Train
var nextTrain = moment().add(tMinutesTillTrain, "minutes");
console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));


//displaying train info to the train table
  $("#train-table > tbody").prepend("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
  frequency + "</td><td>" +  moment(nextTrain).format("hh:mm") + "</td><td>" + tMinutesTillTrain + "</td></tr>");

})

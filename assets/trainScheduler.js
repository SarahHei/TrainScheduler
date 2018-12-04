//Start by initializing Firebase as a method for storing data   
  var config = {
    apiKey: "AIzaSyD9XJcGjCG6aZWFpDbCZ0gR7ZF7_9cAF54",
    authDomain: "trainscheduler-b3d69.firebaseapp.com",
    databaseURL: "https://trainscheduler-b3d69.firebaseio.com",
    projectId: "trainscheduler-b3d69",
    storageBucket: "trainscheduler-b3d69.appspot.com",
    messagingSenderId: "1081291282275"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

//when the button is clicked, runs the function
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();
  var trainName = $("#formTrainName").val().trim();
  var destination = $("#formTrainDestination").val().trim();
  var firstTrain = moment($("#formFirstTrainTime").val().trim(), "hh:mm").format("X");
  var frequency = parseInt($("#formFrequency").val().trim());

  //creating an object here so that we an push the object to Firebase
  //Firebase can only accept an object
  //have to create new names for the object
  var nextTrain = {
    name: trainName,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency
  };

  // uploads the train data to the database 
  database.ref().push(nextTrain);

  console.log(nextTrain);

  alert("Train successfully added");

  // This clears all of the text-boxes
  $("#formTrainName").val("");
  $("#formTrainDestination").val("");
  $("#formFirstTrainTime").val("");
  $("#formFrequency").val("");
});

//from Firebase there is a feature called child added
//this allows you to update the application with the response
//snapshot of what the database looks like
//the child snapshot is coming from Firebase
//consult documentation within Firebase to understand function terms
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

//this confirms the child was added

  console.log("Child is here", childSnapshot.val());

  // Variables
  // in first function we are defining variables only within that function
  // now we are defining variables in this function
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var firstTrainTime = childSnapshot.val().firstTrain;
  var frequency = parseInt(childSnapshot.val().frequency);

  // console log the train info
  console.log("New term is here", trainName);

// moment.js is how we convert times in this assignment

//from Chris Mendoza
  var firstTrain = moment($("#formFirstTrainTime").val().trim(), "hh:mm").format("X");
  var timeArr = firstTrain.split(":");
  var trainTime = moment().hours(timeArr[0]).minutes(timeArr[1]);
  var maxMoment = moment.max(moment(), firstTrainTime);
  var tMinutes;
  var tArrival;

  if (maxMoment === trainTime) {
    tArrival = trainTime.format("hh:mm A");
    tMinutes = trainTime.diff(moment(), "minutes");
  } else {

    var differenceTimes = moment().diff(trainTime, "minutes");
    var tRemainder = differenceTimes % tFrequency;
    tMinutes = tFrequency - tRemainder;
    tArrival = moment().add(tMinutes, "m").format("hh:mm A");
  }
  console.log("tMinutes:", tMinutes);
  console.log("tArrival:", tArrival);

//   // this adds train data to the table
// double check all of the variable names
$("#train-table > tbody").append(
  "<tr><td>" + trainName + 
  "</td><td>" + destination + 
  "</td><td>" + frequency + 
  "</td><td>" + nextTrain + 
  "</td><td>" + tMinutesTillTrain + "</td></tr>");
}); 

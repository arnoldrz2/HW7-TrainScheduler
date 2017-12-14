// Initialize Firebase
var config = {
  apiKey: "AIzaSyCP3uMBtyxzY06ND_SlKMPFHfQdEyY53d0",
  authDomain: "arnold-s-super-awesome-project.firebaseapp.com",
  databaseURL: "https://arnold-s-super-awesome-project.firebaseio.com",
  projectId: "arnold-s-super-awesome-project",
  storageBucket: "arnold-s-super-awesome-project.appspot.com",
  messagingSenderId: "681247902859"
};

firebase.initializeApp(config);

var database = firebase.database();

// Button for adding Train Information
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var trainDest = $("#destination-input").val().trim();
  var firstTrainTime = $("#first-train-time-input").val().trim();
  var trainFreq = $("#frequency-input").val().trim();

  var firstTimeConverted = moment(firstTrainTime, "hh:mm").subtract(1, "years");
  var currentTime = moment();
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  var tRemainder = diffTime % trainFreq;
  var minutesTillTrain = trainFreq - tRemainder;
  var nextTrain = moment().add(minutesTillTrain, "minutes");
  var nextTrainFormatted = moment(nextTrain).format("hh:mm");


  // Creates local "temporary" object for holding train information
  var newTrain = {
    name: trainName,
    destination: trainDest,
    time: firstTrainTime,
    frequency: trainFreq,
    nextArrival: nextTrainFormatted,
    minutesAway: minutesTillTrain,
  };

  // Uploads train data to the database
  database.ref().push(newTrain);

  // Alert
  alert("Train Info successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-train-time-input").val("");
  $("#frequency-input").val("");

});

// Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDest = childSnapshot.val().destination;
  var firstTrainTime = childSnapshot.val().time;
  var trainFreq = childSnapshot.val().frequency;
  var nextTrainFormatted = childSnapshot.val().nextArrival;
  var minutesTillTrain = childSnapshot.val().minutesAway;

  // Train Info
  console.log(trainName);
  console.log(trainDest);
  console.log(firstTrainTime);
  console.log(trainFreq);
  console.log(nextTrainFormatted);
  console.log(minutesTillTrain);

  // Prettify the first train time
  // var firstTrainTimePretty = moment.unix(firstTrainTime).format("HH:mm");

  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" + trainFreq + " minutes" + "</td><td>" + nextTrainFormatted + "</td><td>" + minutesTillTrain + "</td></tr>");
});

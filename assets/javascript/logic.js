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
  var firstTrainTime = moment($("#first-train-time-input").val().trim(), "HH:mm").format("HH:mm");
  var trainFreq = $("#frequency-input").val().trim();

  // Creates local "temporary" object for holding train information
  var newTrain = {
    name: trainName,
    destination: trainDest,
    time: firstTrainTime,
    frequency: trainFreq
  };

  // Uploads train data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.time);
  console.log(newTrain.frequency);

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
  var firstTrainTime = childSnapshot.val().start;
  var trainFreq = childSnapshot.val().frequency;

  // Train Info
  console.log(trainName);
  console.log(trainDest);
  console.log(firstTrainTime);
  console.log(trainFreq);

  // Prettify the first train time
  // var firstTrainTimePretty = moment.unix(firstTrainTime).format("HH:mm");

  // Calculate the next Arrival
  // var nextArrival = firstTrainTime;
  // console.log(nextArrival);

  // Calculate the total billed rate
  // var empBilled = empMonths * empRate;
  // console.log(empBilled);

  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" + trainFreq + " minutes" + "</td></tr>");
});

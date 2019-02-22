$( document ).ready(function() {
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
      
  
      $("#trainInfoBtn").on("click", function(event) {
          event.preventDefault(); 
          var trainName = $("#name").val().trim();
          var trainDestination = $("#dest").val().trim();
          var firstTrainTime = moment($("#initialTime").val().trim(), "hh:mm").subtract(1, "years").format("X");
          var frequency = $("#freq").val().trim();
              
          var currentTime = moment();
          console.log("CURRENT TIME: " +  moment(currentTime).format("hh:mm"));
      
          console.log(trainName);
          console.log(trainDestination);
          console.log(firstTrainTime);
          console.log(frequency);
          console.log(currentTime);
      
          var newTrain = {
      
              train: trainName,
              trainDest: destination,
              trainArrival: initialTime,
              everyMin: frequency
          };
      
      
          database.ref().push(newTrain);
      
      }); 
      
      database.ref().on("child_added", function(childSnapshot) {
      
              console.log(childSnapshot.val());
              var trainName = childSnapshot.val().train;
              var destination =childSnapshot.val().trainDest;
              var initialTime = childSnapshot.val().trainArrival;
              var frequency = childSnapshot.val().everyMin;
      
              var trainTime = moment(initialTime).format("hh:mm");
             
              var difference =  moment().diff(moment(trainTime),"minutes");
     
              var trainRemain = difference % frequency;
              console.log(trainRemain);
      
        
              var minRemain = frequency - trainRemain;
              console.log(minRemain);
      
         
              var nextArrival = moment().add(minRemain, "minutes").format('hh:mm');
              console.log(nextArrival);
      
              $("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
                   frequency + "</td><td>" + nextArrival + "</td><td>" + minRemain + "</td></tr>");
      
      });
      });
      
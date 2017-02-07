// Dashboard JS
// Moment!

$(function () {
    $('#datetimepicker10').datetimepicker({
        viewMode: 'years',
        format: 'MM/DD/YYYY'
    });
});

//age verification & beer-temp redirect!

$(".beerBtn").on("click", function(event) {
  event.preventDefault();

  var date = $(".date-birth").val();

  var birthdate = moment(date, "MM-DD-YYYY");

  var rightNow = moment();

  if(rightNow.diff(birthdate, 'years') > 21) {
    window.location.replace("./beer-temp.html");
  } else {
    alert("Go Away!");
  }
});

//age verification & wine-temp redirect!


$(".wineBtn").on("click", function(event) {
  event.preventDefault();

  var date = $(".date-birth").val();

  var birthdate = moment(date, "MM-DD-YYYY");

  var rightNow = moment();

  if(rightNow.diff(birthdate, 'years') > 21) {
    window.location.replace("./wine-temp.html");
  } else {
    alert("Go Away!");
  }
});

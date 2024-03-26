function analyze1() {
  $("#Result").val('');

  var title = $("#Title").val();
  if (title == '') {
    $("#Title").focus();
    return;
  }

  $.post("/", {
    "title": title,
    "servings": $("#Servings").val(),
    "ingredients": $("#Ingredients").val(),
    "instructions": $("#Instructions").val()
  },
  function(data, status) {
    $("#Result").val(JSON.stringify(JSON.parse(data), null, 8).replace('null', '""'));
  }).done(function() {
    console.log("second success");
  })
  .fail(function(data) {
    $("#Result").val(JSON.stringify(JSON.parse(data.responseText), null, 8).replace('null', '""'));
  })
  .always(function() {
    console.log("finished");
  });
}

function analyze2() {
  $("#Result").val('');

  var title = $("#ID").val();
  if (title == '') {
    $("#ID").focus();
    return;
  }

  var inc = $('#IncludeNutrition').is(":checked") == 'on' ? true : false;
  $.post("/api2", {
    "id": title,
    "includeNutrition": inc,
  },
  function(data, status) {
    $("#Result").val(JSON.stringify(JSON.parse(data), null, 8).replace('null', '""'));
  }).done(function() {
    console.log("second success");
  })
  .fail(function(data) {
    $("#Result").val(JSON.stringify(JSON.parse(data.responseText), null, 8).replace('null', '""'));
  })
  .always(function() {
    console.log("finished");
  });
}

function openTab(tabId, tablink) {
  $("#Result").val('');
  
  var i;
  var x = document.getElementsByClassName("tab");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  document.getElementById(tabId).style.display = "block";

  var y = document.getElementsByClassName("tab-link");
  for (i = 0; i < y.length; i++) {
    y[i].className = y[i].className.replace(" w3-light-green", "");
  }
  tablink.className += " w3-light-green";

  var z = document.getElementsByClassName("tab-desc");
  for (i = 0; i < z.length; i++) {
    z[i].style.display = "none";
  }
  document.getElementById(tabId+'-desc').style.display = "block";
}
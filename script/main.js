var $input = $("#search");
var $srcResult = $("#result");
var handleError = $("#error");
var list = [];
var listDrop = [];
var $singleMovie = $("#singleMovie");
var $drop = $('#drop');
var $dark = $('#dark');
$(window).on("load",function() {
  $(window).scroll(function() {
    var windowBottom = $(this).scrollTop() + $(this).innerHeight();
    $(".fade").each(function() {
      /* Check the location of each desired element */
      var objectBottom = $(this).offset().top + $(this).outerHeight();
      
      /* If the element is completely within bounds of the window, fade it in */
      if (objectBottom < windowBottom*1.09) { //object comes into view (scrolling down)
        if ($(this).css("opacity")==0) {$(this).fadeTo(500,1);}
      } else { //object goes out of view (scrolling up)
        if ($(this).css("opacity")==1) {$(this).fadeTo(500,1);}
      }
    });
  }).scroll(); //invoke scroll-handler on page-load
});
$dark.on('click', function(){
  document.documentElement.classList.toggle('dark-mode');
  if (document.documentElement.classList == 'dark-mode'){
  $dark.attr('src', 'images/sun.png')
  }
  else {
    $dark.attr('src', "images/moon.png")
  }
  }
)
$(document).ready(function () {
  getTop50();
  getTop10();
  $input.on ("input",function (event) {
    console.log(event.target.value)
      handleError.text("");
      var inputValue = event.target.value;
      if (inputValue) {
        search(inputValue);
        
      } else {
        handleError.text("Error!");
      }
  });
});

function search(inputVal){
  let tvmaze = "http://api.tvmaze.com/search/shows?q=" + inputVal;
  const tvmazeReques = fetch(tvmaze).then(function (response) {
    return response.json()
  }).then(function (data){
    list = [];
    listDrop = [];
    $drop.html("");
    data.forEach(function (element,i) {
      console.log(element);
      list.push(element);
      listDrop.push(element[i]);
    });
    
    showOnPage();}
    )};

function showOnPage() {
  list.forEach(function (element, i) {
     var drop = $('<ul class=col-4>');
     drop = $('<li class="list"><img class="inverted" src=' +  list[i].show.image.original + '>' + '<p>' + list[i].show.name + '</p></li>');
    $drop.append(drop);
    drop.on("click", function () {
      console.log(list[i].url);
      window.location;
      console.log(window.location.href);
      window.location.href = "pageInfoMovie.html?name=" + list[i].show.name;
    });
    
  });
}

function getTop50(){
  let showMaze = "http://api.tvmaze.com/shows";
  const showMazeResponse = fetch(showMaze).then(function (response){
    return response.json()
  }).then(function (data) {
    var div = $("<div class = col-md-4>");
    data.sort(function(a, b){return b.popularity-a.popularity});
    for (var i = 0; i < 50; i++) {
      list.push(data[i]);
    }
   
    console.log(list)
    displayTop50();
  })
}

function displayTop50(){
    list.forEach(function (element, i) {
        var div = $("<div class = 'col-md-4 fade zoom'>");
        div.append("<img class='inverted' src=" + list[i].image.original + ">");
        div.append("<p class = 'text-primary movies inverted'>" + list[i].name + "</p>");
        
        $srcResult.append(div);
        div.on("click", function () {
            console.log(list[i].url);
            window.location;
            console.log(window.location.href);
            window.location.href = "pageInfoMovie.html?name=" + list[i].name;
          });
    })
}

function getTop10(){
  const top10 = "http://api.tvmaze.com/shows";
  const top10Respond = fetch(top10).then(function(response){
    return response.json()
  }).then(function (response) {
    
    response.sort(function(a, b){return b.rating.average-a.rating.average});
    for (var i = 0; i < 10; i++) {
      listDrop.push(response[i]);
    }
    console.log(listDrop)
    display10();
  });

}

function display10(){
  listDrop.forEach(function(element, i){
    var disp = '<li role="presentation"><a role="menuitem" tabindex="-1" href="#" >' + listDrop[i].name + '</li>';
    $drop.append(disp)
  })

}

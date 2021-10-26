// An example of how to use the Hacker News API
// Uses JavaScript
// and Jquery

//Basics: Hacker News:
//hosts everything using firebase whihc is an online database
//google initiative
//people mainly use react because you need to run it on a live server
//react uses node server in background

//this API really only lets us query by Id
  //which means we have to do two getJson calls

//in this example we ids by the top stories category
//and then we need to make a second request to actually get the entry corresponding to the id

//CONSTS AND VARS
//
const url = "https://hacker-news.firebaseio.com/v0/topstories.json";//json of the topstories
//define how many stories you want to print out
let numberOfStories = 50;

//
// $( document ).ready()
//
//wait for the document to load, when it does do all of our stuff
$(document).ready(function() {
  $("#ourExample").hide();
  $(".stories-container").hide();
  $("#buttonHacker").on("click", displayTopStories);

  $( "#exampleButton" ).click(function() {
      $(".homePage").hide();
      $("#ourExample").show();
      console.log('test')
  });
  //
  //displayTopStories()
  //
  //main function
  //gets called when we click a button
  function displayTopStories() {
    $(".stories-container").empty();
    $(".stories-container").show();
    $("pre").hide();

    //getJSON
    //pass url and function
    //get url where JSON file is..
    $.getJSON(url, iterateIds)
      //fail
      .fail(function() {
        console.log("error");
      });
    // getJSON

    //
    //iterateIds(results)
    //
    //iterate over the ids given to us from the topstories.json
    function iterateIds(results) {
      console.log(results);
      //topStories outputs like 500 ids so we want only a few of those
      //number of stories we want is in global variable numberOfStories
      //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
      var slicedResult = results.slice(0, numberOfStories);

      //map(callbackFn)
      slicedResult.map(secondURLRequest);
      //Function that is called for every element of arr.
      //Each time callbackFn executes, the returned value is added to newArray.

      //from our sliced results we make a request for each ID to get it's json file
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
      // slicedResult.map( //make a request each time for each //
      //   //map iterates thru an array and runs this function on each item in the array
      //   //id is the each element in the Array
      //   //build a new url
      //   function(id) { //anonymous function
      //     //console.log(id);
      //     let urlById = `https://hacker-news.firebaseio.com/v0/item/${id}.json`;
      //     $.getJSON(urlById, displayResultsById) //makes a request with this url
      //     //make a request for each id
      //     //filter within the results you get
      //   }
      // )

      function secondURLRequest(id){
        let urlById = `https://hacker-news.firebaseio.com/v0/item/${id}.json`;
        $.getJSON(urlById, displayResultsById) //makes a request with this url
        //make a request for each id
        //filter within the results you get
      }

      //
      //displayResultsById(res)
      //
      //displaying our results
      //get indexes of the result we have called
      //we can see what properties there are from the api

      let counter = 0;//counter so we can number the items in the array
      function displayResultsById(res) {
      // console.log(res);

        counter++;
      // if (res.title.includes('Facebook')){ // a way of filtering the data
        let name = res.by; // name of author
        let singleStoryContainer = $("<article>").addClass("single-story").appendTo($(".stories-container"));
        let story = $("<p>").addClass("story").appendTo(singleStoryContainer);
        var html = '';
        html = ' <a href="'+res.url+'" id="article_a" target="_blank" >'+res.title+'</a>'; //res.url = url of link, res.title = title of liink
        story.html(`${counter}` + '. ' + `${html}` + ' ' + 'by' + ' ' +  '<span class ="user-name-test">' + `${name}` + "</span>");
      }
    // }
    }
  }
}); //document ready

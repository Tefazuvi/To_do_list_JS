'use strict';

var todoItems;

var Module = (function () {

    var _getHtmlItem = function (item) {
        var htmlItem = `<input type="checkbox" class="task_list__item" name="task" value="${item.id}" ${ item.completed ? 'checked' : ''}> ${item.title} <br>`;
        return htmlItem;
    };

    var fetchAll = async function () {

        // read our JSON
        let response = await fetch('https://jsonplaceholder.typicode.com/todos');
        let todos = await response.json();

        todoItems = todos.slice(0, 10);
        document.getElementById("all_tasks").innerHTML = todoItems.map(_getHtmlItem).join(' ');

    };

    var addTask = async function () {

        var newTask = document.getElementById('new_task').value;
        document.getElementById('new_task').value = '';

        todoItems.unshift({"userId": 1, "id": todoItems.length+1 , "title": newTask, "completed": false});
        
        document.getElementById('all_tasks').innerHTML = todoItems.map(_getHtmlItem).join(' ');
    };

    return {
        fetchAll: fetchAll,
        addTask: addTask
    };

})();

// set up text to print, each item in array is new line
var aText = new Array(
    "My to-do list"
    );
    var iSpeed = 100; // time delay of print out
    var iIndex = 0; // start printing array at this posision
    var iArrLength = aText[0].length; // the length of the text array
    var iScrollAt = 20; // start scrolling up at this many lines
     
    var iTextPos = 0; // initialise text position
    var sContents = ''; // initialise contents variable
    var iRow; // initialise current row
     
    function typewriter()
    {
     sContents =  ' ';
     iRow = Math.max(0, iIndex-iScrollAt);
     var destination = document.getElementById("typedtext");
     
     while ( iRow < iIndex ) {
      sContents += aText[iRow++] + '<br />';
     }
     destination.innerHTML = sContents + aText[iIndex].substring(0, iTextPos) + "_";
     if ( iTextPos++ == iArrLength ) {
      iTextPos = 0;
      iIndex++;
      if ( iIndex != aText.length ) {
       iArrLength = aText[iIndex].length;
       setTimeout("typewriter()", 500);
      }
     } else {
      setTimeout("typewriter()", iSpeed);
     }
    }
    
    
    typewriter();
    Module.fetchAll();
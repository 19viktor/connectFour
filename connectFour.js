$(document).ready(function(){

/*--------------Creates player classes--------------*/
  var redPlayer = {
    name: prompt("Enter your name below. You will be red."),
    playerColor:"rgb(255, 0, 0)"
  }
  var yellowPlayer = {
    name: prompt("Enter your name below. You will be yellow."),
    playerColor:"rgb(255, 255, 0)"
  }

/*--------------Function that allows players to pick a name and sets starting player--------------*/
  var currentPlayer = redPlayer;
  var currentColor = currentPlayer.playerColor;

  function initialization(){
    redPlayer.name =  prompt("Enter your name below. You will be red.");
    yellowPlayer.name =  prompt("Enter your name below. You will be red.");
    currentPlayer = yellowPlayer;
  }

/*--------------Function that checks the color of the button at (row,column)--------------*/
  function checkColor(row,column) {
    var buttonColor = $(".board tr").eq(row).children().eq(column).find('button').css("background-color")
    return buttonColor;
  }

/*--------------Function that finds the "lowest" unoccupied position in the column--------------*/
  function checkColumn(clickedColumn) {
    for(var i=$(".board tr").length-1;i>-1;i--) {
      if(checkColor(i,clickedColumn)==="rgb(255, 255, 255)"){
        return i;
      }
    }
  }

/*--------------Function that changes the color to the current player's color--------------*/
  function changeColor(row,column,currentColor){
    $(".board tr").eq(row).children().eq(column).find('button').css("background-color",currentColor)
  }


  /*--------------win conditions: One function for each (horizontal/vertical/diagonal)--------------*/
  function verticalWin(row, column){
    if(checkColor(row, column) == currentPlayer.playerColor && checkColor(row+1, column) == currentPlayer.playerColor && checkColor(row+2, column) == currentPlayer.playerColor && checkColor(row+3, column) == currentPlayer.playerColor){
      return true;
    }
  }

  function horizontalWin(row){
    var consecCount = 0;
    for(var i=0;i<7;i++){
      if(checkColor(row,i) == currentPlayer.playerColor){
        consecCount++;
        if(consecCount >= 4){
          return true;
        }
      }
      else {
        consecCount = 0;
      }
    }
  }

  function diagonalWin(row, column){
    var consecCount = 0;
    var initialRow = row;
    var initialColumn = column;

/*--------------Checks whether there are 4 buttons that are the same color on the diagonal: lower left to upper right---------------*/
    while(row !=5 && column != 0){
      row++;
      column--;
    }

    for(var i=0;i<7;i++){
      if(checkColor(row-i,column+i) == currentPlayer.playerColor){
        consecCount++;
        if(consecCount >= 4){
          return true;
          consecCount = 0;
        }
      }
      else {
        consecCount = 0;
      }
    }

    row = initialRow;
    column = initialColumn;

/*--------------Checks whether there are 4 buttons that are the same color on the diagonal: lower right to upper left---------------*/
    while(row !=5 && column != 6){
      row++;
      column++;
    }

    for(var i=0;i<7;i++){
      if(checkColor(row-i,column-i) == currentPlayer.playerColor){
        consecCount++;
        if(consecCount >= 4){
          return true;
          consecCount = 0;
        }
      }
      else {
        consecCount = 0;
      }
    }
  }

/*--------------What happens when you click on the board---------------*/
  $('td').click(function() {
      var clickedColumn = $(this).index();
      var $tr = $(this).closest('tr');

      var availableRow = checkColumn(clickedColumn);
      changeColor(availableRow,clickedColumn,currentColor)


      if(verticalWin(availableRow, clickedColumn) || horizontalWin(availableRow) || diagonalWin(availableRow, clickedColumn)){
        alert(currentPlayer.name + " won!")
        $(".board tr").children().find('button').css("background-color", "white")
        initialization();
      }

      if(currentPlayer == redPlayer){
        currentPlayer = yellowPlayer;
      }
      else {    
        currentPlayer = redPlayer;
      }
      currentColor = currentPlayer.playerColor;

  });

});

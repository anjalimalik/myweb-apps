/// <reference path="BillableHrs.html"/>

// Global variables
var array = [];
var total;
var input;


function onload() {

    total = parseFloat(0);
    btnSave.onclick = btnSave_onclick;

    var currDate = new Date();
    var d = currDate.getDate();
    var m = currDate.getMonth();
    m = m + 1; //because months start from 0-11 
    var y = currDate.getFullYear();
    
    // Add zero if single digit date or month
    if(d < 10){
        d ='0' + d;
    } 
    if(m < 10){
        m ='0' + m;
    } 

    currDate = m + '/' + d + '/' + y; //update into string with desirable format
    document.getElementById('txtDateWorked').placeholder = currDate; //default is the current date

}


// Getting input after its validation
function validate(){

    if(checkEmployeeID(txtEmployeeID.value) === false){
        alert("Employee ID cannot be empty");
        txtEmployeeID.focus();
        return false;
    }
    if(checkDate(txtDateWorked.value) === false){
        alert("Date Worked cannot be empty, must be a valid date, and is required to be in mm/dd/yy format");
        txtDateWorked.focus();
        return false;
    }

    if(checkHours(txtHoursWorked.value) === false){
        alert("Hours Worked is required to be greater than 0 and less than 4.00 and only in fifteen minute intervals");
        txtHoursWorked.focus();
        return false;
    }
    if(checkDescription(txtDescription.value) === false){
        alert("Description must contain at least 20 characters");
        txtDescription.focus();
        return false;
    }

    input = {
        empid: txtEmployeeID.value,
        date: txtDateWorked.value,
        hours: txtHoursWorked.value,
        description: txtDescription.value
    }

    // STORE IN ARRAY
    array.push(input);
    localStorage.setItem(input.empid, JSON.stringify(array[array.length-1]));

}

// GETTER FOR INPUT 
function getEntry() {
    return input;
}


// WHEN PRESSED SAVE
function btnSave_onclick() {

        if(validate() === false){
            return;
        }
        
        var entry = getEntry();

        var list = document.getElementById("list1"); // get the current table
        
        var add = list.insertRow(1); // make new row in table
    
        // make new cells
        var ecol = add.insertCell(0);
        var dcol = add.insertCell(1);
        var hcol = add.insertCell(2);
        var descol = add.insertCell(3);
        var delcol = add.insertCell(4);
    
        // inserting variable values into respective columns
        ecol.innerHTML= entry.empid;
        dcol.innerHTML= entry.date;
        hcol.innerHTML= entry.hours;
        descol.innerHTML= entry.description;
        delcol.innerHTML= "<input type = \"button\" value = \"Delete\" onclick = \"deleteEntry(this);\">";

        updateTotal(entry.hours, "add");
        clear();
    
    }
    
    // IMMEDIATELY CLEAR TEXTBOX VALUES OF SOME
    function clear(){
        document.getElementById("txtHoursWorked").value = "";
        document.getElementById("chckbill").checked=false;
        document.getElementById("txtDescription").value = "";
    }

    // UPDATE TOTAL HOURS WORKED
    function updateTotal(hrs, str){
        
        total = parseFloat(total);
        hrs = parseFloat(hrs);
        if(str === "add"){
            total = total + hrs;
            document.getElementById("lbTotal").innerHTML = total.toFixed(2);
        } else if (str === "subtract"){
            total = total - hrs;
            document.getElementById("lbTotal").innerHTML = total.toFixed(2);
        }

    }


    // DELETE AN ENTRY
    function deleteEntry(del){

        if(confirm("Are you sure you want to delete this entry?") === true){

            var list = document.getElementById("list1");
            var irow = del.parentNode.parentNode.rowIndex;
            var hrs = del.parentNode.parentNode.cells[2].textContent;
            updateTotal(hrs, "subtract");
            list.deleteRow(irow);

            var findemp = del.parentNode.parentNode.cells[0].textContent;
            var finddate = del.parentNode.parentNode.cells[1].textContent;
            var findhours = del.parentNode.parentNode.cells[2].textContent;
            var findes = del.parentNode.parentNode.cells[3].textContent;
            var index = 0;
            for(var i = 0; i < array.length; i++) {
                if ((array[i].empid === findemp) && (array[i].hours === findhours) && (array[i].description=== finddes) && (array[i].date === finddate)) {
                    index = i;
                    break;
                }
            }
            array.splice(index, 1);
            
        } else {
            return;
        }
    }


/////////////// HELPER FUNCTIONS for input validation ///////////////////////////////

function checkDate(str){
    if(str === ""){ 
        return false;
    } 

    var pattern = /^\d{1,2}\/\d{1,2}\/\d{2}$/;
        if(pattern.test(str) === false){
            return false;
        }
    var parseDate = str.split("/");
    var m = parseInt(parseDate[0], 10);
    var d = parseInt(parseDate[1], 10);
    var y = parseInt(parseDate[2], 10);
    
    if(m <= 0 || m > 12 || y < 00 || d > 31 || d < 0){return false;}
    if(y % 4 === 0){
        var daysinmonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    } else {
        var daysinmonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    }
    
    if(d > daysinmonth[m-1]){ return false; }

    return true;

}

function checkHours(str){
    if(str === ""){ 
        return false;
    } 

    var hrs = parseFloat(str);
    if(hrs < 0.00 || hrs > 4.00){
        return false;
    }

    var possiblehrs = [0.00, 0.25, 0.50, 0.75, 1.00, 1.25, 1.50, 1.75, 2.00, 2.25, 2.50, 2.75, 3.00, 3.25, 3.50, 3.75, 4.00];

    if(possiblehrs.indexOf(hrs) < 0){
        return false;
    }

    return true;

}

function checkDescription(str){
    if(str === ""){ 
        return false;
    } 
    if(str.length < 20){
        return false;
    }
    return true;
}

function checkEmployeeID(str){
    if(str === ""){ 
        return false;
    } else{
        return true;
    }
}

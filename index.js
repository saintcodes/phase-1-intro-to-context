// Your code here
/**
 * Creates an employee record object.
 * @param {Array} employeeInformation : e.g. [firstName, familyName, title, payPerHour]
 * @returns {Object}
 */
function createEmployeeRecord (employeeInformation) {
  return {
    firstName: employeeInformation[0],
    familyName: employeeInformation[1],
    title: employeeInformation[2],
    payPerHour: employeeInformation[3],
    timeInEvents: [],
    timeOutEvents: [],
  }
}

/**
 * Takes in an array of employee information, each data set being an array, and
 * creates an employee record for each.
 * @param {Array} recordsArray 
 * @returns {Array} an array of employee record objects
 */
function createEmployeeRecords (recordsArray) {
const employeeRecords = recordsArray.map((record) => {
  return createEmployeeRecord(record)
  })
  return employeeRecords
}

function createTimeInEvent(recordObj, dateStamp) {
  let dateHourSplit = dateStamp.split(' ')
  let date = dateHourSplit[0]
  let hour = parseInt(dateHourSplit[1])

  let timeIn = {
    type: "TimeIn",
    hour: hour,
    date: date,
  }
  recordObj.timeInEvents.push(timeIn);
  return recordObj
}

function createTimeOutEvent(recordObj, dateStamp) {
  let dateHourSplit = dateStamp.split(' ')
  let date = dateHourSplit[0]
  let hour = parseInt(dateHourSplit[1])

  let timeOut = {
    type: "TimeOut",
    hour: hour,
    date: date,
  }
  recordObj.timeOutEvents.push(timeOut);
  return recordObj
}

function hoursWorkedOnDate(recordObj, date) {
  let timeInObjArray = recordObj.timeInEvents;
  let timeOutObjArray = recordObj.timeOutEvents;
  let timeOut = timeOutObjArray.find(timeOutObj => timeOutObj.date === date)
  let timeIn = timeInObjArray.find(timeInObj => timeInObj.date === date)
  return (timeOut.hour - timeIn.hour)/100
}

function wagesEarnedOnDate(recordObj, date) {
  return hoursWorkedOnDate(recordObj, date) * recordObj.payPerHour
}

function allWagesFor(recordObj) {
  //instead of using for loop, return a new array using map, then use reduce
  const totalWagesPerDate = recordObj.timeInEvents.map((timeInEventObj) => {
    return wagesEarnedOnDate(recordObj, timeInEventObj.date)
  })
  const totalWagesForEmployee = totalWagesPerDate.reduce((previousVal, currentVal) => previousVal + currentVal)
  return totalWagesForEmployee
}

// calculatePayroll
// Argument(s)
// Array of employee records
// Returns
// Sum of pay owed to all employees for all dates, as a number
// Behavior
// Using wagesEarnedOnDate, accumulate the value of all dates worked by the employee in the record used as context. Amount should be returned as a number.
function calculatePayroll(recordsArray) {
  const allEmployeeWagesPerDate = recordsArray.map((employeeRecordObj) => allWagesFor(employeeRecordObj))

  const totalWagesforAllEmployees = allEmployeeWagesPerDate.reduce((previousVal, currentVal) => previousVal + currentVal)

  return totalWagesforAllEmployees

  // return recordsArray.map((employeeRecordObj) => {
  //   return allWagesFor(employeeRecordObj)
  // }).reduce((previousVal, currentVal) => previousVal + currentVal)

}
// Your code here
function createEmployeeRecord(array) {
  const [firstName, familyName, title, payPerHour] = array
  // deconstructing
  return {
    firstName,
    familyName,
    title,
    payPerHour,
    "timeInEvents": [],
    "timeOutEvents": []
  }
}

function createEmployeeRecords(employees) {
  return employees.map(employee => createEmployeeRecord(employee))
}

function createTimeInEvent(employeeRecord, dateStamp) {
  const time = dateStamp.split(" ")
  const updateRecord = {
    type: "TimeIn",
    hour: parseInt(time[1]),
    date: time[0]
  }
  employeeRecord.timeInEvents.push(updateRecord)
  return employeeRecord
}

function createTimeOutEvent(employeeRecord, dateStamp) {
  const time = dateStamp.split(" ")
  const updateRecord = {
    type: "TimeOut",
    hour: parseInt(time[1]),
    date: time[0]
  }
  employeeRecord.timeOutEvents.push(updateRecord)
  return employeeRecord
}

function hoursWorkedOnDate(employeeRecord, date) {
  const timeIn = employeeRecord.timeInEvents.find((event) => event.date === date)
  const timeOut = employeeRecord.timeOutEvents.find((event) => event.date === date)

  if( timeIn && timeOut ) {
    return (timeOut.hour - timeIn.hour) / 100
  }
}

function wagesEarnedOnDate(employeeRecord, date) {
  const payOwed = hoursWorkedOnDate(employeeRecord, date) * employeeRecord.payPerHour
  return payOwed
}

function allWagesFor(employeeRecord) {
  const foo = employeeRecord.timeInEvents.reduce( (total, event) => (
     total + wagesEarnedOnDate(employeeRecord, event.date)
  ), 0)

  return foo
}

function calculatePayroll(employees) {
  return employees.reduce((total, employee) => total + allWagesFor(employee), 0)
}

function findEmployeeByFirstName(srcArray, firstName) {
  return srcArray.find(employee => employee.firstName === firstName)
}
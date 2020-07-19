function createEmployeeRecord(array) {
  const [firstName, familyName, title, payPerHour] = array
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

function createTimeInEvent(employeeRec, dateStamp) {
  const time = dateStamp.split(" ")
  // A date stamp ("YYYY-MM-DD HHMM")
  const updateEmployeeRec = {
    type: "TimeIn",
    hour: parseInt(time[1]),
    date: time[0]
  }
  employeeRec.timeInEvents.push(updateEmployeeRec)
  return employeeRec
}

function createTimeOutEvent(employeeRec, dateStamp) {
  const time = dateStamp.split(" ")
  // A date stamp ("YYYY-MM-DD HHMM")
  const updateEmployeeRec = {
    type: "TimeOut",
    hour: parseInt(time[1]),
    date: time[0]
  }
  employeeRec.timeOutEvents.push(updateEmployeeRec)
  return employeeRec
}

function hoursWorkedOnDate(employeeRec, date) {
  const timeIn = employeeRec.timeInEvents.find((event) => event.date === date)
  const timeOut = employeeRec.timeOutEvents.find((event) => event.date === date)

  if( timeIn && timeOut ) {
    return (timeOut.hour - timeIn.hour) / 100
  }
}

function wagesEarnedOnDate(employeeRec, date) {
  const owedPay = hoursWorkedOnDate(employeeRec, date) * employeeRec.payPerHour
  return owedPay
}

function allWagesFor(employeeRec) {
  const wages = employeeRec.timeInEvents.reduce( (total, event) => (
    total + wagesEarnedOnDate(employeeRec, event.date)), 0)
    return wages
}

function calculatePayroll(employees) {
  // return Sum of pay owed to all employees for all dates, as a number
  return employees.reduce((total, employee) => total + allWagesFor(employee), 0)
}

function findEmployeeByFirstName(freshArray, firstName) {
  return freshArray.find(employee => employee.firstName === firstName)
}
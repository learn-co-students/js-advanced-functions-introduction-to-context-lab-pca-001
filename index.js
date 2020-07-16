// Your code here

function createEmployeeRecord(employeeArray) {
  let [firstName, familyName, title, payPerHour] = employeeArray
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

function createTimeInEvent(employee, dateTime) {
  employee.timeInEvents.push({"type": "TimeIn", "date": dateFromDateTime(dateTime), "hour": hourFromDateTime(dateTime)})
  return employee
}

function hourFromDateTime(datetime) {
  return parseInt((datetime.split(" ")[1]))
}

function dateFromDateTime(datetime) {
  return datetime.split(" ")[0]
}

function createTimeOutEvent(employee, dateTime) {
  employee.timeOutEvents.push({"type": "TimeOut", "date": dateFromDateTime(dateTime), "hour": hourFromDateTime(dateTime)})
  return employee
}

function hoursWorkedOnDate(employee, date) {
  let startEvent = employee.timeInEvents.find((event) => event.date === date)
  let endEvent = employee.timeOutEvents.find((event) => event.date === date)

  if( startEvent && endEvent ) {
    return (endEvent.hour - startEvent.hour) / 100
  }
}

function wagesEarnedOnDate(employee, date) {
  return hoursWorkedOnDate(employee, date) * employee.payPerHour
}

function allWagesFor(employee) {
  return employee.timeInEvents.reduce((total, event) => (total + wagesEarnedOnDate(employee, event.date)), 0)
}

function calculatePayroll(employees) {
  return employees.reduce((total, employee) => total + allWagesFor(employee),0)
}

function findEmployeeByFirstName(employees, name) {
  return employees.find(employee => employee.firstName === name)
}
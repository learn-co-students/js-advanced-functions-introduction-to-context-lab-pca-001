// Your code here
function createEmployeeRecord(employeeArray) {
  let employee = {}

  employee.firstName = employeeArray[0]
  employee.familyName = employeeArray[1]
  employee.title = employeeArray[2]
  employee.payPerHour = employeeArray[3]
  employee.timeInEvents = []
  employee.timeOutEvents = []

  return employee
}

function createEmployeeRecords(employees) {
  return employees.map(employee => createEmployeeRecord(employee))
}

function createTimeInEvent(employeeRecord, timeIn) {
  let timeInEvent = {}

  timeInEvent.type = "TimeIn"
  timeInEvent.date = timeIn.slice(0, 10)
  timeInEvent.hour = parseInt(timeIn.slice(11))
  employeeRecord.timeInEvents.push(timeInEvent)

  return employeeRecord
}

function createTimeOutEvent(employeeRecord, timeIn) {
  let timeOutEvent = {}

  timeOutEvent.type = "TimeOut"
  timeOutEvent.date = timeIn.slice(0, 10)
  timeOutEvent.hour = parseInt(timeIn.slice(11))
  employeeRecord.timeOutEvents.push(timeOutEvent)

  return employeeRecord
}

function hoursWorkedOnDate(employeeRecord, date) {
  const timeIn = employeeRecord.timeInEvents.find(event => {
    return event.date === date
  }).hour

  const timeOut = employeeRecord.timeOutEvents.find(event => {
    return event.date === date
  }).hour

  return (timeOut - timeIn) / 100
}

function wagesEarnedOnDate(employeeRecord, date) {
  const hours = hoursWorkedOnDate(employeeRecord, date)
  const pay = employeeRecord.payPerHour

  return hours * pay
}

function allWagesFor(employeeRecord) {
  const wagesArr = employeeRecord.timeInEvents.map(event => {
    const date = event.date
    return wagesEarnedOnDate(employeeRecord, date)
  })

  return wagesArr.reduce((wage, total) => wage + total)
}

function calculatePayroll(employeeRecords) {
  const wagesArr = employeeRecords.map(employee => {
    return allWagesFor(employee)
  })

  return wagesArr.reduce((wage, total) => wage + total)
}

function findEmployeeByFirstName(employeeRecords, firstName) {
  return employeeRecords.find(employee => employee.firstName == firstName)
}
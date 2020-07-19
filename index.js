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

  function createEmployeeRecords(employeesArray) {
    return employeesArray.map(employee => createEmployeeRecord(employee))
  }

  // datestamp example = "YYYY-MM-DD HHMM"
  function createTimeInEvent(employee, datestamp) {
    employee.timeInEvents.push({
      "type": "TimeIn",
      "hour": parseInt(datestamp.split(" ")[1]), //parsInt convert string to integer
      "date": datestamp.split(" ")[0]
    })
    return employee
  }

  function createTimeOutEvent(employee, datestamp) {
    employee.timeOutEvents.push({
      "type": "TimeOut",
      "hour": parseInt(datestamp.split(" ")[1]), //parsInt convert string to integer
      "date": datestamp.split(" ")[0]
    })
    return employee
  }

  // date example = "YYYY-MM-DD"
  function hoursWorkedOnDate(employee, date) {
    let start = employee.timeInEvents.find( punchin => punchin.date === date)
    let end = employee.timeOutEvents.find( punchout => punchout.date === date)
    return (end.hour - start.hour) / 100
  }

  function wagesEarnedOnDate(employee, date) {
    return employee.payPerHour * hoursWorkedOnDate(employee, date)
  }

  function allWagesFor(employee) {
    return employee.timeInEvents.reduce((total, datestamp) => total + wagesEarnedOnDate(employee, datestamp.date), 0)
  }

  function findEmployeeByFirstName(employeesArray, firstname) {
   return employeesArray.find(employee => employee.firstName === firstname)
  }

  function calculatePayroll(employeesArray) {
   return employeesArray.reduce((total, employee) => total + allWagesFor(employee), 0)
  }
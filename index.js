function createEmployeeRecord(arr){
  let obj = {
      firstName: arr[0],
      familyName: arr[1],
      title: arr[2],
      payPerHour: arr[3],
      timeInEvents: [],
      timeOutEvents: []
  }
  // console.log(obj)
  return obj
}

function createEmployees(arryOfArrays) {
  let theArray = []
  arryOfArrays.forEach(element => {
      theArray.push(createEmployeeRecord(element))
  });
  return theArray
}

function createEmployeeRecords(arryOfArrays) {
  let theArray = []
  arryOfArrays.forEach(element => {
      theArray.push(createEmployeeRecord(element))
  });
  return theArray
}

function createTimeInEvent(obj, timeStamp) {
  let hour = parseInt(timeStamp.split(' ')[1])
  let date = timeStamp.split(' ')[0]
  obj.timeInEvents.push({type: "TimeIn", hour: hour, date: date})
  return obj
}

function createTimeOutEvent(obj, timeStamp) {
  let hour = parseInt(timeStamp.split(' ')[1])
  let date = timeStamp.split(' ')[0]
  obj.timeOutEvents.push({type: "TimeOut", hour: hour, date: date})
  return obj
}

function hoursWorkedOnDate(obj, timeStamp){
  let timeIn = obj.timeInEvents.find(x => x.date === timeStamp)
  let timeOut = obj.timeOutEvents.find(x => x.date === timeStamp)
  let result = (timeOut.hour - timeIn.hour) / 100
  return result
}


function allWagesFor(obj){
  let eligibleDates = obj.timeInEvents.map(function(e){
      return e.date
  })

  let payable = eligibleDates.reduce(function(memo, d){
      return memo + wagesEarnedOnDate(obj, d)
  }, 0)

  return payable
}

function wagesEarnedOnDate(obj, timeStamp){
  return hoursWorkedOnDate(obj, timeStamp) * obj.payPerHour
}

function findEmployeeByFirstName(srcArray, firstName){
  return srcArray.find(x => {return x.firstName === firstName})
}

function calculatePayroll(array){
  let sum = array.map((e) => allWagesFor(e))
  return sum.reduce((num, sum) => num + sum)
}


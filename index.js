// Your code here
const createEmployeeRecord = (arr) => {
  return {
    firstName: arr[0],
    familyName: arr[1],
    title: arr[2],
    payPerHour: arr[3],
    timeInEvents: [],
    timeOutEvents: [],
  }
};

const createEmployeeRecords = (arr2d) => arr2d.map( e => createEmployeeRecord(e) );

const timeEvent = (type, time) => {
  const [date, hour] = time.split(" ");
  return {
    type,
    date,
    hour: parseInt(hour),
  }
}

const createTimeInEvent = (records, time) => {
  records.timeInEvents.push(timeEvent("TimeIn", time));
  return records;
}

const createTimeOutEvent = (records, time) => {
  records.timeOutEvents.push(timeEvent("TimeOut", time));
  return records;
}

const findDate = (arr, date) => arr.find( el => el.date === date );

const hoursWorkedOnDate = (e, date) => {
  const out = findDate(e.timeOutEvents, date);
  const ins = findDate(e.timeInEvents, date);
  return (out.hour - ins.hour) / 100;
}
const calculateWage = (e) => e.payPerHour * (e.createTimeOutEvent[0].hour - e.timeInEvents[0].hour);
const wagesEarnedOnDate = (e, date) => hoursWorkedOnDate(e, date) * e.payPerHour;

const allWagesFor = (e) => e.timeOutEvents.reduce( (sum, curr) => sum + wagesEarnedOnDate(e, curr.date), 0);

const calculatePayroll = (records) => records.reduce( (sum, curr) => sum + allWagesFor(curr), 0);

const findEmployeeByFirstName = (arr, name) => arr.find( e => e.firstName === name  )
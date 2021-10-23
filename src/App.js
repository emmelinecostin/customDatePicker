import { useState, useEffect } from 'react';
import months from "../src/data/months.json";
import days from "../src/data/days.json";

function App() {
  // All Date Variables to use througout file
  var currentDate = new Date();
  var currentDay = currentDate.getDate();
  let currentMonth = currentDate.getMonth();
  let displayedCurrentMonth = (currentMonth + 1)
  var currentYear = currentDate.getFullYear();

  // All of our states 
  const [month, setMonth] = useState(displayedCurrentMonth);
  const [day, setDay] = useState(currentDay);
  const [year, setYear] = useState(currentYear);

  // Variables to hold current states
  let chosenDay = day;
  let displayedMonth = month;
  let chosenMonth = month - 1;
  let chosenYear = year;

  // variables to hold current date and new date
  let entireDate = new Date(chosenYear, chosenMonth, chosenDay);
  let todaysDate = new Date();

  //Calculate time difference between two dates 
  let timeDifference = Math.floor(todaysDate.getTime() - entireDate.getTime());

  //Calculate no. of days between two dates 
  let dayDifference = Math.abs(Math.floor(timeDifference / (1000 * 3600 * 24)));

  // All of our handleclicks 
  const handleMonth = (e) => {
    setMonth(e.target.value);
  }

  const handleDay = (e) => {
    setDay(e.target.value);
  }

  const handleYear = (e) => {
    setYear(e.target.value);
  }

  //using UseEffect to save the state after the first render 

  // Here is getting data that is saved from the local storage
  useEffect(() => {
    const dayData = localStorage.getItem('my-chosen-day');
    const monthData = localStorage.getItem('my-chosen-month');
    const yearData = localStorage.getItem('my-chosen-year');
    if (dayData) {
      setDay(JSON.parse(dayData));
    }
    if (monthData) {
      setMonth(JSON.parse(monthData));
    }
    if (yearData) {
      setYear(JSON.parse(yearData));
    }
  }, []);

  // Here we are saving the state in the local storage
  useEffect(() => {
    localStorage.setItem('my-chosen-day', JSON.stringify(day));
    localStorage.setItem('my-chosen-month', JSON.stringify(month));
    localStorage.setItem('my-chosen-year', JSON.stringify(year));
  });


  //What renders to the DOM 
  return (
    <div className="datePickerContainer">
      <form className="formContainer">
        <div className='monthContainer'>
          <label className="labels" htmlFor="Month"> Month  </label>

          <select value={displayedMonth} onChange={handleMonth} name="select month" id="selectMonth">

            {months.map((month) => (
              <option className="monthOptions" key={month.value} value={month.id}>{month.month}</option>
            ))}

          </select>
        </div>
        <div className="dayContainer">
          <label className="labels" htmlFor="day"> Day </label>
          <select value={chosenDay} onChange={handleDay} name="select day" id="selectDay">

            {days.map((day) => (
              <option key={day.value} value={day.value} >{day.value}</option>
            ))}

          </select>
        </div>
        <div className="yearContainer">
          <label className="labels" htmlFor="year"> Year </label>
          <input value={chosenYear} type="text" onChange={handleYear} />
        </div>

      </form>
      <div className="headerContainer">
        <h1> {handleMonth ? month : setMonth} / {handleDay ? day : setDay} / {handleYear ? year : setYear} is {dayDifference} days from now</h1>
      </div>
    </div>

  );
}

export default App;

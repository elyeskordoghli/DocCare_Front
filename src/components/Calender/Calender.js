import React, { useState } from 'react';
import '../../DatePicker.css';
import Category from 'pages/Category';
import categoryData from 'utils/categories';
const Calender = ({ date, setDate }) => {
 const [month, setMonth] = useState(date.getMonth());
 const [year, setYear] = useState(date.getFullYear());
 const [showMonths, setShowMonths] = useState(false);
 const [showYears, setShowYears] = useState(false);


 const [selectedDate, setSelectedDate] = useState(date);

 const handleDateChange = (newDate) => {
  setSelectedDate(newDate);
  setDate(newDate); // Met à jour le state 'date' dans le composant Category
};

 const monthList = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
 ];

 const daysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
 };

 const firstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
 };

 const datePickerHeader = () => {
    return (
      <div className="datepicker-header">
        <div className="month-btn" onClick={() => setShowMonths(!showMonths)}>
          {monthList[month]}
        </div>
        <div className="year-btn" onClick={() => setShowYears(!showYears)}>
          {year}
        </div>
      </div>
    );
 };

 const monthDropdown = () => {
    if (!showMonths) return null;

    return (
      <div className="month-dropdown">
        {monthList.map((month, index) => (
          <div
            key={index}
            className={`month-item ${index === month ? 'selected' : ''}`}
            onClick={() => {
              setMonth(index);
              setShowMonths(false);
            }}
          >
            {month}
          </div>
        ))}
      </div>
    );
 };

 const yearDropdown = () => {
    if (!showYears) return null;

    return (
      <div className="year-dropdown">
        {new Array(201).fill(null).map((_, index) => {
          const year = 1900 + index;
          return (
            <div
              key={index}
              className={`year-item ${year === year ? 'selected' : ''}`}
              onClick={() => {
                setYear(year);
                setShowYears(false);
              }}
            >
              {year}
            </div>
          );
        })}
      </div>
    );
 };

 const dateGrid = () => {
    const firstDay = firstDayOfMonth(year, month);
    const daysInThisMonth = daysInMonth(year, month);
    const daysInPreviousMonth = daysInMonth(year, month - 1);

    return (
      <div className="datepicker-grid">
        {new Array(7).fill(null).map((_, index) => (
          <div key={index} className="day-header">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'][index]}
          </div>
        ))}
        {new Array(firstDay).fill(null).map((_, index) => (
          <div key={index} className="day-item day-prev-month">
            {daysInPreviousMonth - firstDay + 1 + index}
          </div>
        ))}
        {new Array(daysInThisMonth).fill(null).map((_, index) => (
          <div
            key={index}
            className={`day-item day-this-month ${
              index === date.getDate() - 1 && year === date.getFullYear() && month === date.getMonth()
                ? 'selected'
                : ''
            }`}
            onClick={() => {
              setDate(new Date(year, month, index + 1));
              setSelectedDate(date);

            }}
          >
            {index + 1}
          </div>
        ))}
      </div>
    );
 };

 return (
   <div className="datepicker">
     {datePickerHeader()}
     {monthDropdown()}
     {yearDropdown()}
     {dateGrid()}
     

   </div>
 );
};
export default Calender;

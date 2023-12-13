import React, { useState } from 'react';
import '../../time-input.css.css';

const TimeInput = () => {
 const [time, setTime] = useState('');
 const [is24HourFormat, setIs24HourFormat] = useState(false);

 const handleInputChange = (e) => {
    const input = e.target.value;
    const is24Hour = input.slice(-2) === 'AM' || input.slice(-2) === 'PM';

    if (is24Hour && input.length === 7) {
      setIs24HourFormat(true);
    } else if (!is24Hour && input.length === 8) {
      setIs24HourFormat(false);
    }

    setTime(input);
 };

 const handleSubmit = (e) => {
    e.preventDefault();
    alert(`You entered: ${time}`);
 };

 return (
    <div className="time-input">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={time}
          onChange={handleInputChange}
          maxLength={is24HourFormat ? 8 : 7}
          required
        />
        <button type="submit">OK</button>
      </form>
    </div>
 );
};

export default TimeInput;
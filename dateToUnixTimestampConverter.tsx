import React, { useState } from "react";

const DateToUnixTimestampConverter = () => {
  const [inputDate, setInputDate] = useState("");
  const [timestamp, setTimestamp] = useState("");

  const convertDateToTimestamp = () => {
    const dateParts = inputDate.split("-");
    const year = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]);
    const day = parseInt(dateParts[2]);

    const secondsInDay = 86400; // 24 hours * 60 minutes * 60 seconds
    const daysInMonth = 30; // Assuming 30 days in a month for simplicity

    const totalDays = (year - 1970) * 365 + (month - 1) * daysInMonth + day - 1;
    const currentTimestamp = Math.floor(Date.now() / 1000);

    const calculatedTimestamp = currentTimestamp + totalDays * secondsInDay;
    setTimestamp(calculatedTimestamp);
  };

  return (
    <div>
      <h2>Date to Unix Timestamp Converter</h2>
      <input type="date" value={inputDate} onChange={e => setInputDate(e.target.value)} />
      <button onClick={convertDateToTimestamp}>Convert</button>
      {timestamp && <p>Unix Timestamp: {timestamp}</p>}
    </div>
  );
};

export default DateToUnixTimestampConverter;

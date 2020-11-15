import React from "react";

export default function DateAndTime() {
  let now = new Date();
  let hours = now.getHours();
  let minutes = addZero(now.getMinutes());
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let dayD = days[now.getDay()];

  function addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

  function showDateTime() {
    return (
      <h6>
        {" "}
       <em> It is currently {hours}:{minutes} on {dayD}{" "} </em>
      </h6>
    );
  }

  return showDateTime();
}

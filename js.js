const messageContainer = document.querySelector("#d-day-message");
const container = document.querySelector("#d-day-container");
const savedDate = localStorage.getItem("saved-date");
console.log(savedDate);
//container.style.display = "none";

const dateFormMaker = function () {
  const targetYear = document.querySelector("#target-year-input").value;
  const targetMonth = document.querySelector("#target-month-input").value;
  const targetDate = document.querySelector("#target-date-input").value;

  const dateFormat = `${targetYear}-${targetMonth}-${targetDate}`;
  return dateFormat;
};

const countMaker = function (data) {
  if (data !== savedDate) {
    localStorage.setItem("saved-date", data);
  }

  const nowDate = new Date();
  const targetDate = new Date(data).setHours(0, 0, 0, 0);
  const remaining = (targetDate - nowDate) / 1000;

  if (remaining <= 0) {
    container.style.display = "none";
    messageContainer.innerHTML = "<h3>타이머가 종료되었습니다.</h3>";
    messageContainer.style.display = "flex";
    setClearInterval();
    return;
  } else if (isNaN(remaining)) {
    container.style.display = "none";
    messageContainer.innerHTML = "<h3>유효한 시간대가 아닙니다.</h3>";
    messageContainer.style.display = "flex";
    setClearInterval();
    return;
  }

  const remainingObj = {
    remainingDate: Math.floor(remaining / 3600 / 24),
    remainingHours: Math.floor((remaining / 3600) % 24),
    remainingMins: Math.floor((remaining / 3600) % 60),
    remainingSecs: Math.floor(remaining % 60),
  };

  const documentArr = ["days", "hours", "mins", "secs"];
  const timeKeys = Object.keys(remainingObj);

  const format = function (time) {
    if (time < 10) {
      return "0" + time;
    } else {
      return time;
    }
  };

  let k = 0;
  for (let tag of documentArr) {
    const remainingTime = format(remainingObj[timeKeys[k]]);
    document.getElementById(tag).textContent = remainingTime;
    k++;
  }

  //  const docKeys = Object.keys(documentObj);

  /* for (let i = 0; i < timeKeys.length; i++) {
    documentObj[docKeys[i]].textContent = remainingObj[timeKeys[i]];
  } **/

  /*
  const documentObj = {
    days: document.getElementById("days"),
    hours: document.getElementById("hours"),
    mins: document.getElementById("mins"),
    secs: document.getElementById("secs"),
  }; **/

  /*
  let i = 0;
  for (let key in documentObj) {
    documentObj[key].textContent = remainingObj[timeKeys[i]];
    i++;
  }
**/

  /* 
  documentObj["days"].textContent = remainingObj["remainingDate"];
  documentObj["hours"].textContent = remainingObj["remainingHours"];
  documentObj["mins"].textContent = remainingObj["remainingMins"];
  documentObj["secs"].textContent = remainingObj["remainingSecs"]; 
  **/
};

const intervalIdArr = [];

const starter = function (targetDateInput) {
  console.log(targetDateInput);
  if (!targetDateInput) {
    targetDateInput = dateFormMaker();
  }

  container.style.display = "flex";
  messageContainer.style.display = "none";
  setClearInterval();
  /* for (let i = 0; i < 100; i++) {
    setTimeout(countMaker, 1000 * i);
  } */
  countMaker(targetDateInput);
  const intervalId = setInterval(() => countMaker(targetDateInput), 1000);
  intervalIdArr.push(intervalId);
};

const setClearInterval = function () {
  localStorage.removeItem("saved-date");
  for (let i = 0; i < intervalIdArr.length; i++) {
    clearInterval(intervalIdArr[i]);
  }
};

const resetTimer = function () {
  container.style.display = "none";
  messageContainer.innerHTML = "<h3>D-day를 입력해주세요.</h3>";
  messageContainer.style.display = "flex";
  setClearInterval();
};

if (savedDate) {
  starter(savedDate);
} else {
  messageContainer.innerHTML = "<h3>D-day를 입력해주세요.</h3>";
  container.style.display = "none";
}

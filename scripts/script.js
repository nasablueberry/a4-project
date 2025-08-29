// Shared utility functions begin
function fetchElementIntValueById(elemId) {
  const elemInt = parseInt(document.getElementById(elemId).innerText);
  return elemInt;
}

function assignValueToElementById(elemId, val) {
  const elem = document.getElementById(elemId);
  elem.innerText = val;
}

function refreshCallLogDisplay() {
  const historyContainer = document.querySelector(".callHistoryContainer");
  historyContainer.innerHTML = ""; // Reset current entries

  callHistory.forEach((entry) => {
    const entryDiv = document.createElement("div");
    entryDiv.className =
      "flex justify-between items-center p-4 m-2 shadow-sm rounded-3xl bg-[#ebf5ef]";
    entryDiv.innerHTML = `
          <div>
            <h3 class="text-[#111111] inter-font font-semibold text-lg">${entry.mainHeader}</h3>
            <p class="text-[#5C5C5C] hind-madurai-font font-normal text-lg">${entry.number}</p>
          </div>
          <div>
            <p class="font-normal text-lg hind-madurai-font text-[#111111]">${entry.time}</p>
          </div>
        `;
    historyContainer.appendChild(entryDiv);
  });
}
// Shared utility functions end

// Application-wide data
const callHistory = [];

// Managing heart icon clicks
const heartIcons = document.querySelectorAll(".cardHeart");
heartIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    const heartTotal = fetchElementIntValueById("globalHeartCount");
    assignValueToElementById("globalHeartCount", heartTotal + 1);
  });
});

// Managing copy icon clicks
const copyIcons = document.querySelectorAll(".copyButton");
copyIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    const copyTotal = fetchElementIntValueById("globalCopyCount");
    assignValueToElementById("globalCopyCount", copyTotal + 1);

    const ancestor = icon.parentElement.parentElement; // Ascending two levels
    const contactNumber = ancestor.querySelector(".cardPhoneNumber").innerText;
    navigator.clipboard.writeText(contactNumber).then(() => {
      alert("Phone number copied to clipboard: " + contactNumber);
    });
  });
});

// Managing call icon clicks
const callIcons = document.querySelectorAll(".callButton");
callIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    const coinBalance = fetchElementIntValueById("globalCoinCount");
    if (coinBalance < 20) {
      alert(
        "You do not have sufficient coins to make calls, please refresh the page."
      );
      return;
    }

    const ancestor = icon.parentElement.parentElement; // Ascending two levels
    const logEntry = {
      mainHeader: ancestor.querySelector(".cardMainHeader").innerText,
      number: ancestor.querySelector(".cardPhoneNumber").innerText,
      time: new Date().toLocaleTimeString(),
    };
    callHistory.push(logEntry);
    alert(`Calling ${logEntry.mainHeader} at ${logEntry.number}`);
    assignValueToElementById("globalCoinCount", coinBalance - 20);

    // Refresh call log display
    refreshCallLogDisplay();
  });
});

// Resetting Call Logs
const resetHistoryBtn = document.getElementById("callHistoryClearButton");
resetHistoryBtn.addEventListener("click", () => {
  callHistory.length = 0; // Empty the log array
  refreshCallLogDisplay(); // Refresh the display
});
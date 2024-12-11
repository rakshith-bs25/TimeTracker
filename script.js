let totalBreaks = 0;  // Total breaks in minutes
let breakList = [];    // List of individual breaks

// Function to add a break
function addBreak() {
    const breakStart = document.getElementById('breakStart').value;
    const breakEnd = document.getElementById('breakEnd').value;

    // Ensure both break start and end are provided
    if (!breakStart || !breakEnd) {
        alert("Please enter both break start and end times.");
        return;
    }

    // Convert break times into Date objects (in UTC to avoid time zone issues)
    const breakStartTime = new Date("1970-01-01T" + breakStart + "Z");
    const breakEndTime = new Date("1970-01-01T" + breakEnd + "Z");

    // Calculate the break duration in minutes
    let breakDuration = (breakEndTime - breakStartTime) / (1000 * 60);
    
    // If the break duration is negative (i.e. crosses midnight), adjust it
    if (breakDuration < 0) breakDuration += 24 * 60; // Add 24 hours worth of minutes

    // Store the break duration and add to total breaks
    breakList.push(breakDuration);
    totalBreaks += breakDuration;

    // Update the total break time value in the input field
    document.getElementById('totalBreaks').value = totalBreaks;

    // Reset the break start and end fields
    document.getElementById('breakStart').value = '';
    document.getElementById('breakEnd').value = '';
}

// Function to calculate the logout time based on login time, total worked hours, and breaks
function calculateTime() {
    const loginTime = document.getElementById('loginTime').value;  // Get login time

    // Check if login time is provided
    if (!loginTime) {
        alert("Please enter your login time.");
        return;
    }

    // Convert login time to a Date object (in UTC to ensure correct calculation)
    const login = new Date("1970-01-01T" + loginTime + "Z");

    // Get the current time (the time now)
    const currentTime = new Date();
    const currentTimeString = currentTime.toTimeString().split(' ')[0]; // Extract time part (HH:MM:SS)
    const current = new Date("1970-01-01T" + currentTimeString + "Z");

    // Calculate the total worked time so far (in minutes)
    let totalWorkedTime = (current - login) / (1000 * 60); // Time in minutes
    totalWorkedTime -= totalBreaks;  // Subtract total breaks from worked time

    // Convert worked time to hours for display
    let workedTimeInHours = totalWorkedTime / 60;

    // Required work time to meet 8.5 hours
    const requiredTime = 8.5 * 60;  // 8.5 hours in minutes
    const pendingTime = requiredTime - totalWorkedTime;

    // Display the total worked time
    document.getElementById('workedTime').textContent = workedTimeInHours.toFixed(2);

    // Display the pending time (time left to work)
    document.getElementById('pendingTime').textContent = (pendingTime / 60).toFixed(2);

    // If there is pending time, calculate the logout time
    if (pendingTime > 0) {

        var totalBreaks1 = parseFloat(document.getElementById('totalBreaks').value) || 0;

        var stillPendingTime = pendingTime / 60;  // pendingTime is in minutes, converting to hours
        var stillPendingHours = Math.floor(stillPendingTime);  // Get the hours part
        var stillPendingMinutes = Math.round((stillPendingTime - stillPendingHours) * 60);  // Get the minutes part
    



        // Get current time (current time is the time now)
        const currentTime = new Date();
        const currentHours = currentTime.getHours();
        const currentMinutes = currentTime.getMinutes();
    
        // Calculate the logout time by adding the pending time to the current time
        var logoutHours = currentHours + stillPendingHours;  // Add pending hours to current hours
        var logoutMinutes = currentMinutes + stillPendingMinutes;  // Add pending minutes to current minutes
    
        // If minutes go over 60, adjust the hours
        if (logoutMinutes >= 60) {
            logoutMinutes -= 60;  // Subtract 60 from minutes
            logoutHours += 1;  // Add 1 hour
        }
    
        // Format the logout time in 24-hour format (HH:mm)
        var formattedLogoutTime = logoutHours.toString().padStart(2, '0') + ':' + logoutMinutes.toString().padStart(2, '0');
    
        // Display the logout time
        document.getElementById('logoutTime').textContent = formattedLogoutTime;
    } else {
        // If no pending time, display that enough time has been worked
        document.getElementById('logoutTime').textContent = "You have already worked enough!";
        confetti();
    }
}

// Function to format time into 24-hour HH:mm format
function formatTime(hours, minutes) {
    hours = hours < 10 ? '0' + hours : hours;  // Add leading zero if hours < 10
    minutes = minutes < 10 ? '0' + minutes : minutes;  // Add leading zero if minutes < 10
    return hours + ':' + minutes;  // Return formatted time
}

// Function to toggle break section visibility based on login time
function toggleBreakSection() {
    const loginTime = document.getElementById('loginTime').value;
    if (loginTime) {
        document.getElementById('breakSection').style.display = 'block';  // Show break section
    } else {
        document.getElementById('breakSection').style.display = 'none';  // Hide break section
    }
}

// Event listener to toggle break section when login time changes
document.getElementById('loginTime').addEventListener('change', toggleBreakSection);
function clearForm() {
    // Reset all form fields to their default values
    document.getElementById('loginTime').value = '';  // Clear login time
    document.getElementById('breakStart').value = '';  // Clear break start time
    document.getElementById('breakEnd').value = '';  // Clear break end time
    document.getElementById('totalBreaks').value = 0;  // Reset total breaks to 0

    // Clear the worked time, pending time, and logout time outputs
    document.getElementById('workedTime').textContent = '0';  // Reset worked time
    document.getElementById('pendingTime').textContent = '8.5';  // Reset pending time to 8.5 hours
    document.getElementById('logoutTime').textContent = '-';  // Reset logout time

    // Optionally hide the break section if needed
    document.getElementById('breakSection').style.display = 'none';
}

const celebrateBtn = document.getElementById('celebrateBtn');

celebrateBtn.addEventListener('click', () => {
    // trigger confetti
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });

    // button animation
    celebrateBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        celebrateBtn.style.transform = 'scale(1)';
    }, 100);
});


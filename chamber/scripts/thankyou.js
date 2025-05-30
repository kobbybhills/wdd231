// scripts/thankyou.js

document.addEventListener('DOMContentLoaded', function() {
    const summaryDetails = document.getElementById('summary-details');

    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);

    // Define which required fields to display and their user-friendly names
    const fieldsToDisplay = {
        'fname': 'First Name',
        'lname': 'Last Name',
        'email': 'Email Address',
        'phone': 'Mobile Phone Number',
        'orgname': 'Business/Organization Name',
        'timestamp': 'Submission Date/Time' // This comes from the hidden field
    };

    let htmlContent = '<ul>';
    for (const [paramName, displayName] of Object.entries(fieldsToDisplay)) {
        const value = urlParams.get(paramName);
        if (value) {
            // For the timestamp, you might want to format it more readably
            let displayValue = value;
            if (paramName === 'timestamp') {
                try {
                    const date = new Date(value);
                    // Example: "May 29, 2025, 7:24:58 AM"
                    displayValue = date.toLocaleString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        second: 'numeric',
                        hour12: true
                    });
                } catch (e) {
                    console.error("Error parsing timestamp:", e);
                    // Fallback to raw value if parsing fails
                }
            }
            htmlContent += `<li><strong>${displayName}:</strong> ${displayValue}</li>`;
        }
    }
    htmlContent += '</ul>';

    if (summaryDetails) {
        summaryDetails.innerHTML = htmlContent;
    } else {
        console.error("Error: Element with ID 'summary-details' not found on the page.");
    }
});
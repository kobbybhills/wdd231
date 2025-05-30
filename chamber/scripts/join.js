
document.addEventListener('DOMContentLoaded', function() {
    // 1. Populate the hidden timestamp field
    const timestampField = document.getElementById('timestamp');
    if (timestampField) {
        const now = new Date();
        // Using toISOString() provides a consistent, easily parseable format (e.g., "2025-05-29T07:24:58.000Z")
        timestampField.value = now.toISOString();
    }

    // 2. Handle opening and closing of modal dialogs
    const modalTriggers = document.querySelectorAll('.modal-trigger');
    const closeButtons = document.querySelectorAll('.close-modal');

    // Add event listeners to buttons that open modals
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const modalId = trigger.dataset.modal; // Get the ID from the data-modal attribute
            const modal = document.getElementById(modalId);
            if (modal instanceof HTMLDialogElement) { // Ensure it's a dialog element
                modal.showModal(); // Display the dialog as a modal
            }
        });
    });

    // Add event listeners to close buttons inside modals
    closeButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            // Find the closest parent <dialog> element
            const dialog = event.target.closest('dialog');
            if (dialog instanceof HTMLDialogElement) {
                dialog.close(); // Close the dialog
            }
        });
    });

    // Optional: Allow closing dialog by clicking outside (backdrop)
    // This requires adding an event listener to the dialog itself
    const dialogs = document.querySelectorAll('dialog');
    dialogs.forEach(dialog => {
        dialog.addEventListener('click', (event) => {
            // Check if the click occurred on the backdrop (outside the content)
            if (event.target === dialog) {
                dialog.close();
            }
        });
    });
});
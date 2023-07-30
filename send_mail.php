<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get data from form
    $name = $_POST['name'];
    $email = $_POST['email'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];
    
    // Email destination
    $to = "sharmaalok02gwl@gmail.com";
    
    // Email headers
    $headers = "From: noreply@soulfulscribbles.com" . "\r\n" . "CC: thealoksharma30@gmail.com";

    // Compose the email message
    $txt = "Name: " . $name . "\r\nEmail: " . $email . "\r\nSubject: " . $subject . "\r\nMessage: " . $message;

    // Send the email
    if (mail($to, $subject, $txt, $headers)) {
        // If the email is sent successfully, you can show the "thank you" message or an empty page
        echo "<!DOCTYPE html>
              <html>
                  <head>
                      <title>Form Submitted</title>
                  </head>
                  <body>
                      <p class='thanks'>Thank you. I will reply soon.</p>
                  </body>
              </html>";
    } else {
        // If there is an error sending the email, you can show an error message or handle it as you wish
        echo "Error sending the message. Please try again later.";
    }
}
?>

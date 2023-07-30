<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php'; // Include the PHPMailer library

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $subject = $_POST["subject"];
    $message = $_POST["message"];

    // Validate the form data (e.g., check for empty fields, valid email address)
    $errors = array();

    if (empty($name)) {
        $errors[] = "Name is required.";
    }

    if (empty($email)) {
        $errors[] = "Email is required.";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Invalid email format.";
    }

    if (empty($subject)) {
        $errors[] = "Subject is required.";
    }

    if (empty($message)) {
        $errors[] = "Message is required.";
    }

    if (empty($errors)) {
        // Send the email
        $mail = new PHPMailer(true); // Create a new PHPMailer instance

        try {
            // Server settings
            $mail->isSMTP();
            $mail->Host = 'smtp.example.com'; // Specify your SMTP server
            $mail->SMTPAuth = true;
            $mail->Username = 'your_username@example.com'; // SMTP username
            $mail->Password = 'your_password'; // SMTP password
            $mail->SMTPSecure = 'tls';
            $mail->Port = 587;

            // Recipients
            $mail->setFrom($email, $name);
            $mail->addAddress('thealoksharma30@gmail.com'); // Add the recipient email address

            // Content
            $mail->isHTML(false);
            $mail->Subject = $subject;
            $mail->Body = "Name: $name\nEmail: $email\nSubject: $subject\nMessage: $message";

            $mail->send(); // Send the email
            echo "success";
        } catch (Exception $e) {
            echo "error: " . $mail->ErrorInfo;
        }
    } else {
        // Return the validation errors
        echo implode("\n", $errors);
    }
}
?>

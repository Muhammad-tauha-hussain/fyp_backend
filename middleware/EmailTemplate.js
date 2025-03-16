exports.resetPasswordEmailTemplate = (resetLink) => {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Reset Password</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    max-width: 600px;
                    margin: 20px auto;
                    background-color: #ffffff;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                .header {
                    text-align: center;
                    margin-bottom: 20px;
                }
                .header h1 {
                    margin: 0;
                    font-size: 24px;
                    color: #333333;
                }
                .content {
                    margin-bottom: 20px;
                }
                .content p {
                    margin: 0 0 10px;
                    font-size: 16px;
                    color: #333333;
                }
                .button {
                    display: inline-block;
                    padding: 10px 20px;
                    background-color: #d62828;
                    color: #FFFFFF;
                    text-decoration: none;
                    border-radius: 4px;
                    font-size: 16px;
                }
                .footer {
                    text-align: center;
                    font-size: 14px;
                    color: #777777;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Reset Your Password</h1>
                </div>
                <div class="content">
                    <p>Hello,</p>
                    <p>We received a request to reset your password. Click the button below to reset your password:</p>
                    <a href="${resetLink}" class="button">Reset Password</a>
                    <p>If you did not request a password reset, please ignore this email.</p>
                </div>
                <div class="footer">
                    <p>&copy; 2024 Homyz. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
    `;
};

<?php
	$title = "Log in";
	$active = "signup";

?>

<!DOCTYPE html>
<html lang='en'>
<head>
	<?php require 'components/metadata.php'; ?>
</head>
<body id="login-signup-main">
	<div id="logo"> <img src="assets/Logo on White.svg" alt="logo-img"></div>
	<div class="bg-window" id="login-bg">
		<div id="outside-prompt">
			<p>Already have an account?</p>
			<a href="signup.php" class="prompt-button" id="signup-prompt" type="button">SIGN UP</a>
		</div>
	</div>
	<div class="input-window" id="login-input">
		<div id="input-container">
			<h1>Create Your Account</h1>
			<a href="#"><img id="google" src="assets/google-sign-in@2x.png" alt="Sign-in with Google"></a>

			<p>Or register with your email account:</p>
			<div class="entry-row">
				<i class="fas fa-signature"></i>
				<input type="text" name="name" value="" placeholder="Name">
			</div>
			<div class="entry-row">
				<i class="fas fa-at"></i>
				<input type="text" name="email" value="" placeholder="Email">
			</div>
			<div class="entry-row">
				<i class="fas fa-key"></i>
				<input type="text" name="password" value="" placeholder="Password">
			</div>
			<a href="index.php" class="input-button" id="signin-button">SIGN IN</a>
			</div>
		</div>

	</div>
</body>
</html>

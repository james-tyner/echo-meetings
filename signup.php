<?php
	$title = "Sign up";
	$active = "signup";

?>

<!DOCTYPE html>
<html lang='en'>
<head>
	<?php require 'components/metadata.php'; ?>
</head>
<body id="login-signup-main">
	<div class="bg-window">
		<div id="logo"> <img src="assets/Logo on Dark.svg" alt="logo-img"></div>
		<div id="outside-prompt">
			<p>Already have an account?</p>
			<a class="prompt-button" id="signin-prompt" type="button">SIGN IN</a>
			</div>
		</div>
	</div>
	<div class="input-window">
		<div id="box">
			<h1>Create Your Account</h1>
			<a href="#"><div id="google"><img src="assets/sign-google.png" alt="Sign-in with Google"></div></a>
			<p>Or register with your email account:</p>
			<div class="entry-row">
				<img src="assets/profile.png" alt="profile icon">
				<input type="text" name="name" value="" placeholder="Name">
			</div>
			<br>
			<div class="entry-row">
				<img src="assets/contact.png" alt="email icon">
				<input type="text" name="email" value="" placeholder="Email">
			</div>
			<br>
			<div class="entry-row">
				<img src="assets/lock.png" alt="lock icon">
				<input type="text" name="password" value="" placeholder="Password">
			</div>
			<br>
			<div id="button">
				<a href="#"><button type="button">SIGN UP</button></a>
			</div>
		</div>
	</div>
</body>
</html>

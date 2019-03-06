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
	<div class="input-window">
		<div id="logo"> <img src="assets/Logo on White.svg" alt="logo-img"></div>
		<br>
		<div id="box">
			<h1>Welcome Back!</h1>
			<h2>Sign in to echo</h2>
			<a href="#"><div id="google"><img src="assets/sign-google.png" alt="Sign-in with Google"></div></a>
			<p>Or use your email account:</p>
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
				<a href="#"><button type="button">SIGN IN</button></a>
			</div>
		</div>
	</div>
	<div class="small-window">
		<br><br><br>
		<div id="box2">
			<p>Create an account to start organizing your meetings.</p>
			<div id="button">
				<a href="SignUp-1.5.html"><button type="button">SIGN UP</button></a>
			</div>
		</div>
	</div>
</body>
</html>

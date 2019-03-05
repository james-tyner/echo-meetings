<<?php
$title = "Home"; // title of the page is the heading1 and also appears in meta title
$username = "James"; // this will appear in the bottom of the sidebar. Eventually should be managed by session variables

 ?>

 <!DOCTYPE html>
 <html lang='en'>
 <head>
 	<?php require 'components/metadata.php'; ?>
 </head>
 <style>

 h2{
   position: absolute;
width: 200%;
height: 50%;
left: 25%;
top: 90%;

font-family: Rubik;
font-style: normal;
font-weight: 500;
line-height: normal;
font-size: 24px;

color: #222222;
 }



 input{
   position: absolute;
width: 90%;
height: 30%;
left: 25%;
top: 140%;
border-radius: 8px;
text-indent: 8px;
font-size: 15px;
box-shadow:  10px  rgba(0,0,0,0.1);


 }

 input::placeholder{
   font-style: italic;
 }

 #at{
   position: absolute;
width: 100%;
height: 35%;
left: 120%;
top: 227%;

color: #777777;


 }

 #date h2{
   position:absolute;
   left: 25%;
   top: 170%;

 }

 #date input{
   left: 25%;
   top: 220%;
 }

 #time h2{
   position:absolute;
   left: 130%;
   top: 170%;

 }

 #time input{
   left: 130%;
   top: 220%;
 }

 #location h2{
   position:absolute;
  left: 25%;
   top: 260%;

 }

 #location input{
   left: 25%;
   top: 310%;
   width: 150%;
 }

button{
  position: absolute;
width: 60%;
height: 30%;
left: 25%;
top: 400%;
background: #00D9BD;
border-radius: 50px;
color: white;
font-size: 14px;
font-family: Rubik;
}

#side-line{
  position: absolute;
width: 230%;
height: 0px;
left: 170%;
top: 260%;

/* Gray/3 */
border: 0.5px solid #777777;
transform: rotate(90deg);
}

#time input::before {

    color: #777777;

  }

  #add-team h3{
    position: absolute;
width: 50%;
height: 50%;
left: 305%;
top: 80%;
font-family: Rubik;
font-style: normal;
font-weight: 500;
line-height: normal;
font-size: 18px;

color: #000000;
  }

  #add-team input{
    left: 310%;
    top: 130%;
    width: 60%;
    height: 20%;
    font-size: 11px;
    border: none;
    border-bottom: 1px solid #000000;
    box-shadow: none;
    border-radius: 0px;
    background: transparent;
    opacity: 0%;
    text-indent: 18px;

  }

i{
  margin-left: 290%;
position: absolute;
top: 135%;
}


 </style>
 <body>
 	<!-- navbar -->
 	<?php require 'components/nav.php'; ?>

 	<!-- middle area -->
 	<main>
 		<header>
 			<h1 class="page-title">Create Meeting</h1>
 		</header>

 		<section>
      <div id="name">
      <h2>Name</h2>
      <input type="text" name="name" placeholder="set meeting name" ></input>
    </div>
    <div id="date">
      <h2>Date</h2>
      <input type="date" name="name"  ></input>
    </div>
<div id="at">at</div>

    <div id="time">
      <h2>Time</h2>
      <input type="time" name="name"  ></input>
    </div>

    <div id="location">
      <h2>Location</h2>
      <input type="text" name="name" placeholder="set location" ></input>
    </div>

    <div id="button">
      <button type="button">Create New Meeting</button>
    </div>

<hr id="side-line">

 		</section>

    <section>

      <div id="add-team">

        <h3>Add Team</h2>

        <input type="text" name="name" placeholder="search teams" ><i class="fa fa-search" aria-hidden="true" ></i></input>

      </div>

    </section>
 	</main>

 </body>
 </html>

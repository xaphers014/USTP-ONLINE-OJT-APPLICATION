<?php
    if (isset($_SESSION['username'])){
		$query_app = $this->db->select('*')->from('tbl_applicant_bio')->where('user_name',$_SESSION['username'])->get();
		$query_comp = $this->db->select('*')->from('tbl_company_info')->where('user_name',$_SESSION['username'])->get();
		$query_graduate_form = $this->db->select('*')->from('tbl_graduate_info')->where('user_name',$_SESSION['username'])->get();
		if ($_SESSION['usertype'] == 0){ 				//Admin Access Level
            redirect('Admin/dashboard');
		}
		else if ($_SESSION['usertype'] == 1){ 		//Company Access Level
          	if ($_SESSION['userstatus'] == 2) { 			//Status is active
				if ($query_comp->num_rows() > 0) {
					redirect('Company/dashboard');
				}
				else {
				redirect('Company/require_form');
				}
			}
			else if ($_SESSION['userstatus'] == 1){ 		//Status is pending and not yet activated.
				if ($query_comp->num_rows() > 0) {
					redirect('Main/pending');
				}
				else {
					redirect('Company/require_form');
				}
			}
			else { 											//Status is inactive
				redirect('Main/inactive');
			}
		}
		else {  									//Applicant Access Level
			if ($_SESSION['userstatus'] == 2) { 			//Status is active
				if ($query_app->num_rows() > 0 && $query_graduate_form->num_rows() > 0) {
					redirect('Applicant/dashboard');
				}
				else {
					redirect('Applicant/require_form');
				}
			}
			else if ($_SESSION['userstatus'] == 1){ 		//Status is pending and not yet activated.
				if($query_app->num_rows() == 0){
					redirect('Applicant/require_form');
				}
				else if($query_graduate_form->num_rows() == 0){
					redirect('Applicant/graduate_form');
				}
				else {
					redirect('Main/pending');
				}
			}
			else { 											//Status is inactive
				redirect('Main/inactive');
			}
        }
    }
?>
	<!DOCTYPE html>
	<html>

	<head>
		<title>USTP | Graduate Tracer</title>
	</head>

	<link rel="stylesheet" type="text/css" href="<?= base_url('assets/css/bootstrap.css')?>">
	<link rel="stylesheet" type="text/css" href="<?= base_url('assets/css/style.css')?>">
<style>
	:root {
  --container-bg-color: #333;
  --left-bg-color: rgba(251,180,20, 0.7);
  --left-button-hover-color: rgba(161, 11, 11, 0.3);
  --right-bg-color: rgba(26, 23, 81, 0.8);
  --right-button-hover-color: rgba(92, 92, 92, 0.3);
  --hover-width: 75%;
  --other-width: 25%;
  --speed: 1000ms;
}

html, body {
  padding:0;
  margin:0;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
}

h1 { font-size: 4rem; color: #fff; text-align: center; white-space: nowrap; margin-bottom: 25px; }

.button {
  width: inherit;
  margin: 0 auto;
  display: inline-block;
  margin: 0 auto;
  top: 40%;
  padding: 1rem 4rem;
  text-align: center;
  color: #fff;
  border: #fff solid 0.2rem;
  font-size: 3rem;
  font-weight: bold;
  text-transform: uppercase;
}
.button:hover {
  text-decoration: none;
  color: #fff;
  cursor: pointer;
  }

.split.left .button:hover {
  background-color: var(--left-button-hover-color);
  border-color: var(--left-button-hover-color);
}

.split.right .button:hover {
  background-color: var(--right-button-hover-color);
  border-color: var(--right-button-hover-color);
}

.custom-container {
  position: relative;
  width: 100%;
  height: 100%;
  background: var(--container-bg-color);
}

.split       { position: absolute; width: 50%; height: 100%; overflow: hidden; }
.split-inner { position: absolute; top: 20%; left: 50%; transform: translateX(-50%); text-align: center; }

.split.left        { left:0; background: url('assets/img/student.jpg') center center no-repeat; background-size: cover;}
.split.left:before { position:absolute;  content: ""; width: 100%; height: 100%; background: var(--left-bg-color); }

.split.right { right:0; background: url('assets/img/company.jpg') center center no-repeat; background-size: cover;}

.split.right:before { position:absolute; content: ""; width: 100%; height: 100%; background: var(--right-bg-color);}

.split.left,
.split.right,
.split.right:before,
.split.left:before { transition: var(--speed) all ease-in-out;}

.hover-left .left         { width: var(--hover-width); }
.hover-left .right        { width: var(--other-width); }
.hover-left .right:before { z-index: 2; }

.hover-right .right       { width: var(--hover-width); }
.hover-right .left        {  width: var(--other-width); }
.hover-right .left:before { z-index: 2; }

.header-title { 
	position: absolute;
	color: #fff;
  top: 10%;
  z-index: 9999;
  width: 100%;
  text-align: center;
  font-size: 36px;transition: all 0.5s;
 }
.header-title span { position: relative; display: inline-block; transition: 0.5s; }
.header-title span:after, .header-title span:before {
    position: absolute;
    font-size: 70px;
    top: -30px;
    transition: 0.5s; 
    opacity: 0; 
}
.header-title span:after { content: '\00bb'; right: -30px; }
.header-title span:before { content: "\00ab"; left: -30px; }


.hover-left .header-title span 		  { padding-right: 35px; right: 12%; }
.hover-left .header-title span:after { right: 0; opacity: 1;}
.hover-right .header-title span 			  { padding-left: 35px; left: 12%; }
.hover-right .header-title span:before { left: 0; opacity: 1;}

.hover-left #toaster 		  { left: 40%; }
.hover-right #toaster 		{ left: 64%; }

@media(max-width: 800px) {
  h1 {
    font-size: 2rem;
  }
}

@media(max-height: 700px) {
  .button {
    top: 70%;
  }
}



form { margin-bottom: 25px; }
form input, form select, form button{    
  margin-bottom: 10px;
  text-indent: 5px;
  background-color: transparent;
  -webkit-text-fill-color: #fff;
  border: none;
  border-bottom: 2px solid whitesmoke;
  padding: 5px;
  width: 100%;
  font-size: 1.25em;

  }

	.header-title.instruction {
	  top: inherit;
	  bottom: 5%;
	}

	.instruction h4 {
		margin:0;
		padding: 10px;
		border: 2px solid white;
		border-radius: 5px;
		color: white;
	}

	.instruction button {
		background-color: transparent;
		border: none;
	}

	#overlay-instruction-container {
		position: fixed;
		display: none;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0,0,0,0.85);
		z-index: 99998;
	}

	#overlay-instruction {
		z-index: 99999;
		color: white;
		font-size: 1.2em;
	}

	.close-overlay {
		background-color: transparent;
		border: none;
		color: white;
		padding: 15px;
		font-size: 3em;
		width: 100%;
		float: right;
		text-align: right;
	}
	
	.close-overlay:hover {
		color: #f92c2c;
	}
</style>

	<body>
		<div id="overlay-instruction-container">
			<div class="container">
				<button class="close-overlay" onclick="overlay_off()">x</button>
				<div id="overlay-instruction">
					<h3>Please follow the steps below. Carefully.</h3>
					<label>Students:</label>
					<ol>
						<li>Create your account in the registration panel.</li>
						<li>Use your ID Number as your username.</li>
						<li>Complete the rest of the fields.</li>
						<li>Go to the login panel and log in your account.</li>
						<li>Complete the Biodata Form.</li>
						<li>Complete the Graduate Form.</li>
						<li>After all the steps, your account is pending and wait for the approval.</li>
					</ol>
					<label>Company:</label>
					<ol>
						<li>Create your account in the registration panel.</li>
						<li>Use your company name as username.</li>
						<li>Complete the rest of the fields.</li>
						<li>Go to the login panel and log in your account.</li>
						<li>Complete the Company Form.</li>
						<li>After all the steps, your account is pending and wait for the approval.</li>
					</ol>

					<br>
					<p style="color:red;">Note: Not following the steps above may lead to invalidation.</p>
					<br>
					<blockquote>
						<p>We learned about honesty and integrity - that the truth matters... that you don't take shortcuts or play by your own set of rules... and success doesn't count unless you earn it fair and square.</p>
						<footer style="margin-left:0;">Former First Lady of the United States -<cite> Michelle Obama</cite></footer>
					</blockquote>
				</div>
			</div>
		</div>
		<div class="custom-container">
		<div id="toaster"><span></span></div>	
			<strong class="header-title"><span>USTP | Graduate Tracer</span></strong>
			<strong class="header-title instruction"><span><button onclick="overlay_on()"><h4>INSTRUCTIONS</h4></button></span></strong>
			<div class="split left">
				<div class="split-inner">
					<h1>Login</h1>
					<form id="loginform" method="post">
						<input type="text" name="username" placeholder="Username" required>
						<input type="password" name="password" placeholder="Password" required>
            <div class="form-group"></div>
						<button id="loginbtn" class="button">login</button>
					</form>
				</div>
			</div>
			<div class="split right">
				<div class="split-inner">
					<h1>Register</h1>
					<form id="regform" method="post">
						<input type="text" name="username" placeholder="Username" required pattern="[A-Za-z0-9_]{4,}" title="Must contain only alphabets and numbers, and at least 4 or more characters.">
						<input type="email" name="email" placeholder="Email" required>
						<input type="password" name="password" placeholder="Password" required pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters">
						<input type="password" name="repassword" placeholder="Confirm Password" required pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters">
						<br>
						<br>
						<div class="form-group">
							<label style="color:whitesmoke; float: left;">User Type:</label>
							<br>
							<select name="usertype">
								<option class="form-control" value="2">Student</option>
								<option class="form-control" value="1">Company </option>
							</select>
						</div>
						<button class="button">Submit</button>
					</form>
				</div>
			</div>
		</div>
		<script src="<?= base_url('assets/js/jquery.js')?>"></script>
		<script src="<?= base_url('assets/js/user.js');?>"></script>
		<script src="<?= base_url('assets/js/style.js');?>"></script>
		<script>
			const left = document.querySelector(".left");
			const right = document.querySelector(".right");
			const container = document.querySelector(".custom-container");

			left.addEventListener("mouseenter", () => {
				container.classList.add("hover-left");
			});

			left.addEventListener("mouseleave", () => {
				container.classList.remove("hover-left");
			});

			right.addEventListener("mouseenter", () => {
				container.classList.add("hover-right");
			});

			right.addEventListener("mouseleave", () => {
				container.classList.remove("hover-right");
			});

			function overlay_on() {
				document.getElementById("overlay-instruction-container").style.display = "block";
			}

			function overlay_off() {
				document.getElementById("overlay-instruction-container").style.display = "none";
			}

		</script>
	</body>

	</html>

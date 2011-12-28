<html>
	<link rel="stylesheet" type="text/css" href="../src/lightbox.css" />
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js"></script>
	<script src="../src/jquery.lightbox.js"></script>
<script>
	$(document).ready(function() {
		$('#lb').lightbox({autoLoad: true});
	});
</script>
<style>
	#lb { 
		width: 600px; height: 400px;
		-moz-border-radius: 15px;
		border-radius: 15px;
		
		-moz-box-shadow: 0px 0px 10px #000000;
		-webkit-box-shadow: 0px 0px 10px #000000;
		box-shadow: 0px 0px 10px #000000;
	}
	
</style>
<body>
	A light box will open in 5 seconds.
	<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
	<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
	<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
	<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
	<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
	<a href="#lb">Open LB</a>
	
	<div id="lb">
		<a href="#" class="close">Close it</a>
		<div class="content"></div>
	</div>
</body>
</html>
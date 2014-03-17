var clicks = 0;
var manual = 1;
var auto = 1;
var autocost = 2;
var perclickcost = 2;
var autofactor = 1;
var perclickfactor = 1; 



$( "#button" ).click(function() {
	clicks += manual;   
	updatescreen(); 
});

$( "#autobutton" ).click(function() {
	clicks += manual;
	updatescreen(); 
});

if (clicks >= autocost) {
	clicks -= autocost;
	autocost *= autofactor;
	autofactor += .8;
	auto *= 2;
	updatescreen();
}
 
$( "#perclickbutton" ).click(function() {
	if (clicks >= perclickcost) {
		clicks -= perclickcost;
		perclickcost *= perclickfactor;
		perclickfactor += .8;
		manual *= 2;
		updatescreen();
	}
	updatescreen();
});

function doSomething() {
	clicks += auto;
	updatescreen();
}

setInterval(doSomething, 1000);

function updatescreen(){
	clicksd = float2int(clicks);
	autod = float2int(auto);
	manuald = float2int(manual);
	autocostd = float2int(autocost);
	perclickcostd = float2int(perclickcost);

	$( "#totalclicks" ).html(clicksd + " points");
	$( "#persecond" ).html(autod + " per second (" + autocostd + ")");
	$( "#perclick" ).html(manuald + " per click (" + perclickcostd + ")");
}

function float2int (value) {
    return ~~value;
}

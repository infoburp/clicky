var clicks = 0;
var manual = 1;
var auto = 1;	
var autocost = 2;
var perclickcost = 2;
var autofactor = 1;
var perclickfactor = 1; 
var fuseleft = 30;
var bombactive = false;
var bombbonus = 16;
var bombcost = 8;
var bombupgradecost = 32;

$( "#button" ).click(function() {
	clicks += manual;   
	updatescreen(); 
});

$( "#bombupgradebutton" ).click(function() {
        if (clicks > bombupgradecost) {clicks -= bombupgradecost; bombupgradecost *= 2;}
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
	} else {
		updatescreen();
	}
});

$( "#armbombbutton" ).click(function() {
        if (clicks>bombcost) {bombactive = true; clicks -= bombcost;}   
        updatescreen();
});

function doSomething() {
	clicks += auto;
	if (bombactive = true) {fuseleft -= 1; if (fuseleft = 0) { bombgoesoff() } }
	updatescreen();
}

function bombgoesoff() {
clicks += bombbonus;
fuseleft = 30;
bombactive = false;
}

setInterval(doSomething, 1000);

function updatescreen(){
	/*
	clicksd = float2int(clicks);
	autod = float2int(auto);
	manuald = float2int(manual);
	autocostd = float2int(autocost);
	perclickcostd = float2int(perclickcost);
	*/

	$( "#totalclicks" ).html(clicks + " points");
	$( "#persecond" ).html(auto + " per second (" + autocost + ")");
	$( "#perclick" ).html(manual + " per click (" + perclickcost + ")");
	$( "#armbomb" ).html(bombcost + " per bomb");
	$( "#bombupgrade" ).html(bombbonus + " per explosion (" + bombupgradecost + ")");

}

function float2int (value) {
    return ~~value;
}

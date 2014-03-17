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

function manualClick(){
	clicks += manual;
	updatescreen();
}

function buyAuto(){
	if (clicks >= autocost) {
		clicks -= autocost;
		autocost *= autofactor;
		autofactor += .8;
		auto *= 2;
		updatescreen();
	} else {
		clicks += manual;
		updatescreen();
	}
}
function upgradeBomb(){
	if (clicks > bombupgradecost) {
		clicks -= bombupgradecost;
		bombupgradecost *= 2;
		updatescreen();
	} else {
		clicks += manual;
   		updatescreen();
	}

};

function buyPerClick(){
	if (clicks >= perclickcost) {
		clicks -= perclickcost;
		perclickcost *= perclickfactor;
		perclickfactor += .8;
		manual *= 2;
		updatescreen();
	} else {
		clicks += manual;
		updatescreen();
	}
}

function armBomb(){
	if (clicks>bombcost) {
		bombactive = true;
		clicks -= bombcost;
		updatescreen();
	} else {
		clicks += manual;
		updatescreen();
	}
}

/*
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
*/

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
	clicksd = float2int(clicks);
	autod = float2int(auto);
	manuald = float2int(manual);
	autocostd = float2int(autocost);
	perclickcostd = float2int(perclickcost);
	bombupgradecostd = float2int(bombupgradecost);
	bombcostd = float2int(bombcost);
	bombbonusd = float2int(bombbonus);

	$( "#totalclicks" ).html(clicksd + " points");
	$( "#persecond" ).html(autod + " per second (" + autocostd + ")");
	$( "#perclick" ).html(manuald + " per click (" + perclickcostd + ")");
	$( "#armbomb" ).html(bombcostd + " per bomb");
	$( "#bombupgrade" ).html(bombbonusd + " per explosion (" + bombupgradecostd + ")");
}

function float2int (value) {
    return ~~value;
}

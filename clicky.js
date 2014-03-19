var clicks = 0;
var manual = 1;
var auto = 1;	
var autocost = 2;
var perclickcost = 2;
var autofactor = 2;
var perclickfactor = 2; 
var fuseleft = 30;
var bombactive = false;
var bombbonus = 16;
var bombcost = 8;
var bombupgradecost = 32;
var rank = 1;
var rankupgradecost = 32;
var multiplier = 1;
var score = 0;

function manualClick(){
	clicks += manual;
	updatescreen();
	if (score >= 32) {
		document.getElementById('upgbuttonrank').style.visibility="visible";
		document.getElementById('upgbuttonrankbutton').style.visibility="visible";
	}
}

function upgButtonRank(){
    if (score >= rankupgradecost) {
        score -= rankupgradecost;
        rankupgradecost *= 5;
        rank += 1;
        multiplier += .1;
	updatescreen();
        if (rank >= 2) {
			document.getElementById('persecond').style.visibility="visible";
			document.getElementById('autobutton').style.visibility="visible";
        }
        if (rank >= 3) {
			document.getElementById('perclick').style.visibility="visible";
			document.getElementById('perclickbutton').style.visibility="visible";
        }
        if (rank >= 4) {
			document.getElementById('armbomb').style.visibility="visible";
			document.getElementById('armbombbutton').style.visibility="visible";
        }
        if (rank >= 5) {
			document.getElementById('bombupgrade').style.visibility="visible";
			document.getElementById('bombupgradebutton').style.visibility="visible";
        }
    }
}

function buyAuto(){
	if (score >= autocost) {
		score -= autocost;
		autocost *= autofactor;
		autofactor += .8;
		auto *= 2;
		updatescreen();
	} 
}

function upgradeBomb(){
	if (score >= bombupgradecost) {
		score -= bombupgradecost;
		bombupgradecost *= 2;
		bombbonus *= 2;
		updatescreen();
	}
}

function buyPerClick(){
	if (score >= perclickcost) {
		score -= perclickcost;
		perclickcost *= perclickfactor;
		perclickfactor += .8;
		manual *= 2;
		updatescreen();
	} 
}

function armBomb(){
	if (score >= bombcost) {
		if (!bombactive) {
			bombactive = true;
			score -= bombcost;
			updatescreen();
		} else {
			alert("Bomb currently active.")
		}
	}
}

function doSomething() {
	clicks += auto;
	if (bombactive === true) {
		fuseleft -= 1;
		if (fuseleft <= 0) {
			bombgoesoff();
			updatescreen();
		}
	}
	updatescreen();
}

function bombgoesoff() {
	clicks += bombbonus;
	fuseleft = 30;
	bombactive = false;
	$( "bombtick" ).html("No bomb currently.");
	updatescreen();
	$(game).shake();
	$(right).shake();
}

setInterval(doSomething, 1000);

function updatescreen(){
	score = clicks * multiplier;
	scored = float2int(score);
	autod = float2int(auto);
	manuald = float2int(manual);
	autocostd = float2int(autocost);
	perclickcostd = float2int(perclickcost);
	bombupgradecostd = float2int(bombupgradecost);
	bombcostd = float2int(bombcost);
	bombbonusd = float2int(bombbonus);
	rankupgradecostd = float2int(rankupgradecost);
	fuseleftd = float2int(fuseleft);

	$( "#ranK" ).html("Rank " + rank + ". Multiplier = "+ multiplier); 
	$( "#totalclicks" ).html(scored + " points");
	$( "#persecond" ).html(autod + " per second (" + autocostd + ")");
	$( "#perclick" ).html(manuald + " per click (" + perclickcostd + ")");
	$( "#armbomb" ).html(bombcostd + " per bomb");
	$( "#bombupgrade" ).html(bombbonusd + " per explosion (" + bombupgradecostd + ")");
	$( "#upgbuttonrank" ).html("Upgrade your rank (" + rankupgradecostd + ")");
	if (bombactive) {
		$( "#bombtick" ).html(fuseleftd + "!");
	}

	if (clicks >= 32) {
		document.getElementById('upgbuttonrank').style.visibility="visible";
		document.getElementById('upgbuttonrankbutton').style.visibility="visible";
	}
}
jQuery.fn.shake = function() {
    this.each(function(i) {
        $(this).css({ "position" : "relative" });
        for (var x = 1; x <= 3; x++) {
            $(this).animate({ left: -25 }, 10).animate({ left: 0 }, 50).animate({ left: 25 }, 10).animate({ left: 0 }, 50);
        }
    });
    return this;
}
function float2int (value) {
    return ~~value;
}

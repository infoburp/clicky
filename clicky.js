$(function() {
    $("#manualClick").click(function(e) {
        manualClick();
    });
    $("#upgRankButton").click(function(e) {
        upgButtonRank();
    });
    $("#buyAuto").click(function(e) {
        buyAuto();
    });
    $("#buyPerClick").click(function(e) {
        buyPerClick();
    });
    $("#armBombButton").click(function(e) {
        armBomb();
    });
    $("#upgBombButton").click(function(e) {
        upgradeBomb();
    });
    
    setInterval(doSomething, 1000);
});

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

function manualClick(){
	clicks += manual;
	updatescreen();
}

function upgButtonRank(){
    if (clicks >= rankupgradecost) {
        clicks -= rankupgradecost;
        rankupgradecost *= 5;
        rank += 1;
        updatescreen();
        if (rank >= 2) {
			$("#perSecond").removeClass("hidden");
			$("#buyAuto").removeClass("hidden");
        }
        if (rank >= 3) {
			$("#perClick").removeClass("hidden");
            $("#buyPerClick").removeClass("hidden");
        }
        if (rank >= 4) {
			$("#armBomb").removeClass("hidden");
            $("#armBombButton").removeClass("hidden");
        }
        if (rank >= 5) {
			$("#upgBomb").removeClass("hidden");
            $("#upgBombButton").removeClass("hidden");
        }
    }
}

function buyAuto(){
	if (clicks >= autocost) {
		clicks -= autocost;
		autocost *= autofactor;
		autofactor += .8;
		auto *= 2;
		updatescreen();
	} 
}

function upgradeBomb(){
	if (clicks >= bombupgradecost) {
		clicks -= bombupgradecost;
		bombupgradecost *= 2;
		bombbonus *= 2;
		updatescreen();
	}
}

function buyPerClick(){
	if (clicks >= perclickcost) {
		clicks -= perclickcost;
		perclickcost *= perclickfactor;
		perclickfactor += .8;
		manual *= 2;
		updatescreen();
	} 
}

function armBomb(){
	if (clicks >= bombcost) {
		if (!bombactive) {
			bombactive = true;
			clicks -= bombcost;
			updatescreen();
		} else {
			alert("Bomb currently active.")
		}
	}
}

function doSomething() {
	clicks += auto;
	if (bombactive) {
		fuseleft--;
		if (fuseleft <= 0) {
			bombgoesoff();
		}
	}
	updatescreen();
}

function bombgoesoff() {
	clicks += bombbonus;
	fuseleft = 30;
	bombactive = false;
	$("#bombtick").html("No bomb currently.");
	updatescreen();
}

function updatescreen(){
	clicksd = float2int(clicks);
	autod = float2int(auto);
	manuald = float2int(manual);
	autocostd = float2int(autocost);
	perclickcostd = float2int(perclickcost);
	bombupgradecostd = float2int(bombupgradecost);
	bombcostd = float2int(bombcost);
	bombbonusd = float2int(bombbonus);
	rankupgradecostd = float2int(rankupgradecost);
	fuseleftd = float2int(fuseleft);

	$("#ranK").html("Rank " + rank + "."); 
	$("#totalClicks").html(clicksd + " points");
	$("#perSecond").html(autod + " per second (" + autocostd + ")");
	$("#perClick").html(manuald + " per click (" + perclickcostd + ")");
	$("#armBomb").html(bombcostd + " per bomb");
	$("#upgBomb").html(bombbonusd + " per explosion (" + bombupgradecostd + ")");
	$("#upgRank").html("Upgrade your rank (" + rankupgradecostd + ")");
	if (bombactive) {
		$("#bombtick").html(fuseleftd + "!");
	}

	if (clicks >= 32) {
		$("#upgRank").removeClass("hidden");
        $("#upgRankButton").removeClass("hidden");
	}
}

function float2int (value) {
    return ~~value;
}

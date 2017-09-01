$(document).ready(function () {

    var lukeChar = {
        healthPoints: 100,
        attackPower: 10,
        counterAttackPower: 5,
    }
    var obiChar = {
        healthPoints: 120,
        attackPower: 8,
        counterAttackPower: 15,
    }
    var sidiousChar = {
        healthPoints: 150,
        attackPower: 6,
        counterAttackPower: 20,
    }
    var maulChar = {
        healthPoints: 180,
        attackPower: 5,
        counterAttackPower: 25,
    }

    var lukeImg = $("<div>").append($("<img>").attr("src", "assets/images/luke.jpg")).append("<br>").append($("<span>").text("HP: " + lukeChar.healthPoints)).attr("char", "luke");
    var obiImg = $("<div>").append($("<img>").attr("src", "assets/images/obi.jpg")).append("<br>").append($("<span>").text("HP: " + obiChar.healthPoints)).attr("char", "obi");
    var sidiousImg = $("<div>").append($("<img>").attr("src", "assets/images/sidious.jpg")).append("<br>").append($("<span>").text("HP: " + sidiousChar.healthPoints)).attr("char", "sidious");
    var maulImg = $("<div>").append($("<img>").attr("src", "assets/images/maul.jpg")).append("<br>").append($("<span>").text("HP: " + maulChar.healthPoints)).attr("char", "maul");

    $(".character").on("click", function () {
        var myChar = $(this).attr("char");
        console.log(myChar);

        if (myChar == "luke") {
            $("#character").empty().append(lukeImg);
            $("#enemies").append(obiImg.addClass("enemies")).append(sidiousImg.addClass("enemies")).append(maulImg.addClass("enemies"));
        } else if (myChar == "obi") {
            $("#character").empty().append(obiImg);
            $("#enemies").append(lukeImg.addClass("enemies")).append(sidiousImg.addClass("enemies")).append(maulImg.addClass("enemies"));
        } else if (myChar == "sidious") {
            $("#character").empty().append(sidiousImg);
            $("#enemies").append(lukeImg.addClass("enemies")).append(obiImg.addClass("enemies")).append(maulImg.addClass("enemies"));
        } else if (myChar == "maul") {
            $("#character").empty().append(maulImg);
            $("#enemies").append(lukeImg.addClass("enemies")).append(obiImg.addClass("enemies")).append(sidiousImg.addClass("enemies"));
        }

    });

    $("#enemies").on("click", ".enemies", function () {
        var defender = $(this).attr("char");
        console.log(defender);

        if (defender == "luke") {
            $("#defender").append(lukeImg);
            $("#enemies[char='luke']").detach();
        } else if (defender == "obi") {
            $("#defender").append(obiImg);
            $("#enemies[char='obi']").detach();
        } else if (defender == "sidious") {
            $("#defender").append(sidiousImg);
            $("#enemies[char='sidious']").detach();
        } else if (defender == "maul") {
            $("#defender").append(maulImg);
            $("#enemies[char='maul']").detach();
        }

    });

    var attack = 1;

    $("#attack").on("click", function () {
        var myChar = $("#character").children().attr("char");

        if (myChar == "luke") {
            var charStats = lukeChar;
        } else if (myChar == "obi") {
            var charStats = obiChar;
        } else if (myChar == "sidious") {
            var charStats = sidiousChar;
        } else if (myChar == "maul") {
            var charStats = maulChar;
        }

        var defChar = $("#defender").children().attr("char");

        if (defChar == "luke") {
            var defCharStats = lukeChar;
        } else if (defChar == "obi") {
            var defCharStats = obiChar;
        } else if (defChar == "sidious") {
            var defCharStats = sidiousChar;
        } else if (defChar == "maul") {
            var defCharStats = maulChar;
        }

        var attackDamage = charStats.attackPower * attack;
        defCharStats.healthPoints -= attackDamage;
        attack++;
        $("#defender").find("span").text("HP: " + defCharStats.healthPoints);
        charStats.healthPoints -= defCharStats.counterAttackPower;
        $("#character").find("span").text("HP: " + charStats.healthPoints);

        $("#action").text("You've delt " + attackDamage + " damage and received " + defCharStats.counterAttackPower + " damage.");

        if (charStats.healthPoints <= 0) {
            alert("You've been defeated...");
            location.reload();
        } else if (defCharStats.healthPoints <= 0) {
            alert("Enemy defeated...");
            $("#defender").children().detach();
        }
    });
});
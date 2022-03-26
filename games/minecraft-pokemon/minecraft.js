$(document).ready(function(){
    var vid = document.getElementById("music");
    vid.autoplay = true;
    vid.loop = true;


    $("#myModal").modal('show');
    $("#tutorial").click(function() {
        $("#tutorialModal").modal('show');
        $("#myModal").modal('hide');
    });
    $("#returnToMain").click(function() {
        $("#tutorialModal").modal('hide');
        $("#myModal").modal('show');
    });
    $("#play").click(function() {
        $("#myModal").modal('hide');
    });
    setTimeout(function() {
        $("#layout").css("visibility","visible");
    },1000);


    function makeBg(){

        for (var i=0; i<18; i++){ // i is row

            var row = $("<div/>");
            $('#board').append(row);

            for (var j=0; j<30; j++){ // j is column
                var col = $("<div/>");

                if(i==2 && j<=8 && j>=6){
                    col.addClass("clouds");
                }
                if(i==6 && j==8){
                    col.addClass("clouds");
                }

                if(i==3 && j>=5 &&j<=9){
                    col.addClass("clouds");
                }
                if(i==5 && j>=7 &&j<=9){
                    col.addClass("clouds");
                }

                if(i==4 && j>3 && j<12 ){
                    col.addClass("clouds");
                }
                if (i==14 && j>13 && j<17){
                    col.addClass("rock divBg");
                }
                if(i==2 && j==5){
                    col.addClass("pidgey divBg");
                }
                if (i==14 && j>3 && j<7){
                    col.addClass("leaf divBg");
                }
                if (i==13 && j==5){
                    col.addClass("leaf divBg");
                }
                if (j>=22 && j<=26 && i<=10 && i>6){
                    col.addClass("leaf divBg");
                }
                if (i < 15 && i> 10  && j==24){
                    col.addClass("tree divBg");
                }
                if (i ==14 && j==23){
                    col.addClass("professor divBg");
                }
                if (i==14 && j==2 ){
                    col.addClass("bulbasaur divBg");
                }
                if (i==14 && j==13){
                    col.addClass("charmander divBg");
                }
                if (i==14 && j==17){
                    col.addClass("squirtle divBg");
                }
                if (i==14 && j==28){
                    col.addClass("mewtwo divBg");
                }

                if (i==15){
                    col.addClass("grass divBg");
                }
                if (i==16 && j==5){
                    col.addClass("diglett divBg");
                }
                else if (i>=16){
                    col.addClass("dirt divBg");
                }
                else{
                    col.addClass("divBg");
                }

                col.click(divSelect);
                row.append(col);


            }
        }

    }


    var toolArray = ["picaxe","shovel","axe","pokeball"];

    var toolImages =["images/pickaxe.png","images/shovel.png","images/axe.png","images/ball.png"];

    function toolMaker(){

        for (var t=0;t<toolArray.length;t++){
            var div = $("<div/>");
            div.addClass("tool " + toolArray[t]);
            var pic = $("<img/>");
            pic.attr("src",toolImages[t]);
            //pic.attr("height","55px");
            div.append(pic);
            var words = $("<p/>");
            words.text(toolArray[t]);
            $('#tools').append(div);
            div.append(words);
            div.click(toolSelect);

        }

    }

    var selectedTool;
    var carrying;

    function toolSelect(){
        if(backgroundTimer==0){
            selectedTool = $(this);
            $('.tool').css("background-color","black");
            selectedTool.css("background-color","blue");
            carrying = selectedTool.attr("class");
            currentResource="";
        }
    }

    /*the counts store the inventory of each resource*/

    var dirtCount=0;
    var grassCount =0;
    var leafCount =0;
    var treeCount=0;
    var rockCount =0;

    var pikaCount =1;
    var diglettCount =0;
    var pidgeyCount =0;
    var bulbasaurCount =0;
    var charmanderCount =0;
    var mewtwoCount =0;
    var squirtleCount =0;
    var pokeCount=0;


    var backgroundTimer=0;

    var noClick= false;

    function blinkRed(){

            if (noClick==false){
                noClick = true;
                var backgroundInterval = setInterval(function(){
                    selectedTool.toggleClass("backgroundRed");
                    backgroundTimer++;

                    if(backgroundTimer==4){
                        clearInterval(backgroundInterval);
                        backgroundTimer=0;
                        noClick = false;
                    }
                },300)
            }

        }

        var healthbarTimer=0;
        function blinkRedPokemon(){
            if (noClick==false){
                noClick = true;

                var healthbarInterval = setInterval(function(){
                $("#healthbar").toggleClass("backgroundRed green");
                healthbarTimer++;

                if(healthbarTimer==4){
                    clearInterval(healthbarInterval);
                    healthbarTimer=0;
                    noClick = false;
                }
            },100)

            }
        }


    function divSelect(){

        var selectedDiv = $(this).attr("class");

        if(selectedDiv!='divBg'){

            if (selectedDiv =='dirt divBg' || selectedDiv =='grass divBg'){

                if(carrying=='tool shovel'){
                    $(this).removeClass(selectedDiv);
                    $(this).addClass("divBg");

                    if(selectedDiv =='dirt divBg'){
                        dirtCount++;
                    }
                    else if(selectedDiv =='grass divBg'){
                        grassCount++;
                    }
                }

                else if(carrying=='tool axe' || carrying=='tool picaxe' || carrying=='tool pokeball'){
                    blinkRed();

                }

            }

            else if(selectedDiv =='leaf divBg' ||selectedDiv =='tree divBg'){

                if(carrying=='tool axe'){
                    $(this).removeClass(selectedDiv);
                    $(this).addClass("divBg");

                    if(selectedDiv =='leaf divBg'){
                        leafCount++;

                    }
                    else if(selectedDiv =='tree divBg'){
                        treeCount++;
                    }
                }
                else if(carrying=='tool shovel' || carrying=='tool picaxe' || carrying=='tool pokeball'){
                    blinkRed();
                }
            }
            else if(selectedDiv =='rock divBg'){

                if(carrying=='tool picaxe'){
                    $(this).removeClass(selectedDiv);
                    $(this).addClass("divBg");
                    rockCount++;
                }

                else if(carrying=='tool axe' || carrying=='tool shovel' || carrying=='tool pokeball'){
                    blinkRed();
                }
            }

            else if(selectedDiv =='pika divBg'){

                if(carrying=='tool pokeball'){
                    $(this).removeClass(selectedDiv);
                    $(this).addClass("divBg");
                    pikaCount++;
                }

                else if(carrying=='tool axe' || carrying=='tool shovel' || carrying=='tool picaxe'){
                    blinkRed();
                }

            }
            else if(selectedDiv =='professor divBg'){

                if (pokeCount===6){
                    var message = "Wow! Congratulations on catching all of the wild pokemon!";
                }
                else {
                    var message = "You have captured " +pokeCount + " pokemon so far. Catch all wild pokemon for a surprise";
                }
                $('#oakMessage').text(message);
                $(".professorMessage").modal('show');
            }

            else if(selectedDiv =='charmander divBg'){

                var currPokeCount = checkPokemon(currentResource);
                var pokeDamage = reduceHealth(currentResource);

                if ((currentResource=='pika'  || currentResource=='squirtle' || currentResource=="bulbasaur"  ||
                currentResource=='diglett' || currentResource=='pidgey'  || currentResource=='mewtwo') &&currPokeCount>0){

                    charHealth -= pokeDamage;

                    $(this).data("health",charHealth);
                    $('#healthbar').css("width",charHealth);
                    blinkRedPokemon();
                }

                if(carrying=='tool pokeball' && ($(this).data("health")<40 || capturedChar==true)){
                    $(this).removeClass(selectedDiv);
                    $(this).addClass("divBg");
                    charmanderCount++;

                    if (capturedChar==false){
                        $('#capturedCaption').text("Charmander has been added to your Pokedex");
                        $(".captureMessage").modal('show');
                        pokeCount++;
                    }
                    capturedChar=true;
                }
                else if(carrying=='tool axe' || carrying=='tool shovel' || carrying=='tool picaxe'){
                    blinkRed();
                }
                else if (carrying=='tool pokeball' && $(this).data("health")>=20 && capturedChar==false){
                    $(".failcaptureMessage").modal('show');
                }
            }
            else if(selectedDiv =='squirtle divBg'){

                var currPokeCount = checkPokemon(currentResource);
                var pokeDamage = reduceHealth(currentResource);

                if ((currentResource=='pika'   ||currentResource=='charmander'   ||currentResource=="bulbasaur" ||
                currentResource=='diglett' || currentResource=='pidgey'|| currentResource=='mewtwo' )&&currPokeCount>0){

                squirtHealth-= pokeDamage;

                    $(this).data("health",squirtHealth);
                    $('#healthbar').css("width",squirtHealth);
                    blinkRedPokemon();


                }

                if(carrying=='tool pokeball' && ( $(this).data("health")<40 || capturedSquirt==true)){
                    $(this).removeClass(selectedDiv);
                    $(this).addClass("divBg");
                    squirtleCount++;

                    if (capturedSquirt==false){
                        $('#capturedCaption').text("Squirtle has been added to your Pokedex");
                        $(".captureMessage").modal('show');
                        pokeCount++;
                    }
                    capturedSquirt=true;
                }
                else if(carrying=='tool axe' || carrying=='tool shovel' || carrying=='tool picaxe'){
                    blinkRed();
                }
                else if (carrying=='tool pokeball' && $(this).data("health")>=20 && capturedSquirt==false){
                    $(".failcaptureMessage").modal('show');
                }
            }

            else if(selectedDiv =='bulbasaur divBg'){

                var currPokeCount = checkPokemon(currentResource);
                var pokeDamage = reduceHealth(currentResource);

                if ((currentResource=='pika'  ||currentResource=='charmander'  ||currentResource=='squirtle' ||
                currentResource=='diglett' || currentResource=='pidgey' || currentResource=='mewtwo' )&& currPokeCount>0){

                    bulbHealth -= pokeDamage;

                    $(this).data("health",bulbHealth);

                    $('#healthbar').css("width",bulbHealth);
                    blinkRedPokemon();
                }

                if(carrying=='tool pokeball' && ( $(this).data("health")<20 || capturedBulb==true)){
                    $(this).removeClass(selectedDiv);
                    $(this).addClass("divBg");
                    bulbasaurCount++;

                    if (capturedBulb==false){
                        $('#capturedCaption').text("Bulbasaur has been added to your Pokedex");
                        $(".captureMessage").modal('show');
                        pokeCount++;
                    }
                    capturedBulb=true;
                }
                else if(carrying=='tool axe' || carrying=='tool shovel' || carrying=='tool picaxe'){
                    blinkRed();
                }
                else if (carrying=='tool pokeball' && $(this).data("health")>=20 && capturedBulb==false){
                    $(".failcaptureMessage").modal('show');
                }
            }

            else if(selectedDiv =='diglett divBg'){

                var currPokeCount = checkPokemon(currentResource);
                var pokeDamage = reduceHealth(currentResource);

                if ((currentResource=='pika'  ||currentResource=='charmander' || currentResource=='squirtle' ||
                currentResource=='bulbasaur'|| currentResource=='pidgey'  || currentResource=='mewtwo' ) && currPokeCount>0){

                    digHealth -= pokeDamage;

                    $(this).data("health",digHealth);
                    $('#healthbar').css("width",digHealth);
                    blinkRedPokemon();
                }

                if(carrying=='tool pokeball' && ( $(this).data("health")<20 || capturedDig==true)){
                    $(this).removeClass(selectedDiv);
                    $(this).addClass("divBg");
                    diglettCount++;

                    if (capturedDig==false){
                        $('#capturedCaption').text("Diglett has been added to your Pokedex");
                        $(".captureMessage").modal('show');
                        pokeCount++;
                    }
                    capturedDig=true;
                }
                else if(carrying=='tool axe' || carrying=='tool shovel' || carrying=='tool picaxe'){
                    blinkRed();
                }
                else if (carrying=='tool pokeball' && $(this).data("health")>=20 && capturedDig==false){
                    $(".failcaptureMessage").modal('show');
                }
            }
            else if(selectedDiv =='pidgey divBg'){

                var currPokeCount = checkPokemon(currentResource);
                var pokeDamage = reduceHealth(currentResource);

                if ((currentResource=='pika'||currentResource=='charmander'  ||currentResource=='squirtle'
                || currentResource=='bulbasaur' ||currentResource=="diglett" || currentResource=='mewtwo') && currPokeCount>0){

                    pidgHealth-= pokeDamage;

                    $(this).data("health",pidgHealth);
                    $('#healthbar').css("width",pidgHealth);
                    blinkRedPokemon();
                }

                if(carrying=='tool pokeball' && ( $(this).data("health")<20 || capturedPidg==true)){
                    $(this).removeClass(selectedDiv);
                    $(this).addClass("divBg");
                    pidgeyCount++;

                    if (capturedPidg==false){
                        $('#capturedCaption').text("Pidgey has been added to your Pokedex");
                        $(".captureMessage").modal('show');
                        pokeCount++;
                    }
                    capturedPidg=true;
                }
                else if(carrying=='tool axe' || carrying=='tool shovel' || carrying=='tool picaxe'){
                    blinkRed();
                }
                else if (carrying=='tool pokeball' && $(this).data("health")>=20 && capturedPidg==false){
                    $(".failcaptureMessage").modal('show');
                }
            }

            else if(selectedDiv =='mewtwo divBg'){

                var currPokeCount = checkPokemon(currentResource);
                var pokeDamage = reduceHealth(currentResource);

                if ((currentResource=='pika' ||currentResource=='charmander' ||currentResource=='squirtle'  ||
                currentResource=='bulbasaur'  || currentResource=="diglett"  || currentResource=='pidgey') && currPokeCount>0){

                mewHealth -= pokeDamage;

                    $(this).data("health",mewHealth);
                    $('#healthbar').css("width",mewHealth);
                    blinkRedPokemon();
                }

                if(carrying=='tool pokeball' && ( $(this).data("health")<20 || capturedMewtwo==true)){
                    $(this).removeClass(selectedDiv);
                    $(this).addClass("divBg");
                    mewtwoCount++;

                    if (capturedMewtwo==false){
                        $('#capturedCaption').text("Mewtwo has been added to your Pokedex");
                        $(".captureMessage").modal('show');
                        pokeCount++;
                    }
                    capturedMewtwo=true;
                }

                else if(carrying=='tool axe' || carrying=='tool shovel' || carrying=='tool picaxe'){
                    blinkRed();
                }
                else if (carrying=='tool pokeball' && $(this).data("health")>=20 && capturedMewtwo==false){
                    $(".failcaptureMessage").modal('show');
                }
            }


            if(pokeCount === 6 && displayed===false) {

                setTimeout(function() {
                    $("#winningModal").modal('show');
                    $(".captureMessage").modal('hide');
                    displayed=true;
                },1500);

            }

            var strNameUpdate = selectedDiv.replace(" divBg","");
            updateInventory(strNameUpdate);

        }
        if (selectedDiv=='divBg'){

            var classToAdd = currentResource + " divBg";
            var currPokeCount = checkPokemon(currentResource);

            if (currPokeCount>0){
                $(this).removeClass(selectedDiv);
                $(this).addClass(classToAdd);
                subtractInventory(currentResource);
            }


            updateInventory(currentResource);
        }

    }

    var resourceArray = ["grass","leaf","dirt","rock","tree","pika","diglett","pidgey","bulbasaur",
    "charmander","mewtwo","squirtle"];

    var countNames= [grassCount,leafCount,dirtCount,rockCount,treeCount,pikaCount,diglettCount,pidgeyCount,
    bulbasaurCount,charmanderCount,mewtwoCount,squirtleCount];

    function inventoryMaker(){
        for (var y=0; y<resourceArray.length;y++){
            var div = $("<button/>");
            var currCount = $("<p/>");
            currCount.attr('id',resourceArray[y] + 'Number');
            currCount.text(countNames[y]);
            div.addClass("inventory");
            div.addClass(resourceArray[y]);
            div.append(currCount);
            $('#inventory').append(div);
            div.click(getResource);

        }
    }
    var currentResource;

    function getResource(){
        var curr = $(this).attr("class");
        var resourceName = curr.replace("inventory ","");
        currentResource = resourceName;
        carrying="";
        $('.tool').css("background-color","black");
    }



    function updateInventory(resourceToUpdate){
        var hash = "#" + resourceToUpdate + "Number";
        var hashCount;

        switch (resourceToUpdate) {
            case 'leaf': hashCount= leafCount;
                break;
            case 'tree': hashCount= treeCount;
                break;
            case 'dirt': hashCount= dirtCount;
                break;
            case 'grass': hashCount= grassCount;
                break;
            case 'rock': hashCount= rockCount;
                break;
            case 'pika': hashCount= pikaCount;
                break;
            case 'charmander': hashCount= charmanderCount;
                break;
            case 'squirtle': hashCount= squirtleCount;
                break;
            case 'bulbasaur': hashCount= bulbasaurCount;
                break;
            case 'diglett': hashCount= diglettCount;
                break;
            case 'pidgey': hashCount= pidgeyCount;
                break;
            case 'mewtwo': hashCount= mewtwoCount;
                break;
        }
        $(hash).html(hashCount);
    }

    function subtractInventory(resourceToUpdate){
        var hash = "#" + resourceToUpdate + "Number";
        var hashCount;

        switch (resourceToUpdate) {
            case 'leaf': hashCount= leafCount--;
                break;
            case 'tree': hashCount= treeCount--;
                break;
            case 'dirt': hashCount= dirtCount--;
                break;
            case 'grass': hashCount= grassCount--;
                break;
            case 'rock': hashCount= rockCount--;
                break;
            case 'pika': hashCount= pikaCount--;
                break;
            case 'charmander': hashCount= charmanderCount--;
                break;
            case 'squirtle': hashCount= squirtleCount--;
                break;
            case 'bulbasaur': hashCount= bulbasaurCount--;
                break;
            case 'diglett': hashCount= diglettCount--;
                break;
            case 'pidgey': hashCount= pidgeyCount--;
                break;
            case 'mewtwo': hashCount= mewtwoCount--;
                break;
        }
        $(hash).html(hashCount);
    }


    function checkPokemon(poke){
        var currPoke;

        switch(poke){
        case 'pika': currPoke= pikaCount;
            break;
        case 'charmander': currPoke= charmanderCount;
            break;
        case 'squirtle': currPoke= squirtleCount;
            break;
        case 'bulbasaur': currPoke= bulbasaurCount;
            break;
        case 'diglett': currPoke= diglettCount;
            break;
        case 'pidgey': currPoke= pidgeyCount;
            break;
        case 'mewtwo': currPoke= mewtwoCount;
            break;

            case 'leaf': currPoke= leafCount;
                break;
            case 'tree': currPoke= treeCount;
                break;
            case 'dirt': currPoke= dirtCount;
                break;
            case 'grass': currPoke= grassCount;
                break;
            case 'rock': currPoke= rockCount;
                break;
}
        return currPoke;
    }


    function reduceHealth(poke){

        var currDamage;

        switch(poke){
        case 'pika': currDamage= $(".pika").data("attack");
        break;
        case 'charmander': currDamage= $(".charmander").data("attack");
            break;
        case 'squirtle': currDamage= $(".squirtle").data("attack");
            break;
        case 'bulbasaur': currDamage= $(".bulbasaur").data("attack");
            break;
        case 'diglett': currDamage= $(".diglett").data("attack");
            break;
        case 'pidgey': currDamage= $(".pidgey").data("attack");
            break;
        case 'mewtwo': currDamage= $(".mewtwo").data("attack");
            break;
    }
        return currDamage;

    }

    var displayed= false;
    var resetButton = $('#restore').click(resetBoard);

    function resetBoard(){
        $("#board").html("");
        $("#tools").html("");
        $("#inventory").html("");

        dirtCount=0;
        grassCount =0;
        leafCount =0;
        treeCount=0;
        rockCount =0;
        pikaCount =1;
        mewtwoCount =0;
        pidgeyCount =0;
        bulbasaurCount =0;
        charmanderCount =0;
        diglettCount =0;
        squirtleCount =0;
        pokeCount =0;
        selectedTool="";

        makeBg();
        toolMaker();
        inventoryMaker();

        charHealth = 60;
        squirtHealth= 100;
        digHealth = 101;
        mewHealth = 170;
        pidgHealth = 100;
        bulbHealth = 120;

        capturedChar=false;
        capturedSquirt=false;
        capturedBulb=false;
        capturedDig=false;
        capturedPidg=false
        capturedMewtwo=false;
        displayed=false;

        $('#healthbar').css("width","180px");

        $(".diglett").data("health",digHealth);
        $(".diglett").data("attack",13);

        $(".squirtle").data("health",squirtHealth);
        $(".squirtle").data("attack",15);

        $(".pika").data("attack",5);

        $(".charmander").data("health",charHealth);
        $(".charmander").data("attack",10);

        $(".mewtwo").data("health",mewHealth);
        $(".mewtwo").data("attack",50);

        $(".pidgey").data("health",pidgHealth);
        $(".pidgey").data("attack",6);

        $(".bulbasaur").data("health",bulbHeath);
        $(".bulbasaur").data("attack",19);


        $(".charmander,.squirtle,.diglett,.mewtwo,.pidgey,.bulbasaur").hover(function(){
            num = $(this).data("health");
            $('#healthbar').css("width",num);
        });

        $(".charmander,.squirtle,.diglett,.mewtwo,.pidgey,.bulbasaur").mouseout(function(){
            $('#healthbar').css("width","180px");
        });
    }


    makeBg();
    toolMaker();
    inventoryMaker();

    var charHealth = 60;
    var squirtHealth= 100;
    var digHealth = 101;
    var mewHealth = 170;
    var pidgHealth = 100;
    var bulbHealth = 120;

    var num;

    var capturedChar=false;
    var capturedSquirt=false;
    var capturedBulb=false;
    var capturedDig=false;
    var capturedPidg=false
    var capturedMewtwo=false;

    $(".diglett").data("health",digHealth);
    $(".diglett").data("attack",13);

    $(".squirtle").data("health",squirtHealth);
    $(".squirtle").data("attack",15);

    $(".pika").data("attack",5);

    $(".charmander").data("health",charHealth);
    $(".charmander").data("attack",10);

    $(".mewtwo").data("health",mewHealth);
    $(".mewtwo").data("attack",50);

    $(".pidgey").data("health",pidgHealth);
    $(".pidgey").data("attack",6);

    $(".bulbasaur").data("health",bulbHealth);
    $(".bulbasaur").data("attack",19);


    $(".charmander,.squirtle,.diglett,.mewtwo,.pidgey,.bulbasaur").hover(function(){
        num = $(this).data("health");
        $('#healthbar').css("width",num);
    });
    $(".charmander,.squirtle,.diglett,.mewtwo,.pidgey,.bulbasaur").mouseout(function(){
        $('#healthbar').css("width","180px");
    });

    $(".divbg").hover(function(){
        $('#healthbar').css("width","180px");
    });


});

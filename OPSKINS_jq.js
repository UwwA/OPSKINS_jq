//FOR USE WITH OPSKINS.com
//Example url for testing: https://opskins.com/index.php?search_item=****&min=500&max=715&grade=Grade&type=Type&sort=f&loc=shop_search

//Creates an array of all suggested prices
var x = [];
x.length = 0;
$("span.market-name").each(function(){
	x.push($(this).text().replace(/\D/g, ""));
});

//Creates an array of all actual prices
var y = [];
y.length = 0;
$("div.item-amount").each(function(){
	y.push($(this).text().replace(/\D/g, ""));
});

//Stores the difference between each object in an array
var diff = [];
diff.length = 0;
for(i = 0;i<x.length;i++)
{
	diff.push(x[i]-y[i]);
}

//Calculates and stores profit percentages in an array
var perc = [];
var col = "";
for(i = 0;i<x.length;i++)
{
	//Avoid division by zero
	if(diff[i] != "0"){
		perc.push(diff[i]/x[i]);
	}
	else
	{
		perc.push("0");
	}
}

//Prints out the profit percentages to the user
var s = 0;
$("div.item-add").each(function(){
	if(perc[s] < 0.1){
		col = "red";
	}
	else if(perc[s] < 0.2 && perc[s] > 0.1){
		col = "blue";
	}
	else if(perc[s] < 0.3 && perc[s] > 0.2){
		col = "orange";
	}
	else if(perc[s] > 0.3){
		col = "green";
	}
	if(!$(this).children("div").hasClass("box")){
		$(this).append("<div class='box' title='"+Math.round(perc[s]*100) +"% Off'>");
	}
	$(this).children(".box").html("<center><span class='item-amount'> Diff: <font color='"+col+"'>"+diff[s]+"</font></span></center></div>");
	s++;
});

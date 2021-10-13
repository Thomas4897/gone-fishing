const prompt = require("prompt-sync")({ signit: true });
let time = 6;
const chalk = require("chalk");

let bucket = {
	totalWeight: 0,
	totalValue: 0,
	typeFish: [],
};

let fish = [
	"Deepsea Finned Salmon",
	"Purple Bigmouthed Herring",
	"Slimy Scaly Bass",
	"Alaskan Salmon",
	"Striped Bass",
	"Bluefish",
	"Pacific Halibut",
	"Redfish",
	"King Salmon",
	"Tuna",
];

console.log(
	chalk.black(
		chalk.bgWhite(
			"\nYou've gone fishing! Try to maximize the value of your caught fish. " +
				chalk.red("You can fish for six hours till 12:00pm") +
				" and can catch at most " +
				chalk.red("10 lbs of fish.")
		)
	)
);

function getStatus() {
	if (time < 12) {
		console.log(
			"The time is " +
				chalk.red(time) +
				chalk.red(":00am") +
				". So far you've caught: "
		);
		console.log(
			chalk.green(bucket["typeFish"].length) +
				" fish, " +
				chalk.green(bucket["totalWeight"].toFixed(2)) +
				" lbs, $" +
				chalk.green(bucket["totalValue"].toFixed(2))
		);
	}
}

function getCaughtFish() {
	randomFishy = Math.floor(Math.random() * 10);
	wt = (Math.random() * 10).toFixed(2);
	price = (wt * 2.05).toFixed(2);
	console.log(
		"\nYou caught a '" +
			chalk.greenBright(fish[randomFishy]) +
			"' weighing " +
			chalk.green(wt) +
			" lbs and valued at $" +
			chalk.green(price)
	);
}

function catchTheFish() {
	console.log(chalk.green("\nYou chose to keep the fish."));
	bucket["totalWeight"] += Number(wt);
	bucket["totalValue"] += Number(price);
	bucket["typeFish"].push({
		name: fish[randomFishy],
		weight: wt,
		cash: price,
	});
}

function catchRelease() {
	console.log(
		"\nYour action: " +
			chalk.green("[c]") +
			"atch or " +
			chalk.green("[r]") +
			"elease?"
	);
	let choice = prompt("> ");

	if (choice.toLowerCase() === "c") {
		if ((bucket["totalWeight"] += wt > 10)) {
			console.log(
				"\nThis fish would put you " +
					chalk.red("over 10 lbs") +
					", so you release it."
			);
			console.log("\nPress " + chalk.green("[enter]") + " to continue.");
			choice = prompt("> ");
			time++;
		} else {
			catchTheFish();
			time++;
		}
	} else if (choice.toLowerCase() === "r") {
		console.log(chalk.green("\nYou chose to release the fish."));
		time++;
	}
}

function printCaughtFish() {
	for (let i = 0; i < bucket["typeFish"].length; i++) {
		console.log(
			"* " +
				chalk.greenBright(bucket.typeFish[i].name) +
				", " +
				chalk.green(bucket.typeFish[i].weight) +
				" lbs, $" +
				chalk.green(bucket.typeFish[i].cash)
		);
	}
}

while (time < 12 && bucket["totalWeight"] <= 10) {
	console.log("\n==============================================\n");

	getStatus();
	getCaughtFish();
	catchRelease();
}

console.log("\n==============================================\n");

console.log("The time is " + chalk.red(time + ":00pm") + ". Times up!\n");

console.log("You caught " + chalk.green(bucket["typeFish"].length) + " fish:");
printCaughtFish();

console.log(
	"\nTotal weight: " + chalk.green(bucket["totalWeight"].toFixed(2)) + " lbs"
);
console.log("Total value: $" + chalk.green(bucket["totalValue"].toFixed(2)));

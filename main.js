const prompt = require("prompt-sync")({ signit: true });
let time = 6;
let currentWeight = 0;

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
	"You've gone fishing! Try to maximize the value of your caught fish. You can fish for six hours (till 12:00pm) and can catch at most 10 lbs of fish."
);

function getBucket() {
	bucket;
}

function getBucketWeight() {
	let currentWeight = 0;
	currentWeight += bucket["totalWeight"];
}

function getStatus() {
	if (time < 12) {
		console.log(
			"The time is " +
				time +
				":00am. So far you've caught: 0 fish, 0 lbs, $0.00"
		);
	} else {
		console.log(
			"The time is " +
				time +
				":00pm. So far you've caught: 0 fish, 0 lbs, $0.00"
		);
	}
}

function getCaughtFish() {
	randomFishy = Math.floor(Math.random() * 10);
	wt = (Math.random() * 10).toFixed(2);
	price = (wt * 2.05).toFixed(2);
	console.log(
		"You caught a '" +
			fish[randomFishy] +
			"' weighing " +
			wt +
			" lbs and valued at $" +
			price
	);
}

function catchRelease() {
	console.log("\nYour action: [c]atch or [r]elease?");
	let choice = prompt("> ");

	if (choice.toLowerCase() === "c") {
		console.log("\nYou chose to keep the fish.");
		bucket["totalWeight"] += Number(wt);
		currentWeight += Number(wt);
		bucket["totalValue"] += Number(price);
		bucket["typeFish"].push({
			name: fish[randomFishy],
			weight: wt,
			cash: price,
		});

		time++;
	} else if (choice.toLowerCase() === "r") {
		console.log("\nYou chose to release the fish.");
		time++;
	}
}

function printCaughtFish() {
	for (let i = 0; i < bucket["typeFish"].length; i++) {
		console.log(
			"* " +
				bucket.typeFish[i].name +
				", " +
				bucket.typeFish[i].weight +
				" lbs, $" +
				bucket.typeFish[i].cash
		);
	}
}

while (time < 12 || currentWeight <= 10) {
	console.log("\n==============================================\n");
	console.log(currentWeight);
	getBucket();
	getStatus();
	getCaughtFish();
	catchRelease();
}

console.log("\n==============================================\n");

console.log("The time is 12:00pm. Times up!\n");

console.log("You caught " + bucket["typeFish"].length + " fish:");
printCaughtFish();

console.log("\nTotal weight: " + bucket["totalWeight"].toFixed(2));
console.log("Total value: $" + bucket["totalValue"].toFixed(2));

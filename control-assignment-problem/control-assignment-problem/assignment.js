//Problem 1
const randomNumber = Math.random(); // produces random number between 0 (including) and 1 (excluding)
if (randomNumber > 0.7) {
    alert("Greater than 0.7!");
}
else {
    alert("Not greater than!");
}


//Problem 2
var nums = [1, 2, 3, 4, 5];
//First method
for (let i = 0; i < nums.length; i++) {
    console.log(nums[i]);
}
//Second method
for (key in nums) {
    console.log(`Value is ${key}`)
}


//Problem 3
for (let i = nums.length - 1; i >= 0; i--) {
    console.log(nums[i]);
}


//Problem 4
const randomNumber2 = Math.random(); // produces random number between 0 (including) and 1 (excluding)

//First method
if ((randomNumber > 0.7 && randomNumber2 > 0.7) 
|| (randomNumber <= 0.2 || randomNumber2 <= 0.2)) {
    alert("Condition is true!");
}

//Second method
if (randomNumber > 0.7 && randomNumber2 > 0.7) {
    alert("Condition is true!");
}
else if (randomNumber <= 0.2 || randomNumber2 <= 0.2) {
    alert("Condition is true!");
}

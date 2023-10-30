// ------------------------------------------------
// Other functions
// ------------------------------------------------

// Convert a percentage to "1 in every X"
export function percentageToOneInEveryX(percentage) {
    if (percentage === 0) {
      return "Never";
    }
    const oneInX = 1 / percentage;
    const roundedOneInX = Math.round(oneInX).toLocaleString(); // Rounds to the nearest integer and adds thousands separators
    return `1 in every ${roundedOneInX}`;
  }
  
  // Custom rounding function for ratios
  export function customRoundForRatio(num) {
    if (num > 10) {
      return Math.round(num);
    } else {
      return parseFloat(num.toFixed(2));
    }
  }

  export function formatPercentage(value) {
    // Convert to percentage
    let percentage = value * 100;
  
    // Check for the 1-decimal-place scenario
    if (percentage.toFixed(1) === "0.0") {
      // If 2-decimal-place is also 0, then return "< 0.01%"
      return percentage.toFixed(2) === "0.00" ? "< 0.01" : percentage.toFixed(2);
    } else {
      // Otherwise, return the value with 1 decimal place
      return percentage.toFixed(1);
    }
  }

  export function listToCleanList(list) {
    // Convert a list to a string with commas and "and"
    if (list.length === 0) {
      return "";
    }
    if (list.length === 1) {
      return list[0];
    }
    if (list.length === 2) {
      return `${list[0]} and ${list[1]}`;
    }
    if (list.length > 2) {
      let string = "";
      for (let i = 0; i < list.length - 1; i++) {
        string += `${list[i]}, `;
      }
      string += `and ${list[list.length - 1]}`;
      return string;
    }

  }
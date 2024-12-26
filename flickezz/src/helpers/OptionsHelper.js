export const isChristmas = () => {
  const today = new Date();
  const month = today.getMonth(); // Months are 0-indexed: 0 = January, 11 = December
  const date = today.getDate();

  // Check if it's December
  if (month === 11) {
    return true;
  }

  // Check if it's the last week of November
  if (month === 10 && date >= 24) {
    return true;
  }

  // Check if it's the first 5 days of January
  if (month === 0 && date <= 5) {
    return true;
  }

  // Otherwise, it's not within the range
  return false;
};

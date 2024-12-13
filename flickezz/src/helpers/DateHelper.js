export function formatDate(input) {
  // Parse the input date
  const date = new Date(input);

  // Create a list of month names
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Extract day, month, and year
  const day = date.getUTCDate(); // Get the day of the month
  const month = months[date.getUTCMonth()]; // Get the month name
  const year = date.getUTCFullYear(); // Get the year

  // Format the result
  return `${day}, ${month} ${year}`;
}

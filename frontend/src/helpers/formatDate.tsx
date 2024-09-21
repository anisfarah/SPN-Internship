function formatDateAndTime(dateString) {
  const date = new Date(dateString);

  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });

  const formattedTime = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });

  return `${formattedDate} at ${formattedTime}`;
}

export default formatDateAndTime;

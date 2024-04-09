import formatDateTime from './formatDateTime';

const dateTimeString = "2024-04-09 12:00:00";

// Primijenite formatDateTime funkciju
const formattedDateTime = formatDateTime(dateTimeString);

// Dohvatite datum i vrijeme iz formatiranog stringa
const [time, date] = formattedDateTime.split(' ');



const formatDateTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    const hours = dateTime.getHours().toString().padStart(2, '0');
    const minutes = dateTime.getMinutes().toString().padStart(2, '0');
   
    return `${hours}:${minutes}`;
  };
  
  export default formatDateTime;
  
  
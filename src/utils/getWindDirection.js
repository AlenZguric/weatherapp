export const getWindDirection = (degrees) => {
    const directions = ['S', 'SW', 'W', 'NW', 'N', 'NE', 'E', 'SE'];
    const index = Math.round((degrees % 360) / 45);
    return directions[index];
  };
  
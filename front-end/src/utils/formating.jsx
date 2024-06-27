export const numberFormat = (number) => {
    if (number === undefined || number === null) {
      return ''; 
    }
    
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
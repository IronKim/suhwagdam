import React, { useEffect}from 'react';

export const calculateTimeDifference = (deadlineDate) => {
    const now = new Date();
    const difference = deadlineDate - now;
    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    return { hours, minutes, seconds };
  };

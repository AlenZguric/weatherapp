import React, { useState, useEffect } from 'react';
import moment from 'moment';

const Greeting = () => {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const currentHour = moment().hour();

    if (currentHour >= 6 && currentHour < 12) {
      setGreeting('Good morning');
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreeting('Good day');
    } else {
      setGreeting('Good evening');
    }
  }, []);

  return (
    <div className="greeting">
      <h4>{greeting}</h4>
    </div>
  );
};

export default Greeting;

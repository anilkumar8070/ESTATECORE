import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [compareList, setCompareList] = useState([]);
  const [scheduledVisits, setScheduledVisits] = useState([]);
  const [buyRequests, setBuyRequests] = useState([]);

  // Wishlist Logic
  const toggleWishlist = (property) => {
    setWishlist((prev) => {
      const exists = prev.find((p) => p.id === property.id);
      if (exists) return prev.filter((p) => p.id !== property.id);
      return [...prev, property];
    });
  };

  const isInWishlist = (id) => wishlist.some((p) => p.id === id);

  // Compare Logic
  const toggleCompare = (property) => {
    setCompareList((prev) => {
      const exists = prev.find((p) => p.id === property.id);
      if (exists) return prev.filter((p) => p.id !== property.id);
      if (prev.length >= 3) {
        alert("You can only compare up to 3 properties at a time.");
        return prev;
      }
      return [...prev, property];
    });
  };

  const isInCompare = (id) => compareList.some((p) => p.id === id);

  // Schedule Visit
  const scheduleVisit = (property, date) => {
    setScheduledVisits((prev) => [...prev, { property, date, status: 'Pending' }]);
  };

  // Buy Request
  const requestBuy = (property, offer) => {
    setBuyRequests((prev) => [...prev, { property, offer, status: 'Reviewing' }]);
  };

  return (
    <UserContext.Provider value={{
      wishlist, toggleWishlist, isInWishlist,
      compareList, toggleCompare, isInCompare,
      scheduledVisits, scheduleVisit,
      buyRequests, requestBuy
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);

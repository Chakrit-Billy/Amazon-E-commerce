import  { createContext, useContext } from "react";
import PropTypes from 'prop-types';
export const DateContext = createContext();


export function useDateContext() {
  return useContext(DateContext);
}

export function DateProvider({ children }) {
  const dateFunc = (a) => {
    const date = new Date();

    const tomorrow = new Date(date);
    tomorrow.setDate(date.getDate() + 1);
    const nextTwoDay = new Date(date);
    nextTwoDay.setDate(date.getDate() + 2);
    const nextThreeDay = new Date(date);
    nextThreeDay.setDate(date.getDate() + 3);

    const monthName3 = tomorrow.toLocaleString("en-US", { month: "long" });
    const day3 = tomorrow.getDate();
    const dayOfWeek3 = tomorrow.toLocaleString("en-US", { weekday: "long" });

    const monthName2 = nextTwoDay.toLocaleString("en-US", { month: "long" });
    const day2 = nextTwoDay.getDate();
    const dayOfWeek2 = nextTwoDay.toLocaleString("en-US", { weekday: "long" });

    const monthName1 = nextThreeDay.toLocaleString("en-US", { month: "long" });
    const day1 = nextThreeDay.getDate();
    const dayOfWeek1 = nextThreeDay.toLocaleString("en-US", {
      weekday: "long",
    });

    const dateString3 = `${dayOfWeek3}, ${monthName3} ${day3} - 9.99`;
    const dateString2 = `${dayOfWeek2}, ${monthName2} ${day2} - 4.99`;
    const dateString1 = `${dayOfWeek1}, ${monthName1} ${day1} - FREE Shipping`;

    if (a === 1) {
      return dateString1;
    } else if (a === 2) {
      return dateString2;
    } else if (a === 3) {
      return dateString3;
    }
  };

  return (
    <DateContext.Provider value={{ dateFunc }}>{children}</DateContext.Provider>
  );
}
DateProvider.propTypes = {
  children: PropTypes.node.isRequired, // Validate children prop
};
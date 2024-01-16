import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { FaEuroSign } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { setCurrency } from "../../redux/currencySlice";
import "./currencyConverter.css";

const CurrencyConverter = () => {
  const [conversionRateDinars, setConversionRateDinars] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await axios.get(
          `https://v6.exchangerate-api.com/v6/0c21dbfc935c50c916a981fa/latest/EUR`
        );
        const { conversion_rates } = response.data;
        setConversionRateDinars(conversion_rates.RSD);
      } catch (error) {
        // Handle errors
        console.error("Error fetching exchange rates:", error);
      }
    };
    // Call the fetchExchangeRates function
    fetchExchangeRates();
  }, []); // The empty dependency array ensures that the effect runs only once on mount

  const fetchExchangeRatesRSD = () => {
    dispatch(setCurrency({ name: "RSD", rate: conversionRateDinars }));
  };

  const fetchExchangeRatesEUR = () => {
    dispatch(setCurrency({ name: "EUR", rate: 1 }));
  };

  return (
    <div className="wd--currency-container">
      <FaEuroSign
        className="wd--currency-container--item wd--currency-container--euro"
        onClick={fetchExchangeRatesEUR}
        tabIndex={0}
      />
      <div
        className="wd--currency-container--item wd--currency-container--dinar"
        onClick={fetchExchangeRatesRSD}
        tabIndex={0}
      >
        <p>RSD</p>
      </div>
    </div>
  );
};

export default CurrencyConverter;

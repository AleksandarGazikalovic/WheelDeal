import CurrencyInput from "react-currency-input-field";
import "../filters.css";
import { AiOutlineMinus } from "react-icons/ai";

const HowMuchFilter = ({
  onChange,
  fromPrice,
  toPrice,
  defaultFromPrice,
  defaultToPrice,
}) => {
  const handlePriceChange = (value, name) => {
    // Call the onChange function to update the filter values
    onChange({ [name]: value });
  };

  return (
    <div className="how-much-filter">
      <CurrencyInput
        className="currency-input"
        name="fromPrice"
        placeholder="Start price"
        defaultValue={defaultFromPrice}
        value={fromPrice}
        decimalsLimit={2}
        onValueChange={(value) => handlePriceChange(value, "fromPrice")}
        prefix="€"
      />
      <AiOutlineMinus />
      <CurrencyInput
        className="currency-input"
        name="toPrice"
        placeholder="End price"
        defaultValue={defaultToPrice}
        value={toPrice}
        decimalsLimit={2}
        onValueChange={(value) => handlePriceChange(value, "toPrice")}
        prefix="€"
      />
    </div>
  );
};

export default HowMuchFilter;

import { AiOutlineMinus } from "react-icons/ai";
import "../filters.css";

const HowLongFilter = ({
  onChange,
  fromDate,
  toDate,
  defaultFromDate,
  defaultToDate,
}) => {
  const handleDateChange = (newDates) => {
    // Call the onChange function to update the filter values
    onChange(newDates);
  };
  return (
    <div className="how-long-filter">
      <div className="how-long-from">
        <label htmlFor="how-long-from-input">From</label>
        <input
          type="date"
          id="how-long-from-input"
          value={fromDate}
          onChange={(e) => handleDateChange({ fromDate: e.target.value })}
        />
      </div>
      <AiOutlineMinus />
      <div className="how-long-to">
        <label htmlFor="how-long-to-input">To</label>
        <input
          type="date"
          id="how-long-to-input"
          value={toDate}
          onChange={(e) => handleDateChange({ toDate: e.target.value })}
        />
      </div>
    </div>
  );
};

export default HowLongFilter;

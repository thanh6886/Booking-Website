import { DateRange } from "react-date-range";

const DatePicker = ({dateState, setDateState, onClick}) => {
  return (
  <DateRange
    minDate={new Date()}
    editableDateInputs={true}
    moveRangeOnFirstSelection={false}
    onChange={item => {
      setDateState([item.selection])
      onClick()
    }}
    ranges={dateState}
  />
  )
}

export default DatePicker
import * as React from "react";
import { useState } from "react";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers-pro/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";

export default function DateRangePickerCalendarProp() {
  const [dateStatus, setDateStatus] = useState("");

  const renserSomething = () => {};
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
        components={["DateRangePicker", "DateRangePicker", "DateRangePicker"]}
      >
        <DemoItem
          label="Pick out your days (optional)"
          component="DateRangePicker"
        >
          <DateRangePicker onChange={renserSomething} />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}

import React, { useState } from "react";
import {
  Inject,
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  EventSettingsModel
} from "@syncfusion/ej2-react-schedule";
import { render } from "react-dom";
export default function Calendar() {
  return (
    <ScheduleComponent currentView="Month">
      <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
    </ScheduleComponent>
  );
}

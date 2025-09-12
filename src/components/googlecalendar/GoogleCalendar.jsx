import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import deLocale from "@fullcalendar/core/locales/de";
import { useEffect, useState } from "react";
import googleCalendarPlugin from "@fullcalendar/google-calendar";

export default function GoogleCalendar() {
  // const [events, setEvents] = useState(null);
  // const [isLoading, setLoading] = useState(true);
  // const [activeAvatars, setActiveAvatars] = useState([
  //   "alle",
  //   "lk",
  //   "sk",
  //   "nk",
  //   "jk",
  // ]);

  // useEffect(() => {
  //   setLoading(true);
  //   fetch(
  //     "/api/gcal?" +
  //       new URLSearchParams({
  //         cals: activeAvatars.join(","),
  //       })
  //   )
  //     .then((res) => res.json())
  //     .then((data) => {
  //       const events = data.events?.map((e) => {
  //         return {
  //           title: e.summary,
  //           start: e.start.date || e.start.dateTime,
  //           end: e.end.date || e.end.datTime,
  //         };
  //       });
  //       setEvents(events);
  //       setLoading(false);
  //     });
  // }, [activeAvatars]);

  // function handleAvatar(avatar) {
  //   activeAvatars.includes(avatar)
  //     ? setActiveAvatars(activeAvatars.filter((el) => el !== avatar))
  //     : setActiveAvatars((prevArr) => [...prevArr, avatar]);
  // }

  return (
    <FullCalendar
      // height={"30em"}
      aspectRatio={1.5}
      plugins={[dayGridPlugin, listPlugin, googleCalendarPlugin]}
      googleCalendarApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_CALENDAR_KEY}
      initialView="dayGridMonth"
      locale={deLocale}
      headerToolbar={{
        left: "prev,next,today",
        center: "title",
        right: "dayGridMonth,dayGridWeek,listWeek",
      }}
      // eventMinHeight={30}
      events={{
        googleCalendarId: process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_ID,
      }}
    />
  );
}

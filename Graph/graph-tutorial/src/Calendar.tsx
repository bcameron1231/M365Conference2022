// Copyright (c) Microsoft Corporation.
// Licensedunder the MIT License.
import { useEffect, useState } from "react";
import { findIana } from "windows-iana";
import { Event } from "microsoft-graph";
import { AuthenticatedTemplate } from "@azure/msal-react";
import { getUserWeekCalendar } from "./GraphService";
import { useAppContext } from "./AppContext";
import "./Calendar.css";
import { format, parseISO } from "date-fns";

export default function Calendar() {
  const app = useAppContext();

  const [events, setEvents] = useState<Event[]>();

  useEffect(() => {
    const loadEvents = async () => {
      if (app.user && !events) {
        try {
          const ianaTimeZones = findIana(app.user?.timeZone!);
          const events = await getUserWeekCalendar(
            app.authProvider!,
            ianaTimeZones[0].valueOf()
          );
          setEvents(events);
        } catch (err) {
          const error = err as Error;
          app.displayError!(error.message);
        }
      }
    };

    loadEvents();
  });

  interface FormatMap {
    [key: string]: string;
  }

  const formatMap: FormatMap = {
    "h:mm tt": "h:mm a",
    "hh:mm tt": "hh:mm a",
  };

  function formatDateTime(dateTime: string | undefined, timeFormat: string) {
    if (dateTime !== undefined) {
      const parsedDate = parseISO(dateTime);
      return format(parsedDate, formatMap[timeFormat] || timeFormat);
    }
  }

  return (
    <AuthenticatedTemplate>
      {events && (
        <div className="calendar-week">
          <div dir="null" className="agenda">
            <ul className="agenda-list">
              {events?.map((event, key) => (
                <li key={key}>
                  <div className="event">
                    <div className="event-time-container">
                      <div
                        className="event-time"
                        aria-label="9:30 AM - 12:00 PM"
                      >
                        {formatDateTime(
                          event.start?.dateTime,
                          app.user?.timeFormat!
                        )}{" "}
                        -{" "}
                        {formatDateTime(
                          event.end?.dateTime,
                          app.user?.timeFormat!
                        )}
                      </div>
                    </div>
                    <div className="event-details-container">
                      <div className="event-subject">{event.subject}</div>
                      {event.location && (
                        <div className="event-location-container">
                          <div className="event-location-icon">
                            <svg
                              width="14"
                              height="17"
                              viewBox="0 0 14 17"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M6.78489 16.3832L6.78263 16.3859C6.75278 16.4216 6.71543 16.4503 6.67324 16.4701L6.88498 16.923L6.67324 16.4701C6.63105 16.4898 6.58504 16.5 6.53846 16.5C6.49188 16.5 6.44588 16.4898 6.40368 16.4701C6.36149 16.4503 6.32415 16.4216 6.2943 16.3859L6.29202 16.3832C5.47882 15.4241 4.01597 13.6289 2.75914 11.7172C2.13055 10.7611 1.56021 9.78597 1.14862 8.87887C0.732553 7.96189 0.5 7.15987 0.5 6.53687C0.5 3.20251 3.20343 0.5 6.53846 0.5C9.87349 0.5 12.5769 3.20251 12.5769 6.53687C12.5769 7.16011 12.3444 7.96225 11.9283 8.87925C11.5167 9.78639 10.9464 10.7615 10.3178 11.7175C9.06097 13.6291 7.59812 15.424 6.78489 16.3832Z"
                                stroke="undefined"
                              ></path>
                              <path
                                d="M4.40039 6.53921C4.40039 5.37092 5.34748 4.42383 6.51577 4.42383C7.68407 4.42383 8.63116 5.37092 8.63116 6.53921C8.63116 7.70751 7.68407 8.6546 6.51577 8.6546C5.34748 8.6546 4.40039 7.70751 4.40039 6.53921Z"
                                stroke="undefined"
                              ></path>
                            </svg>
                          </div>
                          <div className="event-location">
                            {event.location?.displayName?.toString()}
                          </div>
                        </div>
                      )}
                      <div className="event-attendees">
                        <ul className="people-list">
                          {event.attendees?.map((attendee, key) => (
                            <li className="people-person">
                              <div className="peron-root small">
                                <div className="initials small user-avatar">
                                  <span
                                    className="initials-text"
                                    title={attendee.emailAddress?.name?.toString()}
                                  >
                                    {attendee.emailAddress?.name?.charAt(0)}
                                  </span>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="event-other-container"></div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </AuthenticatedTemplate>
  );
}

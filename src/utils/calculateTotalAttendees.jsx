const calculateTotalAttendees = (attendees) => {
  let tickets = 0;

  if (attendees.length === undefined) {
    tickets = 0;
  } else if (attendees.length === 1) {
    tickets = attendees[0].numerobiglietti;
  } else {
    for (const { numerobiglietti } of attendees) {
      tickets += numerobiglietti;
    }
  }

  return tickets;
};

export default calculateTotalAttendees;

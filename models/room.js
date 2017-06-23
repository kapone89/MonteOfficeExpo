const googleCalendarUrlParts = {
  1: "31323535363833302d323036%40resource.calendar.google.com&color=%235F6B02",
  2: "37303038373438333438%40resource.calendar.google.com&color=%236B3304",
  3: "39323138303639302d353538%40resource.calendar.google.com&color=%23B1440E",
  4: "3133353337383734383334%40resource.calendar.google.com&color=%232952A3",
  5: "2d3235383335343539393638%40resource.calendar.google.com&color=%2323164E",
  6: "2d35313132313434382d343233%40resource.calendar.google.com&color=%232F6309",
}

export default class Room {
  constructor(params) {
    this.id = params.id;
    this.description = params.description;
    this.last_detection = params.last_detection;
    this.occupied = (params.last_detection > ((new Date()).getTime() - 5*60*1000));
  }

  getCalendarUri() {
    return "https://calendar.google.com/calendar/embed?mode=AGENDA&height=600&wkst=1&bgcolor=%23ffffff&src=monterail.com_" +
      googleCalendarUrlParts[this.id] + "&ctz=Europe%2FWarsaw"
  }
}

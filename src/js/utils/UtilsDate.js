export default class UtilsDate {
  constructor(date){
    this.date = date;
    this.day = date.getDate();
    this.month = date.getMonth();
    this.year = date.getFullYear();
  }

  getPrevDate() {
    return (new Date(Date.parse(this.date - this.getDaysInMs)));
  }

  getDaysInMs(days) {
    return days * 24 * 60 * 60 * 1000;
  }

  getDateString() {
    return `${this.date.toLocaleString('ru', { day: 'numeric', month: 'long' })}, ${this.year}`;
  }

  formatYYYYMMDD() {
    if (this.day < 10) {
       this.day = `0${this.day}`;
    }
    if (this.month < 10) {
      this.month = `0${this.month}`;
    }

    return `${this.year}-${this.month}-${this.day}`;
  }
}
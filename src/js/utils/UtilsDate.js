import { MONTHS } from "../constants/constants";

export default class UtilsDate {
  constructor(props) {
    this.date = props.date;
    this.day = props.date.getDate();
    this.month = props.date.getMonth();
    this.year = props.date.getFullYear();
    this.period = props.period;
  }

  getPrevDate = () => {
    return (new Date(this.date.getTime() - this.getDaysInMs()).toISOString());
  }

  getDaysInMs = () => {
    return this.period * 24 * 60 * 60 * 1000;
  }

  getCurrentDate = () => {
    return this.date.toISOString();
  }

  formatDate = () => {
    if (this.day < 10) {
      this.day = `0${this.day}`;
    }
    if (this.month < 10) {
      this.month = `0${this.month}`;
    }
    return `${this.day} ${MONTHS[this.month]}, ${this.year}`;
  }
}
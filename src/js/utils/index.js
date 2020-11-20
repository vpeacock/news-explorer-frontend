import NEWS_API_OPTIONS from "../config";

export default  getDate = () => {
  const lengthPeriod = NEWS_API_OPTIONS.findPeriodTime * 24 * 60 * 60 * 1000;
  const currentDate = new Date();
  const toDate = currentDate.toISOString();
  const fromDate = new Date(currentDate.getTime() - lengthPeriod).toISOString();
  return { fromDate, toDate }
}
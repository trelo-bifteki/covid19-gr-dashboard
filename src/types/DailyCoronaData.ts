export default interface DailyCoronaData {
  '0-17': number;
  '18-39': number;
  '40-64': number;
  '65_plus': number;
  current_deaths: number;
  total: number;
  new_confirmed: number;
  men: number;
  women: number;
  in_IC: number;
  currently_treating: number;
  recovered: number;
  regions: Record<string, number>;
};

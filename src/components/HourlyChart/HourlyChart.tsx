import { CurrentWeatherObj } from "../../redux/features/weather/weatherSlice";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export function HourlyChart({ weather }: { weather: CurrentWeatherObj }) {
  const oneDay = weather.list.filter((_, i) => i < 8);

  const data = oneDay.map((el) => {
    const time = new Date(el.dt_txt).getHours();
    return {
      time: time + ":00",
      temperature: el.main.temp,
    };
  });

  return (
    <ResponsiveContainer
      width={window.innerWidth < 768 ? "99%" : "60%"}
      height={300}
    >
      <LineChart data={data}>
        <Line type="monotone" dataKey="temperature" stroke="#8884d8" />
        <XAxis dataKey="time" hide />
        <YAxis />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );
}

export const mockWeatherData = {
  modeA: {
    location: {
      cityName: "Singapore",
      country: "Singapore"
    },
    current: {
      temp: 28,
      feelsLike: 31,
      conditionText: "多云",
      humidity: 80,
      windScale: "3级",
      aqi: 42,
      aqiLevel: "优",
      updatedAt: "2026-08-12T08:00:00+08:00"
    },
    todayOverview: {
      tempMax: 32,
      tempMin: 26,
      pop: 60,
      dressingAdvice: "天气较热，建议穿短袖或薄款T恤。",
      umbrellaAdvice: "降水概率较高，建议随身携带雨具。"
    },
    alerts: [
      {
        id: "WARN-01",
        title: "雷暴蓝色预警",
        description: "预计未来 3 小时内局部地区将出现强雷雨及短时大风。"
      }
    ]
  },
  modeB: {
    location: {
      cityName: "Singapore",
      country: "Singapore"
    },
    current: {
      temp: 27,
      feelsLike: 30,
      conditionText: "多云",
      updatedAt: "2026-08-12T04:00:00+08:00"
    },
    todayOverview: {
      tempMax: 32,
      tempMin: 26,
      pop: 40
    }
  }
};

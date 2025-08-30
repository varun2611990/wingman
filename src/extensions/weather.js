// Weather Extension for Wingman Launcher
module.exports = {
  name: 'Weather',
  command: 'weather',
  description: 'Get current weather information',
  type: 'extension',
  
  async run(args = []) {
    // This is a demo implementation
    // In a real scenario, you'd integrate with a weather API like OpenWeatherMap
    
    const location = args.length > 0 ? args.join(' ') : 'Your Location';
    
    // Mock weather data
    const weatherData = {
      location: location,
      temperature: '22°C',
      condition: 'Partly Cloudy',
      humidity: '65%',
      windSpeed: '15 km/h',
      icon: '⛅'
    };
    
    return {
      success: true,
      message: `Weather for ${location}`,
      data: weatherData,
      formatted: this.formatWeather(weatherData)
    };
  },
  
  formatWeather(data) {
    return `
🌍 ${data.location}
${data.icon} ${data.condition}
🌡️ Temperature: ${data.temperature}
💧 Humidity: ${data.humidity}
💨 Wind: ${data.windSpeed}
    `.trim();
  }
};
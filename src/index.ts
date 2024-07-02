import { Hono } from 'hono'
import axios from 'axios';
import ip from 'ip'

const app = new Hono()

const API_KEY = "842df8b821026d6d922d6cf066bb12e8"


app.get('/api/hello', async (c) => {
  const visitorName = c.req.query("visitor_name")
  // const x = ip.address()

  const city2 = await axios.get('https://api.ipdata.co/?api-key=733b7a2ad7720774e589c8701fccfe4f9f0f39a1363dae1650c53412')

  const result = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${city2.data.city}&limit=5&appid=${API_KEY}`)

  const res2 = result.data
  
  const lat = res2[0]["lat"]
  const lon = res2[0]["lon"]

  const weather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=842df8b821026d6d922d6cf066bb12e8`)

  const res3 = weather.data
  const temp = res3.main.temp

  const response = {
    clientIp: city2.data["ip"],
    location: city2.data.city,
    greeting: `Hello ${visitorName}!, the temperature is ${Math.round(parseInt(temp) - 273.15)} degrees Celcius in ${city2.data.city}`,
  }

  return c.json(response)
})

export default app

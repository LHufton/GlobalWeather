const axios = require('axios')

exports.getWeather = async (req, res) => {
  const city = req.params.city

  try {
    const response = await axios.get(`VPL655SPAGB8XA9Q9E4JHGJ77?city=${city}`)
    res.json(response.data)
  } catch (err) {
    res.status(400).send(err)
  }
}

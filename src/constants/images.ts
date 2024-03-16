type WeatherImages = {
    [key: string]: any
};
const weatherImages : WeatherImages = {
    'clear sky': require('../assets/images/sun.png'),
    'few clouds': require('../assets/images/partlycloudy.png'),
    'scattered clouds': require('../assets/images/cloud.png'),
    'broken clouds': require('../assets/images/cloud.png'),
    'shower rain': require('../assets/images/moderaterain.png'),
    'rain': require('../assets/images/moderaterain.png'),
    'thunderstorm': require('../assets/images/moderaterain.png'),
    'snow': require('../assets/images/moderaterain.png'),
    'mist': require('../assets/images/mist.png'),
    'other': require('../assets/images/moderaterain.png'),
    'overcast clouds': require('../assets/images/overcastClouds.png')

};

export default weatherImages;
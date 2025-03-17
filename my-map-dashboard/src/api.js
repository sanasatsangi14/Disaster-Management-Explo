import axios from "axios";

const fetchData = async (lat, lon) => {
  try {
    console.log(`Fetching data for lat: ${lat}, lon: ${lon}`);

    // ✅ OpenStreetMap Overpass API for Population Density
    const popDensityResponse = await axios.get(
      `https://overpass-api.de/api/interpreter?data=[out:json];node(around:5000,${lat},${lon})["population"];out;`
    );
    console.log("Population API Response:", popDensityResponse.data);

    const popDensity =
      popDensityResponse.data.elements?.length > 0
        ? popDensityResponse.data.elements[0].tags.population
        : "Unknown";

    // ✅ Try NASA GPM API with CORS Proxy
    let waterLevel;
    try {
      const waterLevelResponse = await axios.get(
        `https://corsproxy.io/?https://gpm.nasa.gov/api/v1/precipitation?lat=${lat}&lon=${lon}`
      );
      waterLevel = waterLevelResponse.data?.water_level || "Unknown";
    } catch (error) {
      console.warn("NASA API failed, switching to Open-Meteo.");
      
      // ✅ If NASA API fails, use Open-Meteo Flood API
      const fallbackResponse = await axios.get(
        `https://api.open-meteo.com/v1/flood?latitude=${lat}&longitude=${lon}`
      );
      waterLevel = fallbackResponse.data?.water_level || "Unknown";
    }

    return {
      populationDensity: popDensity,
      waterLevel: waterLevel,
    };
  } catch (error) {
    console.error("Error fetching data", error);
    return { populationDensity: "N/A", waterLevel: "N/A" };
  }
};

export default fetchData;

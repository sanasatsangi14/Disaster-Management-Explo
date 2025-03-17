const Sidebar = ({ data }) => {
  return (
    <div className="sidebar">
      <h2>📌 Selected Area Data</h2>
      {data ? (
        <>
          <p>📍 <strong>Population Density:</strong> {data.populationDensity}</p>
          <p>💧 <strong>Water Level:</strong> {data.waterLevel}</p>
        </>
      ) : (
        <p>🎯 Select an area on the map to see data.</p>
      )}
    </div>
  );
};

export default Sidebar;


import { useEffect } from "react";
import jsVectorMap from "jsvectormap";
import "jsvectormap/dist/maps/world.js";   // ✅ THIS IS REQUIRED
import "jsvectormap/dist/jsvectormap.css";

const WorldMap = () => {
  useEffect(() => {
    const map = new jsVectorMap({
      selector: "#world-map",
      map: "world",
    });

    return () => map.destroy(); // ✅ cleanup
  }, []);

  return <div id="world-map" style={{ height: "220px" }} />;
};

export default WorldMap;

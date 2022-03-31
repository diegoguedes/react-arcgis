import { useState, useEffect } from "react";
import { loadModules } from "esri-loader";

const BermudaTriangle = (props) => {
  console.log("props", props);
  const [graphic, setGraphic] = useState(null);
  useEffect(() => {
    loadModules(["esri/Graphic"])
      .then(([Graphic]) => {
        // Create a polygon geometry
        const polygon = {
          type: "polygon", // autocasts as new Polygon()
          rings: [
            [-64.78, 32.3],
            [-66.07, 18.45],
            [-80.21, 25.78],
            [-64.78, 32.3],
          ],
        };

        const point1 = {
          type: "point", // autocasts as new
          longitude: -64.98,
          latitude: 32.3,
        };

        const simplePoint = {
          type: "simple-marker",
          color: [0, 0, 0], // Orange
          outline: {
            color: [255, 255, 255], // White
            width: 1,
          },
        };

        // Create a symbol for rendering the graphic
        const fillSymbol = {
          type: "simple-fill", // autocasts as new SimpleFillSymbol()
          color: [227, 139, 79, 0.8],
          outline: {
            // autocasts as new SimpleLineSymbol()
            color: [255, 255, 255],
            width: 1,
          },
        };

        // Add the geometry and symbol to a new graphic
        const graphic = new Graphic({
          geometry: polygon,
          symbol: fillSymbol,
        });
        const graphic2 = new Graphic({
          geometry: point1,
          symbol: simplePoint,
        });

        setGraphic(graphic);
        props.view.graphics.add(graphic);
        props.view.graphics.add(graphic2);
      })
      .catch((err) => console.error(err));

    return function cleanup() {
      props.view.graphics.remove(graphic);
    };
  }, [graphic, props]);

  return null;
};

export default BermudaTriangle;

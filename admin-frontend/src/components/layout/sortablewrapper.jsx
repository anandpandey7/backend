import { useEffect, useRef } from "react";
import Sortable from "sortablejs";

const SortableWrapper = ({ children }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      new Sortable(ref.current, {
        group: "shared",
        handle: ".card-header",
      });
    }
  }, []);

  return <div ref={ref}>{children}</div>;
};

export default SortableWrapper;

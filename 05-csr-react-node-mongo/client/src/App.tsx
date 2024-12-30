import { useEffect, useState } from "react";
import Tours from "./types/types";

const App: React.FC = () => {
  const [tours, setTours] = useState<Tours[]>([]);
  console.log(tours);
  useEffect(() => {
    fetch("http://localhost:5001/api/v1/tours")
      .then((res) => res.json())
      .then((data) => setTours(data.data.tours))
      .catch((error) => console.log(error));
  }, []);

  return <h1 className="text-3xl font-bold underline">A voir...</h1>;
};

export default App;

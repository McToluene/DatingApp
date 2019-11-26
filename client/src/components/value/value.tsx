import React, { useState, useEffect } from "react";
import axios from "axios";

interface IValue {
  id: string;
  name: string;
}

const Value: React.FC = () => {
  const [values, setValues] = useState<IValue[]>([]);
  // const [data, setDate] = useState({ values: [IValue] });

  useEffect(() => {
    const fetchData = async () => {
      const res: any = await axios
        .get("http://localhost:5000/weatherForecast/")
        .catch(err => console.log(err));
      if (res) {
        setValues(res.data);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <ol>
        {values.map(value => (
          <li key={value.id}>{value.name}</li>
        ))}
      </ol>
    </div>
  );
};

export default Value;

import React, {useState} from "react";

interface Item {
  id: number;
  name: string;
  image: string;
}

const dummyData: Item[] = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: `Creature ${i + 1}`,
  image: `https://via.placeholder.com/150?text=Creature+${i + 1}`,
}));

const Operator: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);

  React.useEffect(() => {

    //TODO: FETCH DATA HERE
    setItems(dummyData);

  }, []);

  return (
    <div className="h-full w-full p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Operator Selection</h2>
      <div
      className="max-h-[500px] overflow-y-auto rounded-lg bg-[#C7B996] p-2"
      style={{ scrollbarGutter: "stable" }} 
      >
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-1">
        {items.map((item) => (
        <div
          key={item.id}
          className=" overflow-hidden shadow hover:shadow-lg transition-shadow duration-300 cursor-pointer bg-white"
        >
          <img
          src={item.image}
          alt={item.name}
          className="w-full h-50 object-cover"
          />
          <div className="p-2 text-center text-sm font-medium">{item.name}</div>
        </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default Operator;
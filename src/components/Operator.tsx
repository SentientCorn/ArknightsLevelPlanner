import React, {useState} from "react";
import supabase from "../config/supabase";

interface Item {
  id: string;
  name: string;
  image_url: string;
  class_id: number;
  rarity: number;
}

interface OperatorProps {
  selected: Item | null;
  onSelect: (item: Item) => void;
}

const targetIds = ["49f22d5a-1ad9-43d5-a0a6-e8ed941a6599", "4579010a-d00e-48dd-b854-ad2171cd8eef"]; // Saria and SilverAsh

// const dummyData: Item[] = Array.from({ length: 20 }, (_, i) => ({
//   id: (i + 1).toString(),
//   name: `Operator ${i + 1}`,
//   image_url: `https://via.placeholder.com/150?text=Operator+${i + 1}`,
//   class_id: Math.floor(Math.random() * 5) + 1,
//   rarity: Math.floor(Math.random() * 6) + 1,
// }));

const Operator: React.FC<OperatorProps> = ({ selected, onSelect }) => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  React.useEffect(() => {

    const fetchOps = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('operators')
          .select('*')
          .in("id", targetIds)
          .order('id', { ascending: true });

        if (error) {
          throw error;
        }

        if (data) {
          setItems(data);
        }
      } catch (error) {
        console.error("Error fetching operators:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchOps();

  }, []);

  return (
    loading ? (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-200"></div>
      </div>
    ) : (
    <div className="h-full w-full p-4">
      <h2 className="text-2xl font-bold mb-4 text-center text-white">Operator Selection</h2>
      <div
      className="max-h-[500px] overflow-y-auto rounded-lg p-2 bg-[var(--biru1)] shadow-sm"
      style={{ scrollbarGutter: "stable" }} 
      >
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-1.5">
        {items.map((item) => (
        <div
          key={item.id}
          onClick={() => onSelect(item)}
          className={`overflow-hidden justify-center items-center my-2 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 mx-1.5 cursor-pointer ${selected?.id === item.id ? "ring-4 ring-white" : ""} bg-[var(--biru2)]`}
        >

          <img
          src={item.image_url}
          alt={item.name}
          className="w-full h-40 object-cover mx-2 mt-2 overflow-hidden"
          />
          <div className="p-2 text-center text-sm font-medium">{item.name}</div>
        </div>
        ))}
      </div>
      </div>
    </div>
    )
  );
};

export default Operator;
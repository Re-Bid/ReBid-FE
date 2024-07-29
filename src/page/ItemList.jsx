import ListCard from "../components/ListCard.jsx";

export default function ItemList() {
  const arr = [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  ];
  return (
    <div className="flex justify-center items-center">
      <div className="grid grid-cols-4">
        {arr.map((e, i) => {
          return (
            <div className="my-10 mx-2">
              <ListCard />
            </div>
          );
        })}
      </div>
    </div>
  );
}

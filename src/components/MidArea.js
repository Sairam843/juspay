import React from "react";
import { useAppContext } from "./AppContext";

const MidArea = () => {
  const { cats, setCats, activeCat, setActiveCat } = useAppContext();

  const handleDrop = (event) => {
    event.preventDefault();
    const data = event.dataTransfer.getData("text/plain");
    setCats((prevCats) => {
      return prevCats.map((cat) => {
        if (cat.id === activeCat) {
          return { ...cat, instructions: [...cat.instructions, data] };
        }
        return cat;
      });
    });
  };

  const allowDrop = (event) => {
    event.preventDefault();
  };

  const deleteInstruction = (index) => {
    setCats((prevCats) => {
      return prevCats.map((cat) => {
        if (cat.id === activeCat) {
          const updatedInstructions = cat.instructions.filter(
            (_, idx) => idx !== index
          );
          return { ...cat, instructions: updatedInstructions };
        }
        return cat;
      });
    });
  };
  return (
    <div className="flex-1 h-full overflow-auto flex">
      {/* Left side - Cat list */}
      <div className="w-1/3 p-4 bg-gray-100">
        <h2 className="text-xl font-bold mb-4">Cats</h2>
        {cats.map((cat) => (
          <div
            key={cat.id}
            className={`p-3 mb-2 rounded-lg cursor-pointer ${
              activeCat === cat.id ? "bg-blue-200" : "bg-white"
            }`}
            onClick={() => setActiveCat(cat.id)}
          >
            Cat {cat.id}
          </div>
        ))}
      </div>

      {/* Right side - Instructions drop area */}
      <div className="w-2/3 p-4">
        <h2 className="text-xl font-bold mb-4">
          Instructions for Cat {activeCat}
        </h2>
        <div
          className="border-2 border-dashed border-gray-300 p-4 min-h-[200px] rounded-lg"
          onDrop={handleDrop}
          onDragOver={allowDrop}
          style={{ cursor: "pointer" }}
        >
          {cats[activeCat - 1]?.instructions?.length > 0 ? (
            cats[activeCat - 1].instructions.map((instr, index) => (
              <div
                key={index}
                className="bg-white p-2 mb-2 rounded flex justify-between items-center"
              >
                <span>{instr}</span>
                <button
                  onClick={() => deleteInstruction(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  ❌
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500">Drop instructions here</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MidArea;

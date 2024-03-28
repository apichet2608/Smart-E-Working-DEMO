import React from "react";

function CardUI({ data }) {
  return (
    <div>
      {data && data.length > 0 ? (
        <div className="lg:flex lg:gap-2 lg:justify-start md:grid md:grid-cols-3 md:gap-2">
          {data.map((item) => (
            <div
              key={item.id}
              className=" w-full bg-base-100 shadow-xl Paper_Contents flex gap-2"
            >
              <div>
                <p className="font-bold text-nowrap">{item.value}</p>
                <p className="text-nowrap">{item.name}</p>
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default CardUI;

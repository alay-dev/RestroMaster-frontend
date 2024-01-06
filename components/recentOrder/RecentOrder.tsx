const RecentOrder = () => {
  return (
    <div className="flex-1 w-full p-4 bg-white rounded-2xl">
      <ul>
        <li className="flex items-center justify-between border-b py-2">
          <div className="flex gap-5">
            <img
              src="/images/mock/restaurant1.jpg"
              alt=""
              className="w-16 h-16 rounded-md overflow-hidden"
            />
            <div>
              <p className="text-gray-400 text-sm mb-1">Chicken bucket</p>
              <div className="bg-orange-100 text-orange-600 py-1 px-4 text-xs rounded-lg w-max">
                Home delivery
              </div>
            </div>
          </div>
          <p>₹ 299.00</p>
        </li>
        <li className="flex items-center justify-between border-b py-2">
          <div className="flex gap-5">
            <img
              src="/images/mock/restaurant1.jpg"
              alt=""
              className="w-16 h-16 rounded-md overflow-hidden"
            />
            <div>
              <p className="text-gray-400 text-sm mb-1">Chicken bucket</p>
              <div className="bg-orange-100 text-orange-600 py-1 px-4 text-xs rounded-lg w-max">
                Home delivery
              </div>
            </div>
          </div>
          <p>₹ 299.00</p>
        </li>
        <li className="flex items-center justify-between border-b py-2">
          <div className="flex gap-5">
            <img
              src="/images/mock/restaurant1.jpg"
              alt=""
              className="w-16 h-16 rounded-md overflow-hidden"
            />
            <div>
              <p className="text-gray-400 text-sm mb-1">Chicken bucket</p>
              <div className="bg-orange-100 text-orange-600 py-1 px-4 text-xs rounded-lg w-max">
                Home delivery
              </div>
            </div>
          </div>
          <p>₹ 299.00</p>
        </li>
      </ul>
    </div>
  );
};

export default RecentOrder;

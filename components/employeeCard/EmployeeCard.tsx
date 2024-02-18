const EmployeeCard = () => {
  return (
    <div className="w-full bg-white rounded-2xl">
      <ul className="p-4">
        <li className="flex items-center justify-between py-3 ">
          <div className="flex items-center gap-3 ">
            <img
              className="w-10 h-10 overflow-hidden rounded-full"
              src="https://github.com/shadcn.png"
            />
            <div>
              <p className=" text-sm leading-4">Adam smith</p>
              <p className="text-xs text-gray-400">Sales manger</p>
            </div>
          </div>
          <p className="text-sm text-gray-400">
            <strong className="text-black font-medium">35 hr</strong>/week
          </p>
        </li>
        <li className="flex items-center justify-between py-3">
          <div className="flex items-center gap-3 ">
            <img
              className="w-10 h-10 overflow-hidden rounded-full"
              src="https://github.com/shadcn.png"
            />
            <div>
              <p className="text-sm leading-4">Adam smith</p>
              <p className="text-xs text-gray-400">Sales manger</p>
            </div>
          </div>
          <p className="text-sm text-gray-400">
            <strong className="text-black font-medium">35 hr</strong>/week
          </p>
        </li>
        <li className="flex items-center justify-between py-3">
          <div className="flex items-center gap-3 ">
            <img
              className="w-10 h-10 overflow-hidden rounded-full"
              src="https://github.com/shadcn.png"
            />
            <div>
              <p className="text-sm">Adam smith</p>
              <p className="text-xs text-gray-400">Sales manger</p>
            </div>
          </div>
          <p className="text-sm text-gray-400">
            <strong className="text-black font-medium">35 hr</strong>/week
          </p>
        </li>
      </ul>
    </div>
  );
};

export default EmployeeCard;

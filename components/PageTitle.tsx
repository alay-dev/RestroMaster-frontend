export const PageTitle = ({ title }: PageTitleProps) => {
  return (
    <div className="relative w-max mb-6">
      <h1 className=" text-2xl font-light w-max">{title}</h1>
      <div className="w-2/3 h-[3px] bg-blue-400 rounded-lg"></div>
    </div>
  );
};

type PageTitleProps = {
  title: string;
};

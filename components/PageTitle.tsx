import Link from "next/link";
import { ReactElement } from "react";
import { AltArrowLeft as BackIcon } from "solar-icon-set";
import { Button } from "./ui/button";

export const PageTitle = ({ title, actions, backBtnLink }: PageTitleProps) => {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex gap-2 items-center  mb-6">
        {backBtnLink ? (
          <Link href={backBtnLink}>
            <Button
              size="icon"
              variant="ghost"
              className="rounded-full hover:bg-gray-200"
            >
              <BackIcon size={24} />
            </Button>
          </Link>
        ) : null}
        <div className="relative w-max">
          <h1 className=" text-xl font-light w-max">{title}</h1>
          <div className="w-2/3 h-[3px] bg-blue-400 rounded-lg"></div>
        </div>
      </div>

      {actions}
    </div>
  );
};

type PageTitleProps = {
  title: string;
  actions?: ReactElement;
  backBtnLink?: string;
};

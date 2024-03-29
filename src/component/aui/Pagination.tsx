import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { FC, Fragment } from "react";
import { classNames } from "./util";
interface Props {
  offset: number;
  limit: number;
  total: number;
  rows: number;
  onNext: () => void;
  onBack: () => void;
  onPageChange: (page: number) => void;
}

const Pagination: FC<Props> = ({
  offset,
  limit,
  total,
  rows,
  onNext,
  onBack,
  onPageChange,
}) => {
  const totalPage = (): number => Math.ceil(total / limit);
  // const currentPage = (): number => {
  //   if (offset > limit) {
  //     return Math.floor(offset / limit);
  //   } else {
  //     return 0;
  //   }
  // };
  return (
    <div className="flex items-center justify-between border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <div
          onClick={onBack}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </div>
        <div
          onClick={onNext}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </div>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            {rows > 0 ? (
              <Fragment>
                Showing <span className="font-medium">{offset + 1}</span> to{" "}
                <span className="font-medium">{offset + rows}</span> of{" "}
                <span className="font-medium">{total}</span> results
              </Fragment>
            ) : (
              <span className="font-medium">no record found!!</span>
            )}
          </p>
        </div>
        {rows > 0 && (
          <div>
            <nav
              className="isolate inline-flex -space-x-px rounded-md shadow-sm"
              aria-label="Pagination"
            >
              <div
                onClick={onBack}
                className="cursor-pointer relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </div>
              {Array.from(Array(totalPage())).map((_, index) => (
                <div
                  onClick={() => onPageChange(index + 1)}
                  aria-current="page"
                  className={classNames(
                    "cursor-pointer relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                  )}
                >
                  {index + 1}
                </div>
              ))}
              <div
                onClick={onNext}
                className="cursor-pointer relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </div>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export { Pagination };

import {
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { ChangeEvent, ReactNode, useMemo, useState } from 'react';
import { TableAction, TableColumn } from '.';
import { classNames } from '../../utils/helpers';
import { Input } from '../Input/Input';
import { ContentLoader } from '../Loader';
import { checkNestedKeys, getValue, rowsPerPageOptions } from './utils';

export default function PaginatedTable<T extends object>({
  columns,
  data,
  onRowClick,
  loadingData = false,
  actions,
  count,
  rowsPerPage,
  onChangeRowsPerPage,
  page,
  onChangePage
}: {
  columns: TableColumn[];
  data: T[];
  onRowClick?: (value: T) => void;
  actions?: TableAction<T>[];
  loadingData?: boolean;
  rowsPerPage: number;
  onChangeRowsPerPage: (value: number) => void;
  page: number;
  onChangePage: (value: number) => void;
  count: number;
}) {
  const [searchValue, setSearchValue] = useState('');

  const filteredData = useMemo(() => {
    return data.filter(item => {
      return checkNestedKeys(item, searchValue);
    });
  }, [data, searchValue]);

  const initRange = useMemo(() => rowsPerPage * page, [rowsPerPage, page]);
  const endRange = useMemo(
    () => page * rowsPerPage + rowsPerPage,
    [rowsPerPage, page]
  );
  const isLastPage = useMemo(() => endRange >= count, [endRange, count]);

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLSelectElement>) => {
    onChangeRowsPerPage(parseInt(event.target.value, 10));
    onChangePage(0);
  };

  if (loadingData) {
    return <ContentLoader />;
  }

  return (
    <div>
      {data.length !== 0 && (
        <div className="w-full flex justify-between items-center">
          <div className="flex gap-2 items-center text-sm">
            <span className="hidden sm:block">Show</span>{' '}
            <select
              className="bg-transparent w-16 dark:border-gray-800"
              value={rowsPerPage}
              onChange={handleChangeRowsPerPage}
            >
              {rowsPerPageOptions.map(item => (
                <option key={item}>{item}</option>
              ))}
            </select>{' '}
            <span className="hidden sm:block">rows</span>
          </div>
          <div>
            <Input
              placeholder="Search"
              id="search"
              type="search"
              onChange={e => setSearchValue(e.target.value)}
            />
          </div>
        </div>
      )}
      <div
        className={classNames(
          'overflow-x-auto w-full rounded-lg my-2 ',
          'shadow-lg border dark:border-none'
        )}
      >
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-900 dark:text-gray-400">
            <tr>
              {columns.map(column => (
                <th
                  key={column.header}
                  scope="col"
                  className={classNames(
                    column.align || 'text-start',
                    'px-6 py-3 '
                  )}
                >
                  {column.header}
                </th>
              ))}
              {actions?.map(item => (
                <th className="px-3 py-3 text-center" key={item.header}>
                  {item.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => {
              return (
                <tr
                  key={index}
                  className={classNames(
                    onRowClick
                      ? 'hover:bg-gray-100 dark:hover:bg-gray-900 cursor-pointer'
                      : '',
                    'bg-white border-b dark:bg-gray-800 dark:border-gray-700'
                    // disableElevation ? "last:border-b-0" : ""
                  )}
                  onClick={
                    onRowClick
                      ? e => {
                          onRowClick(item);
                          e.stopPropagation();
                        }
                      : undefined
                  }
                >
                  {columns.map((column, i) => {
                    const value =
                      column.key !== '' ? getValue(item, column.key) : item;
                    const nodeValue = (
                      column.convert ? column.convert(value) : value
                    ) as ReactNode;
                    const itemToRender: ReactNode =
                      typeof nodeValue === 'boolean' ? (
                        nodeValue ? (
                          <CheckIcon className="w-5 text-green-500" />
                        ) : (
                          <XMarkIcon className="w-5 text-red-500" />
                        )
                      ) : (
                        nodeValue
                      );
                    return (
                      <td
                        key={i}
                        className={classNames(
                          column.align || 'text-start',
                          'px-6 py-4 text-gray-800 dark:text-gray-300'
                        )}
                      >
                        {column.onClick ? (
                          <button
                            onClick={() => {
                              column.onClick && column.onClick(value);
                            }}
                            className={classNames(
                              'text-primary text-start dark:text-primary-light underline cursor-pointer'
                            )}
                          >
                            {itemToRender}
                          </button>
                        ) : (
                          <>{itemToRender}</>
                        )}
                      </td>
                    );
                  })}
                  {actions?.map(action => (
                    <td
                      className="px-6 py-4 text-center z-20"
                      key={action.header}
                    >
                      <button
                        className={classNames(
                          onRowClick
                            ? 'hover:bg-gray-200'
                            : 'hover:bg-gray-100',
                          ' dark:hover:bg-gray-950 p-2 rounded-full'
                        )}
                        onClick={e => {
                          action.onClick(item);
                          e.stopPropagation();
                        }}
                      >
                        {action.icon}
                      </button>
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
        {filteredData.length === 0 && (
          <div className="flex justify-center p-4 bg-white dark:bg-slate-800">
            No data to show
          </div>
        )}
      </div>
      {data.length !== 0 && (
        <div className="w-full flex justify-between items-center">
          <p className="text-sm">
            Showing {count === 0 ? 0 : initRange + 1} to{' '}
            {endRange > count ? count : endRange} of {count}
          </p>
          <div className="flex">
            <button
              className="hover:bg-gray-200 disabled:hover:bg-transparent dark:hover:bg-slate-800 rounded-full p-2 disabled:text-gray-400 flex justify-center items-center"
              disabled={page === 0}
              onClick={() => {
                onChangePage(page - 1);
              }}
            >
              <ChevronLeftIcon
                className={classNames(
                  'w-5',
                  page === 0
                    ? 'text-gray-400 dark:text-gray-400'
                    : 'text-black dark:text-gray-300'
                )}
              />
            </button>
            <div className="px-2 py-1 text-sm disabled:text-gray-500 flex justify-center items-center">
              Page {data.length === 0 ? 0 : page + 1} of{' '}
              {Math.ceil(count / rowsPerPage)}
            </div>
            <button
              className="hover:bg-gray-200 disabled:hover:bg-transparent dark:hover:bg-slate-800 rounded-full p-2 disabled:text-gray-400 flex justify-center items-center"
              disabled={isLastPage}
              onClick={() => {
                onChangePage(page + 1);
              }}
            >
              <ChevronRightIcon
                className={classNames(
                  'w-5',
                  isLastPage
                    ? 'text-gray-400 '
                    : 'text-black dark:text-gray-300'
                )}
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

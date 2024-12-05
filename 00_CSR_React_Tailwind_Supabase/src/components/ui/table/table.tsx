// Libraries
import React, {
  createContext,
  useContext,
  ReactNode,
  CSSProperties,
} from 'react';

// Components
import { Empty } from '@/components/ui/empty';

// 1) Create the context with an undefined initial value

// Define the context type
interface TableContextType {
  columns: string;
}
const TableContext = createContext<TableContextType | undefined>(undefined);

// 2) Parent Component

// Define the props for the Table component
interface TableProps {
  columns: string;
  children: ReactNode;
}
export const Table = ({ columns, children }: TableProps) => {
  return (
    <TableContext.Provider value={{ columns }}>
      <div
        className="rounded-md border border-color-grey-200 bg-color-grey-0 text-[1.4rem]"
        role="table"
      >
        {children}
      </div>
    </TableContext.Provider>
  );
};

// 3) Child Components

// Define the props for the Header component
interface HeaderProps {
  children: ReactNode;
}

function Header({ children }: HeaderProps) {
  const context = useContext(TableContext);

  if (!context) {
    throw new Error('Header must be used within a Table');
  }

  const { columns } = context;

  return (
    <header
      className="grid items-center gap-x-3 border-b border-color-grey-100 bg-color-grey-50 p-2 font-semibold uppercase tracking-wide text-color-grey-600"
      style={{ gridTemplateColumns: columns } as CSSProperties}
      role="row"
    >
      {children}
    </header>
  );
}

// Define the props for the Row component
interface RowProps {
  children: ReactNode;
}

function Row({ children }: RowProps) {
  const context = useContext(TableContext);

  if (!context) {
    throw new Error('Row must be used within a Table');
  }

  const { columns } = context;

  return (
    <div
      className="grid items-center gap-x-3 border-b border-color-grey-100 p-2 last:border-0"
      style={{ gridTemplateColumns: columns } as CSSProperties}
      role="row"
    >
      {children}
    </div>
  );
}

// Define the props for the Body component
interface BodyProps<T> {
  data: T[];
  render: (item: T) => ReactNode;
}

function Body<T>({ data, render }: BodyProps<T>) {
  if (!data.length) {
    return <Empty resource="data">No data to show at the moment</Empty>;
  }

  return <section className="my-1">{data.map(render)}</section>;
}

// 4) Attach subcomponents to Table
Table.Header = Header;
Table.Body = Body;
Table.Row = Row;

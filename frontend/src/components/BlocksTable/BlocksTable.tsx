import React from "react";
import Table from "../Table/Table";
import styled from "styled-components";
import { Block } from "../../types/Block";

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`;

interface Props {
  blocks: Block[];
}

const BlocksTable = React.memo((props: Props) => {
  const { blocks } = props;

  const blockKeys = Object.keys(blocks[0]);

  const columns = React.useMemo(
    () => [
      {
        Header: "Latest Blocks",
        columns: blockKeys.map((key) => ({
          Header: key,
          accessor: key,
        })),
      },
    ],
    []
  );

  return (
    <Styles>
      <Table columns={columns} data={blocks} />
    </Styles>
  );
});

export default BlocksTable;

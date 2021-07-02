import BlocksTable from "../../components/BlocksTable/BlocksTable";
import React, { useCallback, useEffect, useState } from "react";
import { useHttp } from "../../hooks/useHttp";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import ErrorModal from "../../components/ErrorModal/ErrorModal";
import { Block } from "../../types/Block";
import Pagination from "../../components/Pagination/Pagination";
import classes from "./Home.module.css";
import Input from "../../components/Input/Input";

const Home = () => {
  const [limit, setLimit] = useState(5);
  const [numberOfPages, setNumberOfPages] = useState(1);
  const { loading, sendRequest } = useHttp();
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState<undefined | string>();
  const [timestamp, setTimestamp] = useState(Date.now());

  const getAllBlocks = useCallback(async () => {
    try {
      const { data, numberOfPages } = await sendRequest(
        "get",
        `/api/v1/blocks?timestamp=${timestamp}&page=${page}&limit=${limit}`
      );
      setBlocks(data);
      setNumberOfPages(numberOfPages);
    } catch (errorMessage) {
      setError(errorMessage);
    }
  }, [page, limit, sendRequest, timestamp]);

  useEffect(() => {
    getAllBlocks();
  }, [getAllBlocks]);

  const pageHandler = function (pageToGo: number) {
    setPage(pageToGo);
  };

  const onLimitChange = (limit: number) => {
    setLimit(limit);
  };

  const onTimestampChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (e.target.value.length > 0) {
      e.persist();
      setTimeout(() => {
        setTimestamp(parseInt(value));
      }, 200);
    }
  };

  return (
    <>
      <h2 className={classes.heading}>Latest Blocks</h2>
      {error && (
        <ErrorModal removeHandler={() => setError(undefined)}>
          {error}
        </ErrorModal>
      )}
      <div className={classes.timestampContainer}>
        Timestamp:
        <Input
          placeholder="Timestamp"
          value={timestamp.toString()}
          onChange={onTimestampChange}
        />
      </div>
      {loading ? (
        <LoadingSpinner />
      ) : blocks.length > 0 ? (
        <BlocksTable blocks={blocks} />
      ) : (
        <h2>
          No blocks found for the current page and limit and current timestamp (
          {timestamp}).
        </h2>
      )}

      <div className={classes.paginateAndLimitContainer}>
        <Pagination
          onLimitChange={onLimitChange}
          numberOfPages={numberOfPages}
          page={page}
          setPage={pageHandler}
        />
      </div>
    </>
  );
};

export default Home;

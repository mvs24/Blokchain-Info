import BlocksTable from "../../components/BlocksTable/BlocksTable";
import { useCallback, useEffect, useState } from "react";
import { useHttp } from "../../hooks/useHttp";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import ErrorModal from "../../components/ErrorModal/ErrorModal";
import { Block } from "../../types/Block";
import Limit from "../../components/Limit/Limit";
import Pagination from "../../components/Pagination/Pagination";
import classes from "./Home.module.css";

const Home = () => {
  const [limit, setLimit] = useState(10);
  const [numberOfPages, setNumberOfPages] = useState(1);
  const { loading, sendRequest } = useHttp();
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState<undefined | string>();

  const getAllBlocks = useCallback(async () => {
    try {
      const timestamp = Date.now();
      const { data, numberOfPages } = await sendRequest(
        "get",
        `/api/v1/blocks?timestamp=${timestamp}&page=${page}&limit=${limit}`
      );
      setBlocks(data);
      setNumberOfPages(numberOfPages);
    } catch (errorMessage) {
      setError(errorMessage);
    }
  }, [page, limit]);

  useEffect(() => {
    getAllBlocks();
  }, [getAllBlocks]);

  const pageHandler = function (pageToGo: number) {
    setPage(pageToGo);
  };

  const onLimitChange = (limit: number) => {
    setLimit(limit);
  };

  return (
    <>
      <h2>Latest Blocks</h2>
      {loading && <LoadingSpinner />}
      {error && (
        <ErrorModal removeHandler={() => setError(undefined)}>
          {error}
        </ErrorModal>
      )}
      {blocks.length > 0 && <BlocksTable blocks={blocks} />}
      <div className={classes.paginateAndLimitContainer}>
        <Pagination
          numberOfPages={numberOfPages}
          page={page}
          setPage={pageHandler}
        />
        <Limit onLimitChange={onLimitChange} />
      </div>
    </>
  );
};

export default Home;

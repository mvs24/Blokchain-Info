import Button from "../Button/Button";
import classes from "./Pagination.module.css";

interface Props {
  page: number;
  numberOfPages: number;
  setPage: (page: number) => void;
}

const Pagination = (props: Props) => {
  const { page, numberOfPages, setPage } = props;

  return (
    <>
      {
        <>
          {page !== 1 ? (
            <Button
              title={(page - 1).toString()}
              onClick={() => {
                setPage(page - 1);
              }}
            />
          ) : (
            <Button title={(page - 1).toString()} disabled={true} />
          )}
          <div className={classes.buttonsSpace}></div>
          {page < numberOfPages ? (
            <Button
              title={(page + 1).toString()}
              onClick={() => {
                setPage(page + 1);
              }}
            />
          ) : (
            <Button title={(page + 1).toString()} disabled={true} />
          )}
        </>
      }
    </>
  );
};

export default Pagination;

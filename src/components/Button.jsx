const Button = ({ onClickLoadMore }) => {
  return (
    <button onClick={onClickLoadMore} type="button" className="Button">
      Load more
    </button>
  );
};

export default Button;

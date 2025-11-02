import css from "./ErrorMessage.module.css";

function Error({ error }: { error: Error }) {
  return (
    <p className={css.text}>Could not fetch note details. {error.message}</p>
  );
}
export default Error;

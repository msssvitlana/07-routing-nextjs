'use client';
type Props = {
    error: Error;
    reset: () => void;
 }
 
const Error = ({ error, reset}: Props) => {
    return (
        <div>
            <p>Could not fetch the note. {error.message}</p>

            <button onClick={reset}>Спробувати знову</button>
         </div>
     )
}
export default Error;
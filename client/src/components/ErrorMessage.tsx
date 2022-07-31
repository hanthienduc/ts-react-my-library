type ErrorMessageProps = {
    errorMessage: string
}
export function ErrorMessage({ errorMessage }: ErrorMessageProps) {
    return (
        <div className="error-message">{errorMessage} </div>
    )
}
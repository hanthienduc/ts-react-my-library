import { useAddEditBook } from "../../hooks/useAddEditBook";
import { FormInputs } from "./FormInputs";
export function AddNewBook() {

    const { handleAddBook,
        handleInputChange,
        book,
        handleSelect,
        authors,
        uploadImage,
        image,
        loading,
        handleAreaChange } = useAddEditBook()

    return (
        <FormInputs formTitle="Add Book" submitBtnTitle="Create" isAddBook={true} />
    )
}
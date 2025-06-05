import { Dispatch, SetStateAction } from "react";

type Proptypes = {
  uploadedImage: File | null;
  name: string;
  setUploadedImage: Dispatch<SetStateAction<File | null>>;
};
const InputFile = (porps: Proptypes) => {
  const { uploadedImage, setUploadedImage, name } = porps;
  return (
    <div className="bg-gray-300 p-2 rounded-sm ">
      <label className="cursor-pointer text-sm text-center py-2" htmlFor={name}>
        {uploadedImage?.name ? (
          <p>{uploadedImage?.name}</p>
        ) : (
          <>
            <p>
              Upload a new file, Larger Image will Be resizied automatically
            </p>
            <p>
              Maximum Upload size is <b>5MB</b>
            </p>
          </>
        )}
        <input
          className="hidden"
          name={name}
          type="file"
          id={name}
          onChange={(e: any) => {
            e.preventDefault();
            setUploadedImage(e.target.files[0]);
          }}
        />
      </label>
    </div>
  );
};

export default InputFile;

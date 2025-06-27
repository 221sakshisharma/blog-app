import { Controller } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";

const RTE = ({ name, control, defaultValue, rules }) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={rules}
      render={({ field: { onChange, value } }) => (
        <Editor
            apiKey="maru59x3ywybhl2jvj2e9m3mc5kjxa793u6x64bfx3wvihll" // Replace with your TinyMCE API key
          value={value}
          onEditorChange={onChange}
          init={{
            height: 300,
            menubar: false,
            statusbar: false,
            plugins: [
              'advlist autolink lists link image charmap print preview anchor',
              'searchreplace visualblocks code fullscreen',
              'insertdatetime media table paste code help wordcount'
            ],
            toolbar:
              'undo redo | formatselect | bold italic backcolor | \
              alignleft aligncenter alignright alignjustify | \
              bullist numlist outdent indent | removeformat | help'
          }}
        />
      )}
    />
  );
};

export default RTE;

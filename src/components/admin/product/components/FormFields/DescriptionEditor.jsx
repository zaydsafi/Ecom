import JoditEditor from "jodit-react";

const DescriptionEditor = ({ editor, content, setContent, config }) => (
  <div className="mb-3">
    <label className="form-label">Description</label>
    <JoditEditor
      ref={editor}
      value={content}
      config={config}
      onBlur={(value) => setContent(value)}
    />
  </div>
);

export default DescriptionEditor;

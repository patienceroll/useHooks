import React, { useRef } from "react";

export default function useSpliceFile() {
  const Buffer = useRef(new ArrayBuffer(1024 * 1024));
  const View = useRef(new DataView(Buffer.current))
  return (
    <div>
      <input
        type="file"
        onChange={(event) => {
          if (event.target.files) {
            const file = event.target.files.item(0) as File
            file.stream().getReader().read()
            
          }
        }}
      />
    </div>
  );
}

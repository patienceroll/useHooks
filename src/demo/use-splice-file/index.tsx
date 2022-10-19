import React, { useState } from "react";

function* createContext(file: File, sliceSize: number) {
  let index = 1;
  const fileSize = file.size;
  const length = Math.ceil(fileSize / sliceSize);
  while (index <= length) {
    yield (function ($index: number) {
      return () =>
        file.slice(
          ($index - 1) * sliceSize,
          $index === length ? file.size : $index * sliceSize
        );
    })(index);
    index += 1;
  }
}

export default function useSpliceFile() {
  const [slicedArray, setSlicedArray] = useState<(() => Blob)[]>([]);
  return (
    <div>
      <input
        type="file"
        onChange={(event) => {
          if (event.target.files && event.target.files.item(0)) {
            const file = event.target.files.item(0) as File;
            setSlicedArray(Array.from(createContext(file, 1024 * 1024)));
          }
        }}
      />
      <h2>分片结果</h2>
      {slicedArray.map((item, index) => {
        const blob = item();
        console.log(blob);
        return (
          <div key={index + Math.random()}>
            {`${index + 1}: { size: ${blob.size}, type: ${blob.type} }`}
          </div>
        );
      })}
    </div>
  );
}

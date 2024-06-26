import React from "react";
import { Buttons } from "./Button";
import styles from "../../styles/Components.module.scss";
import papa from "papaparse";
import { parseData, stringifyData } from "../../utils/parseData.ts";
import { FiTrash, FiUpload } from "react-icons/fi";

interface UploadDatasetButtonProps {
  onUpload: (dataset: string) => void;
}

export function UploadDatasetButton(props: UploadDatasetButtonProps) {
  const inputFileRef = React.useRef<HTMLInputElement>(null);
  const handleUploadFileClick = React.useCallback(() => {
    inputFileRef.current?.click?.();
  }, []);
  const handleUploadFile = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      if (e.target) {
        const inputFile = (e.target as HTMLInputElement).files?.[0];
        const reader = new FileReader();

        reader.onload = function (event) {
          const text = event?.target?.result as string;
          if (text) {
            const data = parseData(text);
            props.onUpload?.(stringifyData(data));
          }
        };

        if (inputFile) reader.readAsText(inputFile);
      }
    },
    [props.onUpload]
  );

  return (
    <>
      <button
        className="px-5 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none "
        onClick={handleUploadFileClick}
      >
        Upload &nbsp;
      </button>
      <input
        ref={inputFileRef}
        hidden
        type="file"
        onChange={handleUploadFile}
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
      />
    </>
  );
}

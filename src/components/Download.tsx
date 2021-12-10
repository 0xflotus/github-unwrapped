import React, { useState } from "react";

type RenderResponse = {
  renderId: string;
  bucketName: string;
};

type ProgressResponse = {
  overallProgress: number;
  outputFile: string | null;
};

const Download: React.FC<{
  username: string;
}> = ({ username }) => {
  const [downloading, setDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const renderVideo = async () => {
    const body = {
      username,
    };
    setDownloading(true);
    const response = await fetch("/api/render", {
      method: "POST",
      body: JSON.stringify(body),
    });
    const responseBody = (await response.json()) as RenderResponse;
    const intervalId = setInterval(async () => {
      const progress = await fetch("/api/progress", {
        method: "POST",
        body: JSON.stringify(responseBody),
      });
      const progressJson = (await progress.json()) as ProgressResponse;
      setDownloadProgress(Math.ceil(progressJson.overallProgress * 100));
      if (progressJson.overallProgress === 1) {
        window.clearInterval(intervalId);
        window.location.assign(progressJson.outputFile);
      }
    }, 1000);
  };

  return (
    <div>
      <button type="button" onClick={renderVideo}>
        Download
      </button>
      {downloading && <div>{downloadProgress}%</div>}
    </div>
  );
};

export default Download;

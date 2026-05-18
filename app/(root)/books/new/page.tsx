import UploadForm from "@/components/UploadForm";
import React from "react";

const page = () => {
  return (
    <>
      <main className="wrapper container">
        <div className="mx-auto max-w-180 space-y-10">
          <section className="flex flex-col gap-5">
            <h1 className="page-title-xl">Add New Book</h1>
            <p className="text-gray-600 text-lg">Upload your book in PDF format and let our AI analyze it for you. Once processed, you can chat with the AI about your book`s content.</p>
          </section>

          <UploadForm/>
        </div>
      </main>
    </>
  );
};

export default page;

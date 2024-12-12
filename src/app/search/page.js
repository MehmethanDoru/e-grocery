"use client";

import { Suspense } from "react";
import SearchContent from "@/components/Search-Content";

const SearchPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchContent />
    </Suspense>
  );
};

export default SearchPage;

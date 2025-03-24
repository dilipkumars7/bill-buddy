"use client";
import React, { useEffect, useRef, useState } from 'react';
import SdkTable from '@/components/table';
import { getData } from '@/lib/http';
import { itemIcons, ItemsHeaderName } from "@/lib/itemIcons";

export default function ItemPage() {
  const [ItemData, setItemData] = useState<any[]>([]); // Ensure it's an array
  const [HeaderFormat, setHeaderFormat] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let paramData = { page: 1, limit: 10 };
        const result = await getData("item", paramData);
        setItemData(result.data || []); // Set data safely

        if (result.data && result.data.length > 0) {
          let HeaderList = Object.keys(result.data[0]);
          const headers = HeaderList.map((item) => ({
            HeaderKey: item,
            defaultWidth: item.length > 20 ? `${item.length * 15}` : "253.5",
            HeaderIcon: itemIcons[item],
            HeaderName: ItemsHeaderName[item]
          }));
          setHeaderFormat(headers);
          setLoading(false);
        }
      } 
      catch (error) {
        console.error("API call failed:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <h2>Item Page</h2>
      {loading ? <p>Loading data...</p> : <SdkTable TableHeader={HeaderFormat} TableData={ItemData} />}
    </>
  );
}

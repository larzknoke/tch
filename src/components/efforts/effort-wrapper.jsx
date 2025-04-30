import { Button } from "@chakra-ui/react";
import HeaderText from "../ui/header-text";
import Spinner from "../ui/loading";
import BallLoader from "../ui/loading-ball";
import EffortHeader from "./effort-header";
import EffortItem from "./effort-item";
import { ChevronDoubleRightIcon } from "@heroicons/react/16/solid";
import { useState, useEffect } from "react";

function EffortWrapper() {
  const [effortsData, setEffortsData] = useState(null);

  async function getEfforts() {
    try {
      // setLoading(true);
      const res = await fetch(`/api/efforts`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (res.status != 200) {
        // setLoading(false);
        // setInviteError(true);
      } else {
        const resData = await res.json();
        setEffortsData(resData);
        // setLoading(false);
      }
    } catch (error) {
      console.log("api fetch error");
      console.error("Err", error);
      // setInviteError(true);
    }
  }

  useEffect(() => {
    getEfforts();
  }, []);

  return (
    <div className=" relative w-full rounded-sm px-4 md:px-0">
      {/* <EffortHeader /> */}
      <HeaderText text="Arbeitseinsätze" />
      {!effortsData ? (
        <div className="flex justify-start relative items-center">
          <BallLoader />
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {effortsData &&
            effortsData.map((effort) => (
              <EffortItem key={effort.id} effort={effort} />
            ))}
        </div>
      )}
      {/* <BallLoader />
      <div className="flex flex-col gap-4">
        {effortsData &&
          effortsData.map((effort) => (
            <EffortItem key={effort.id} effort={effort} />
          ))}
      </div> */}
      <h3 className="text-tch-blue mt-5 flex items-center gap-1">
        Alle Arbeitseinsätze
        <ChevronDoubleRightIcon className="size-5" />
      </h3>
    </div>
  );
}

export default EffortWrapper;

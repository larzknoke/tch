import { Icon } from "@chakra-ui/react";
import { CheckIcon, XMarkIcon } from "@heroicons/react/20/solid";

export function dateFormatter(date, withTime = true) {
  if (!date) return "Datum: k.A.";
  if (!withTime) {
    return new Date(date).toLocaleString([], {
      dateStyle: "medium",
    });
  } else {
    return new Date(date).toLocaleString([], {
      dateStyle: "short",
      timeStyle: "short",
    });
  }
}

export function Checker(bool) {
  if (!bool) {
    return (
      <Icon size={"sm"} color="red.600">
        <XMarkIcon />
      </Icon>
    );
  } else {
    return (
      <Icon size={"sm"} color="green.500">
        <CheckIcon />
      </Icon>
    );
  }
}

export function verifiedWorker(workers) {
  if (workers.length > 0) {
    return workers.filter((worker) => worker.verified).length;
  } else {
    return 0;
  }
}

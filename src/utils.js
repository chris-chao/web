// @flow

import type { Element } from 'react';
import React from 'react';

type DurationSpec = {
  // The short suffix used when generating humanized time stamps.
  suffix: string,

  // The duration in seconds of this unit.
  duration: number,
};

const SECONDS: DurationSpec = {
  suffix: 's',
  duration: 1,
};

const MINUTES: DurationSpec = {
  suffix: 'm',
  duration: 60 * SECONDS.duration,
};

const HOURS: DurationSpec = {
  suffix: 'h',
  duration: 60 * MINUTES.duration,
};

const UNITS = [HOURS, MINUTES, SECONDS];

export const formatDuration = (num: number): string => {
  const totalSeconds = Math.round(num);

  const { output } = UNITS.reduce(
    ({ remainingDuration, output }, { duration: unitDuration }, index) => {
      if (remainingDuration >= unitDuration || output.length || index > 0) {
        const totalUnits = Math.floor(remainingDuration / unitDuration);
        remainingDuration -= totalUnits * unitDuration;

        const rawTotalUnits = String(totalUnits).padStart(2, '0');
        output.push(rawTotalUnits);
      }

      return { remainingDuration, output };
    },
    {
      remainingDuration: totalSeconds,
      output: [],
    }
  );

  return output.join(':');
};

export const join = <T>(input: T[], btwn: T): T[] =>
  input.reduce((acc, val, idx, arr) => {
    const addedVal = acc.concat(val);

    if (idx < arr.length - 1) {
      return addedVal.concat(btwn);
    }

    return addedVal;
  }, []);

export const unique = (elems: Element<any>[]) =>
  elems.map((e: Element<any>, i: number): Element<any> =>
    React.cloneElement(e, { key: i })
  );

export const last = <T>(arr: T[]): ?T => arr[arr.length - 1];

// Splits a collection of items into two buckets based on the return value
// of a predicate.
export const split = <T>(
  arr: T[],
  predicate: (T, number, T[]) => any
): { accepted: T[], failed: T[] } =>
  arr.reduce(
    ({ accepted, failed }, value, idx, arr) => {
      const result = predicate(value, idx, arr);
      if (result) {
        accepted = [...accepted, value];
      } else {
        failed = [...failed, value];
      }

      return { accepted, failed };
    },
    { accepted: [], failed: [] }
  );

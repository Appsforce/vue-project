export type Trigger = "data" | "one-time" | "time";

export interface Creator {
  id: number;
  name: string;
}

export interface Schedule {
  creator: Creator;
  interval: string;
  next_delivery: string;
  recipients: string[];
  title: string;
  trigger: Trigger;
}

export type DataByTrigger = { [key in Trigger]: Schedule[] }


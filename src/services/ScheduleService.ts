import type { Schedule } from "@/models/Schedule";
export class ScheduleService {
 static formatData (task: Schedule) {
    const newObj: Schedule | any  = {}
    newObj.recipients = task.recipients.map(recipient => recipient + ", ");
    newObj.interval = task.interval
    newObj.next_delivery = (new Date(task.next_delivery)).toString();
    newObj.creator = task.creator;
    newObj.title = task.title
    return newObj
  }
}
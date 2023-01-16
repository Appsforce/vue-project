import type { Schedule, DataByTrigger} from "@/models/Schedule";
import mockData from "../mock/mock-schedules.json";
import moment from "moment";

export class ScheduleService {
    static formatData (task: Schedule) {
        const newObj: Schedule | any  = {}
        newObj.recipients = task.recipients.map((recipient, index) => {
          if (index === task.recipients.length - 1) {
            return "#" + recipient 
          }
          else {
            return "#" + recipient + ", "
          }
        });
        newObj.interval = task.interval
        newObj.next_delivery = moment(task.next_delivery).fromNow()
        newObj.creator = task.creator;
        newObj.title = task.title
        return newObj
  }
}
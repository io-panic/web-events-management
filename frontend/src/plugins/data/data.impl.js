import { Events } from "@/plugins/data/events";
import { UtilsFunctions } from "@/plugins/utils";

export class DataFunctions {
  #serviceUrl = import.meta.env.VITE_URL_SERVICES_EVENTS;
  #events = null;

  retrieveEvents() {
    return new Promise((resolve, reject) => {
      UtilsFunctions.fetchJson({ url: this.getServiceUrl() })
        .then((dataJson) => {
          this.#events = Events.convertArrayOfDictToArrayOfObjects(dataJson);
          resolve(this.#events);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  addEvent(event) {
    // @TODO error management ... (per field, message, ...: details received from server...)
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: event.toJson()
    };

    return new Promise((resolve, reject) => {
      UtilsFunctions.fetchJson({ url: this.getServiceUrl(), options: requestOptions })
        .then((dataJson) => {
          resolve(dataJson);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  getServiceUrl() {
    return this.#serviceUrl;
  }
}

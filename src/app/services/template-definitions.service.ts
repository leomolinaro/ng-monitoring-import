import { TemplateGroup } from './../models/template-group';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TemplateDefinitionsService {

  constructor() { }

  get(): TemplateGroup[] {
    return [
      {
        label: "Ping",
        templates: [
          {
            label: "Basic",
            field: "pingBasic",
            macros: [
              { label: "Downtime", field: "pingBasicDowntime" },
              { label: "SLA", field: "pingBasicSLA" },
              { label: "Action 07-20 mon-fri" , field: "pingBasicActionWorkingHours" },
              { label: "Action night-weekend", field: "pingBasicActionRestHours" },
              { label: "Message", field: "pingBasicMessage" },
            ]
          }
        ]
      },
      {
        label: "Network Device",
        templates: [
          {
            label: "Basic",
            field: "networkDeviceBasic",
            macros: [
              { label: "SLA", field: "networkDeviceBasicSLA" },
              { label: "Action 07-20 mon-fri" , field: "networkDeviceBasicActionWorkingHours" },
              { label: "Action night-weekend", field: "networkDeviceBasicActionRestHours" },
              { label: "Message", field: "networkDeviceBasicMessage" },
            ]
          },
          {
            label: "Medium",
            field: "networkDeviceMedium",
            macros: [
              { label: "CPU max util", field: "networkDeviceMediumCPUMaxUtil" },
              { label: "CPU SLA", field: "networkDeviceMediumCPUSLA" },
              { label: "RAM max util", field: "networkDeviceMediumRAMMaxUtil" },
              { label: "RAM SLA", field: "networkDeviceMediumRAMSLA" },
              { label: "PSU SLA", field: "networkDeviceMediumPSUSLA" },
              { label: "Fan SLA", field: "networkDeviceMediumFanSLA" },
              { label: "Temperature SLA", field: "networkDeviceMediumTemperatureSLA" },
              { label: "Action night-weekend", field: "networkDeviceMediumActionRestHours" },
              { label: "Message", field: "networkDeviceMediumMessage" },
            ]
          },
          {
            label: "Interfaces",
            field: "networkDeviceInterfaces",
            macros: [
              { label: "SLA", field: "networkDeviceInterfacesSLA" },
              { label: "Action 07-20 mon-fri" , field: "networkDeviceInterfacesActionWorkingHours" },
              { label: "Action night-weekend", field: "networkDeviceInterfacesActionRestHours" },
              { label: "Message", field: "networkDeviceInterfacesMessage" },
            ]
          }
        ]
      }
    ]
  }

}

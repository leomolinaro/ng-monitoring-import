import { TemplateGroup } from './../models/template-group';
import { Injectable } from '@angular/core';
import { hostTypes as allHostTypes } from '../models/host';

@Injectable({
  providedIn: 'root'
})
export class TemplateDefinitionsService {

  constructor() { }

  private readonly downtimeMacro = { label: "Downtime" };
  private readonly slaMacro = { label: "SLA" };
  private readonly actionWorkingHoursMacro = { label: "Action 07-20 mon-fri" };
  private readonly actionRestHoursMacro = { label: "Action night-weekend" };
  private readonly messageMacro = { label: "Message" };

  get(): TemplateGroup[] {
    return [
      {
        label: "Ping",
        templates: [
          {

            label: "Basic",
            field: "pingBasic",
            macros: [
              { ...this.downtimeMacro, field: "pingBasicDowntime" },
              { ...this.slaMacro, field: "pingBasicSLA" },
              { ...this.actionWorkingHoursMacro, field: "pingBasicActionWorkingHours" },
              { ...this.actionRestHoursMacro, field: "pingBasicActionRestHours" },
              { ...this.messageMacro, field: "pingBasicMessage" },
            ],
            hostTypes: allHostTypes
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
              { ...this.slaMacro, field: "networkDeviceBasicSLA" },
              { ...this.actionWorkingHoursMacro, field: "networkDeviceBasicActionWorkingHours" },
              { ...this.actionRestHoursMacro, field: "networkDeviceBasicActionRestHours" },
              { ...this.messageMacro, field: "networkDeviceBasicMessage" },
            ],
            hostTypes: ["Switch", "AP", "Server"]
          },
          {
            label: "Medium",
            field: "networkDeviceMedium",
            macros: [
              { label: "CPU max util", field: "networkDeviceMediumCPUMaxUtil" },
              { ...this.slaMacro, label: "CPU SLA", field: "networkDeviceMediumCPUSLA" },
              { label: "RAM max util", field: "networkDeviceMediumRAMMaxUtil" },
              { ...this.slaMacro, label: "RAM SLA", field: "networkDeviceMediumRAMSLA" },
              { ...this.slaMacro, label: "PSU SLA", field: "networkDeviceMediumPSUSLA" },
              { ...this.slaMacro, label: "Fan SLA", field: "networkDeviceMediumFanSLA" },
              { ...this.slaMacro, label: "Temperature SLA", field: "networkDeviceMediumTemperatureSLA" },
              { ...this.actionRestHoursMacro, field: "networkDeviceMediumActionRestHours" },
              { ...this.messageMacro, field: "networkDeviceMediumMessage" },
            ],
            hostTypes: ["Server"]
          },
          {
            label: "Interfaces",
            field: "networkDeviceInterfaces",
            macros: [
              { ...this.slaMacro, field: "networkDeviceInterfacesSLA" },
              { ...this.actionWorkingHoursMacro, field: "networkDeviceInterfacesActionWorkingHours" },
              { ...this.actionRestHoursMacro, field: "networkDeviceInterfacesActionRestHours" },
              { ...this.messageMacro, field: "networkDeviceInterfacesMessage" },
            ],
            hostTypes: []
          },
          {
            label: "STP",
            field: "networkDeviceSTP",
            macros: [
              { ...this.slaMacro, field: "networkDeviceSTPSLA" },
              { ...this.actionWorkingHoursMacro, field: "networkDeviceSTPActionWorkingHours" },
              { ...this.actionRestHoursMacro, field: "networkDeviceSTPActionRestHours" },
              { ...this.messageMacro, field: "networkDeviceSTPMessage" },
            ],
            hostTypes: []
          }
        ]
      },
      {
        label: "Firewall",
        templates: [
          {
            label: "VPN PTP",
            field: "firewallVPNPTP",
            macros: [
              { ...this.downtimeMacro, field: "firewallVPNPTPDowntime" },
              { ...this.slaMacro, field: "firewallVPNPTPSLA" },
              { ...this.actionWorkingHoursMacro, field: "firewallVPNPTPActionWorkingHours" },
              { ...this.actionRestHoursMacro, field: "firewallVPNPTPActionRestHours" },
              { ...this.messageMacro, field: "firewallVPNPTPMessage" },
            ],
            hostTypes: []
          }
        ]
      },
      {
        label: "Wireless controller",
        templates: [
          {
            label: "AP",
            field: "wirelessControllerAP",
            macros: [],
            hostTypes: []
          },
          {
            label: "SSID",
            field: "wirelessControllerSSID",
            macros: [],
            hostTypes: []
          }
        ]
      },
      {
        label: "Bridge radio",
        templates: [
          {
            label: "Advanced",
            field: "brigeRadioAdvanced",
            macros: [
              { label: "Quality", field: "brigeRadioAdvancedQuality" },
              { ...this.slaMacro, field: "brigeRadioAdvancedQualitySLA" },
              { label: "Capacity", field: "brigeRadioAdvancedCapacity" },
              { ...this.slaMacro, field: "brigeRadioAdvancedCapacitySLA" },
              { ...this.actionWorkingHoursMacro, field: "firewallVPNPTPActionWorkingHours" },
              { ...this.actionRestHoursMacro, field: "firewallVPNPTPActionRestHours" }
            ],
            hostTypes: []
          }
        ]
      }
    ]
  }

}
// 
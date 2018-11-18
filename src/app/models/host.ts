export const hostTypes: HostType[] = ["AP", "Router", "Switch", "TVCC", "Server", "WiFi Controller", "Bridge Radio", "UPS", "Sensor", "PABX", "Firewall"];

export type HostType = "AP" | "Router" | "Switch" | "TVCC" | "Server" | "WiFi Controller" | "Bridge Radio" | "UPS" | "Sensor" | "PABX" | "Firewall";

export interface Host {
  id: number,
  ip: string,
  name: string,
  type: HostType,

  pingBasic?: boolean,
  pingBasicDowntime?: number,
  pingBasicSLA?: string,
  pingBasicActionWorkingHours?: string,
  pingBasicActionRestHours?: string,
  pingBasicMessage?: string,

  networkDeviceBasic?: boolean,
  networkDeviceBasicSLA?: string,
  networkDeviceBasicActionWorkingHours?: string,
  networkDeviceBasicActionRestHours?: string,
  networkDeviceBasicMessage?: string,

  networkDeviceMedium?: boolean,
  networkDeviceMediumCPUMaxUtil?: string,
  networkDeviceMediumCPUSLA?: string,
  networkDeviceMediumRAMMaxUtil?: string,
  networkDeviceMediumRAMSLA?: string,
  networkDeviceMediumPSUSLA?: string,
  networkDeviceMediumFanSLA?: string,
  networkDeviceMediumTemperatureSLA?: string,
  networkDeviceMediumActionRestHours?: string,
  networkDeviceMediumMessage?: string,

  networkInterfaceInterfaces?: boolean,
}

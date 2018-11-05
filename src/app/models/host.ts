export const hostTypes = ["AP", "Router", "Switch", "TVCC", "Server", "WiFi Controller", "Bridge Radio", "UPS", "Sensor", "PABX", "Firewall"];

export interface Host {
  id: number,
  ip: string,
  name: string,
  type: "AP" | "Router" | "Switch" | "TVCC" | "Server" | "WiFi Controller" | "Bridge Radio" | "UPS" | "Sensor" | "PABX" | "Firewall",
  template1: boolean,
  template2: boolean,
  template3: boolean,
  template1_macro1: string,
  template1_macro2: number,
  template2_macro1: string,
  template3_macro1: string,
  template3_macro2: string,
  template3_macro3: string,
}

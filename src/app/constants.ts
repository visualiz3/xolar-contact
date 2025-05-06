export type SalesmanKey =
  | "eric"
  | "kong"
  | "mandy"
  | "alex"
  | "wang"
  | "default"; // Added 'default'
export const SALESMAN_DATA = {
  eric: {
    fullName: "Eric Tan",
    phoneNumber: "+60133337722",
    email: "eric@xolar.my",
  },
  kong: {
    fullName: "YF Kong",
    phoneNumber: "+60133337722",
    email: "kong@xolar.my",
  },
  mandy: {
    fullName: "Mandy Soo",
    phoneNumber: "+60133337722",
    email: "mandy@xolar.my",
  },
  alex: {
    fullName: "Alex",
    phoneNumber: "+60133337722",
    email: "alex@xolar.my",
  },
  wang: {
    fullName: "Wang",
    phoneNumber: "+60133337722",
    email: "wang@xolar.my",
  },
  default: {
    // Added default salesman
    fullName: "Xolar Office Team",
    phoneNumber: "+60133337722",
    email: "info@xolar.my",
  },
};